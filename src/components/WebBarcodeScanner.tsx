import { useEffect, useId, useRef, useState } from 'react';
import type { Html5Qrcode as Html5QrcodeType } from 'html5-qrcode';

type WebBarcodeScannerProps = {
  onDetected: (value: string) => void;
  onError?: (message: string) => void;
};

function getCameraErrorMessage(error: unknown): string {
  const userAgent = navigator.userAgent.toLowerCase();
  const isInAppBrowser = /kakaotalk|instagram|fbav|fban|line|naver/.test(userAgent);

  if (isInAppBrowser) {
    return '카카오톡 같은 인앱 브라우저에서는 카메라가 제한될 수 있습니다. Safari 또는 Chrome으로 다시 열어 주세요.';
  }

  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError') {
      return '카메라 권한이 차단되었습니다. 브라우저 주소창의 권한 설정에서 카메라를 허용해 주세요.';
    }

    if (error.name === 'NotFoundError') {
      return '사용 가능한 카메라를 찾지 못했습니다.';
    }

    if (error.name === 'NotReadableError') {
      return '다른 앱이 카메라를 사용 중입니다. 카메라 앱을 닫고 다시 시도해 주세요.';
    }
  }

  if (error instanceof Error && error.message) {
    return `카메라를 열 수 없습니다. Safari에서 다시 열어 주세요. (${error.message})`;
  }

  return '카메라를 열 수 없습니다. Safari/Chrome 브라우저와 HTTPS 접속 상태를 확인해 주세요.';
}

export default function WebBarcodeScanner({ onDetected, onError }: WebBarcodeScannerProps) {
  const generatedId = useId();
  const readerId = `barcode-reader-${generatedId.replace(/:/g, '')}`;
  const scannerRef = useRef<Html5QrcodeType | null>(null);
  const detectedRef = useRef(false);
  const [status, setStatus] = useState('카메라를 준비하고 있습니다.');

  useEffect(() => {
    let isMounted = true;

    async function startScanner() {
      if (!navigator.mediaDevices?.getUserMedia) {
        const message = '이 브라우저는 카메라 스캔을 지원하지 않습니다.';
        setStatus(message);
        onError?.(message);
        return;
      }

      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import('html5-qrcode');
      const scanner = new Html5Qrcode(readerId, {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
        ],
        useBarCodeDetectorIfSupported: true,
        verbose: false,
      });
      scannerRef.current = scanner;

      try {
        const scanConfig = {
          fps: 10,
          qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
            const minViewfinderSize = Math.min(viewfinderWidth, viewfinderHeight);
            const edge = Math.floor(minViewfinderSize * 0.72);
            const boundedEdge = Math.min(Math.max(edge, 160), Math.max(minViewfinderSize - 16, 120));
            return { width: boundedEdge, height: boundedEdge };
          },
          aspectRatio: 1,
        };
        const onScanSuccess = (decodedText: string) => {
          if (detectedRef.current) {
            return;
          }

          const value = decodedText.trim();
          if (!value) {
            return;
          }

          detectedRef.current = true;
          setStatus('스캔 완료');
          onDetected(value);
        };

        try {
          await scanner.start({ facingMode: { ideal: 'environment' } }, scanConfig, onScanSuccess, undefined);
        } catch (facingModeError) {
          try {
            const cameras = await Html5Qrcode.getCameras();
            const rearCamera =
              cameras.find((camera) => /back|rear|environment|후면/i.test(camera.label)) ?? cameras[cameras.length - 1] ?? cameras[0];

            if (!rearCamera) {
              throw facingModeError;
            }

            await scanner.start(rearCamera.id, scanConfig, onScanSuccess, undefined);
          } catch {
            throw facingModeError;
          }
        }

        if (!isMounted) {
          await scanner.stop();
          scanner.clear();
          return;
        }

        if (isMounted) {
          setStatus('QR 또는 바코드를 카메라 중앙에 맞춰 주세요.');
        }
      } catch (error) {
        const message = getCameraErrorMessage(error);
        if (isMounted) {
          setStatus(message);
          onError?.(message);
        }
      }
    }

    void startScanner();

    return () => {
      isMounted = false;
      const scanner = scannerRef.current;
      scannerRef.current = null;

      if (!scanner) {
        return;
      }

      if (scanner.isScanning) {
        void scanner.stop().finally(() => scanner.clear());
        return;
      }

      scanner.clear();
    };
  }, [onDetected, onError, readerId]);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-forest-100 bg-slate-950">
      <div id={readerId} className="min-h-[18rem] [&_video]:min-h-[18rem] [&_video]:w-full [&_video]:object-cover" />
      <div className="border-t border-white/10 bg-slate-950 px-4 py-3 text-center text-xs font-bold text-white">{status}</div>
    </div>
  );
}
