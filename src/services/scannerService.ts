import { Capacitor } from '@capacitor/core';

export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}

export async function requestCameraPermission(): Promise<boolean> {
  if (isNativePlatform()) {
    try {
      const { BarcodeScanner } = await import('@capacitor-mlkit/barcode-scanning');
      const permission = await BarcodeScanner.requestPermissions();
      return permission.camera === 'granted' || permission.camera === 'limited';
    } catch {
      return false;
    }
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    return false;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch {
    return false;
  }
}

export async function scanCode(): Promise<string> {
  if (isNativePlatform()) {
    const { BarcodeScanner } = await import('@capacitor-mlkit/barcode-scanning');
    const permissionGranted = await requestCameraPermission();

    if (!permissionGranted) {
      throw new Error('카메라 권한이 필요합니다.');
    }

    const result = await BarcodeScanner.scan();
    const value = result.barcodes[0]?.rawValue;

    if (!value) {
      throw new Error('QR 또는 바코드를 읽지 못했습니다.');
    }

    return value.trim();
  }

  const value = window.prompt('웹에서는 테스트용 kit_id를 입력해 주세요.');
  if (!value) {
    throw new Error('kit_id가 입력되지 않았습니다.');
  }

  return value.trim();
}
