import { useEffect, useId, useRef, useState } from 'react';
import type { Html5Qrcode as Html5QrcodeType } from 'html5-qrcode';

type WebBarcodeScannerProps = {
  onDetected: (value: string) => void;
  onError?: (message: string) => void;
};

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
        await scanner.start(
          { facingMode: { ideal: 'environment' } },
          {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
              const minViewfinderSize = Math.min(viewfinderWidth, viewfinderHeight);
              const edge = Math.floor(minViewfinderSize * 0.72);
              const boundedEdge = Math.min(Math.max(edge, 160), Math.max(minViewfinderSize - 16, 120));
              return { width: boundedEdge, height: boundedEdge };
            },
            aspectRatio: 1,
          },
          (decodedText) => {
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
          },
          undefined,
        );

        if (!isMounted) {
          await scanner.stop();
          scanner.clear();
          return;
        }

        if (isMounted) {
          setStatus('QR 또는 바코드를 카메라 중앙에 맞춰 주세요.');
        }
      } catch {
        const message = '카메라를 열 수 없습니다. 브라우저 권한과 HTTPS 접속 상태를 확인해 주세요.';
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
