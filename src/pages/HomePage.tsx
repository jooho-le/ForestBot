import { ArrowRight, Leaf, QrCode, Recycle, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImpactCard from '../components/ImpactCard';
import { missions } from '../data/missions';
import { kits } from '../data/kits';
import { useForestStore } from '../store/useForestStore';
import { calculateTotalImpact } from '../utils/impactCalculator';
import { formatDays, formatGram, formatKg } from '../utils/format';

export default function HomePage() {
  const recentScans = useForestStore((state) => state.recentScans);
  const completedMissionIds = useForestStore((state) => state.completedMissionIds);
  const scannedKits = kits.filter((kit) => recentScans.includes(kit.kitId));
  const totalImpact = calculateTotalImpact(scannedKits);
  const todayMission = missions[0];

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[2rem] bg-forest-800 p-6 text-white shadow-soft">
        <div className="flex items-center gap-2 text-sm font-bold text-forest-100">
          <Leaf size={18} />
          폐자원이 로봇 키트가 되는 여정
        </div>
        <h1 className="mt-4 text-3xl font-black leading-tight">
          QR을 스캔하고
          <br />
          내 키트의 환경 효과를 확인해요.
        </h1>
        <p className="mt-3 text-sm leading-6 text-forest-50">
          폐목, 버섯 폐배지, Bio-PLA가 어떻게 WPC 소재 로봇으로 만들어졌는지 쉽게 볼 수 있습니다.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/scan"
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-sm font-black text-forest-900"
          >
            <QrCode size={20} />
            QR 스캔하기
          </Link>
          <Link
            to="/scan?mode=input"
            className="flex items-center justify-center gap-2 rounded-2xl bg-forest-600 px-4 py-4 text-sm font-black text-white"
          >
            키트 ID 직접 입력
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-500">오늘의 환경 미션</p>
            <h2 className="mt-1 text-lg font-black text-forest-950">{todayMission.title}</h2>
          </div>
          <Link to="/missions" className="rounded-full bg-forest-100 px-3 py-2 text-xs font-black text-forest-800">
            기록하기
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          현재 {completedMissionIds.length}개 미션을 완료했습니다. 작은 실천을 모아 자원순환 습관을 만들어 보세요.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ImpactCard
          title="누적 폐자원 사용량"
          value={formatGram(totalImpact.recycledAmountG).replace(' g', '')}
          unit="g"
          icon={<Recycle size={22} />}
        />
        <ImpactCard title="누적 CO2 절감량" value={formatKg(totalImpact.co2SavedKg).replace(' kg CO2e', '')} unit="kg CO2e" icon={<Leaf size={22} />} />
        <ImpactCard title="나무 흡수량 환산" value={formatDays(totalImpact.treeDaysEquivalent).replace('일', '')} unit="일" icon={<Trees size={22} />} />
      </div>
    </div>
  );
}
