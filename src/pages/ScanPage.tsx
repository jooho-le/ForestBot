import { FormEvent, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, Keyboard, QrCode } from 'lucide-react';
import { getKitById } from '../services/kitService';
import { isNativePlatform, requestCameraPermission, scanCode } from '../services/scannerService';
import { useForestStore } from '../store/useForestStore';

const sampleKitIds = ['KIT-2026-JB-MUJU-0001', 'KIT-2026-JB-JINAN-0002', 'KIT-2026-JB-JANGSU-0003'];

export default function ScanPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [kitId, setKitId] = useState(searchParams.get('kit_id') ?? '');
  const [message, setMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const recordScan = useForestStore((state) => state.recordScan);
  const platformLabel = useMemo(() => (isNativePlatform() ? '모바일 앱 스캔' : '웹 입력 fallback'), []);

  async function openKitById(nextKitId: string) {
    const normalizedKitId = nextKitId.trim().toUpperCase();
    const kit = await getKitById(normalizedKitId);

    if (!kit) {
      setMessage('등록되지 않은 kit_id입니다. 예시 ID를 확인해 주세요.');
      return;
    }

    recordScan(kit.kitId);
    navigate(`/kit/${kit.kitId}`);
  }

  async function handleScan() {
    setMessage('');
    setIsScanning(true);

    try {
      const permissionGranted = await requestCameraPermission();
      if (!permissionGranted && isNativePlatform()) {
        setMessage('카메라 권한이 필요합니다. 설정에서 권한을 허용해 주세요.');
        return;
      }

      const scannedValue = await scanCode();
      await openKitById(scannedValue);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '스캔 중 문제가 발생했습니다.');
    } finally {
      setIsScanning(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await openKitById(kitId);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-white p-5 shadow-soft">
        <div className="grid aspect-square place-items-center rounded-[1.5rem] border-4 border-dashed border-forest-200 bg-forest-50">
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-forest-700 text-white">
              <QrCode size={42} />
            </div>
            <h1 className="mt-4 text-2xl font-black text-forest-950">QR/바코드 스캔</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">{platformLabel}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleScan}
          disabled={isScanning}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-700 px-4 py-4 text-sm font-black text-white disabled:opacity-60"
        >
          <Camera size={20} />
          {isScanning ? '스캔 준비 중...' : '카메라로 스캔하기'}
        </button>
      </section>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
        <label className="text-sm font-black text-forest-900" htmlFor="kitId">
          kit_id 직접 입력
        </label>
        <div className="mt-3 flex gap-2">
          <input
            id="kitId"
            value={kitId}
            onChange={(event) => setKitId(event.target.value)}
            placeholder="KIT-2026-JB-MUJU-0001"
            className="min-w-0 flex-1 rounded-2xl border border-forest-100 bg-forest-50 px-4 py-3 text-sm font-bold outline-none focus:border-forest-600"
          />
          <button type="submit" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-700 text-white">
            <Keyboard size={20} />
          </button>
        </div>
        {message ? <p className="mt-3 text-sm font-bold text-red-600">{message}</p> : null}
      </form>

      <section className="space-y-2">
        <h2 className="text-sm font-black text-slate-500">테스트용 kit_id</h2>
        {sampleKitIds.map((sampleKitId) => (
          <button
            key={sampleKitId}
            type="button"
            onClick={() => setKitId(sampleKitId)}
            className="w-full rounded-2xl bg-white px-4 py-3 text-left text-sm font-bold text-forest-800 shadow-sm"
          >
            {sampleKitId}
          </button>
        ))}
      </section>
    </div>
  );
}
