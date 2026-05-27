import { Leaf, Recycle, ScanLine, Trees } from 'lucide-react';
import ImpactCard from '../components/ImpactCard';
import { kits } from '../data/kits';
import { useForestStore } from '../store/useForestStore';
import { calculateTotalImpact } from '../utils/impactCalculator';
import { formatDays, formatGram, formatKg } from '../utils/format';

export default function ImpactPage() {
  const recentScans = useForestStore((state) => state.recentScans);
  const scannedKits = kits.filter((kit) => recentScans.includes(kit.kitId));
  const totalImpact = calculateTotalImpact(scannedKits);

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-white p-5 shadow-soft">
        <h1 className="text-3xl font-black text-forest-950">누적 환경 효과</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          이 기기에서 스캔한 키트 기준으로 폐자원 사용량과 탄소 절감 효과를 합산합니다.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <ImpactCard title="스캔한 키트 수" value={String(totalImpact.scannedKitCount)} unit="개" icon={<ScanLine size={22} />} />
        <ImpactCard title="누적 폐자원 사용량" value={formatGram(totalImpact.recycledAmountG).replace(' g', '')} unit="g" icon={<Recycle size={22} />} />
        <ImpactCard title="누적 CO2 절감량" value={formatKg(totalImpact.co2SavedKg).replace(' kg CO2e', '')} unit="kg CO2e" icon={<Leaf size={22} />} />
        <ImpactCard
          title="나무 흡수량 환산"
          value={formatDays(totalImpact.treeDaysEquivalent).replace('일', '')}
          unit="일"
          description="소나무 1그루의 CO2 흡수량으로 바꾸어 이해하기 쉽게 표시합니다."
          icon={<Trees size={22} />}
        />
      </div>

      <section className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
        <h2 className="text-lg font-black text-forest-950">최근 스캔 기록</h2>
        <div className="mt-3 space-y-2">
          {recentScans.length > 0 ? (
            recentScans.map((kitId) => (
              <p key={kitId} className="rounded-2xl bg-forest-50 px-4 py-3 text-sm font-black text-forest-800">
                {kitId}
              </p>
            ))
          ) : (
            <p className="rounded-2xl bg-forest-50 px-4 py-3 text-sm font-bold text-slate-500">
              아직 스캔한 키트가 없습니다.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
