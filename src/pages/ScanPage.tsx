import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, Keyboard, QrCode, X } from 'lucide-react';
import WebBarcodeScanner from '../components/WebBarcodeScanner';
import { getKitById } from '../services/kitService';
import { useForestStore } from '../store/useForestStore';

const sampleKitIds = ['KIT-2026-JB-MUJU-0001', 'KIT-2026-JB-JINAN-0002', 'KIT-2026-JB-JANGSU-0003'];

export default function ScanPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [kitId, setKitId] = useState(searchParams.get('kit_id') ?? '');
  const [message, setMessage] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const recordScan = useForestStore((state) => state.recordScan);

  const openKitById = useCallback(async (nextKitId: string) => {
    const normalizedKitId = nextKitId.trim().toUpperCase();
    const kit = await getKitById(normalizedKitId);

    if (!kit) {
      setMessage('등록되지 않은 kit_id입니다. 예시 ID를 확인해 주세요.');
      return;
    }

    recordScan(kit.kitId);
    navigate(`/kit/${kit.kitId}`);
  }, [navigate, recordScan]);

  function handleScannerOpen() {
    setMessage('');
    setIsScannerOpen(true);
  }

  const handleDetected = useCallback(
    async (scannedValue: string) => {
      setIsScannerOpen(false);
      await openKitById(scannedValue);
    },
    [openKitById],
  );

  const handleScannerError = useCallback((errorMessage: string) => {
    setMessage(errorMessage);
  }, []);

  function handleScannerClose() {
    setIsScannerOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await openKitById(kitId);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-white p-5 shadow-soft">
        {isScannerOpen ? (
          <div className="space-y-3">
            <WebBarcodeScanner onDetected={handleDetected} onError={handleScannerError} />
            <button
              type="button"
              onClick={handleScannerClose}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-forest-100 bg-white px-4 py-4 text-sm font-black text-forest-800"
            >
              <X size={20} />
              스캔 닫기
            </button>
          </div>
        ) : (
          <>
            <div className="grid aspect-square place-items-center rounded-[1.5rem] border-4 border-dashed border-forest-200 bg-forest-50">
              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-forest-700 text-white">
                  <QrCode size={42} />
                </div>
                <h1 className="mt-4 text-2xl font-black text-forest-950">QR/바코드 스캔</h1>
                <p className="mt-2 text-sm font-semibold text-slate-500">휴대폰 브라우저 카메라 스캔</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleScannerOpen}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-700 px-4 py-4 text-sm font-black text-white"
            >
              <Camera size={20} />
              카메라로 스캔하기
            </button>
          </>
        )}
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
