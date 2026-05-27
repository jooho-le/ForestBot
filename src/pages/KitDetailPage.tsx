import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Boxes, CalendarDays, Hammer, Leaf, MapPin, Recycle, Trees } from 'lucide-react';
import EcoBadge from '../components/EcoBadge';
import ImpactCard from '../components/ImpactCard';
import type { Kit } from '../types/kit';
import { getKitById } from '../services/kitService';
import { useForestStore } from '../store/useForestStore';
import { calculateKitImpact } from '../utils/impactCalculator';
import { formatDate, formatDays, formatGram, formatKg, formatMinutes, formatPercent } from '../utils/format';

export default function KitDetailPage() {
  const { kitId = '' } = useParams();
  const [kit, setKit] = useState<Kit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const recordScan = useForestStore((state) => state.recordScan);

  useEffect(() => {
    getKitById(kitId).then((foundKit) => {
      setKit(foundKit);
      if (foundKit) recordScan(foundKit.kitId);
      setIsLoading(false);
    });
  }, [kitId, recordScan]);

  if (isLoading) {
    return <p className="rounded-3xl bg-white p-5 text-center font-bold text-slate-500 shadow-soft">키트 정보를 불러오는 중입니다.</p>;
  }

  if (!kit) {
    return (
      <section className="rounded-3xl bg-white p-5 text-center shadow-soft">
        <h1 className="text-xl font-black text-forest-950">키트를 찾을 수 없습니다</h1>
        <p className="mt-2 text-sm text-slate-600">QR 또는 kit_id를 다시 확인해 주세요.</p>
        <Link to="/scan" className="mt-4 inline-flex rounded-2xl bg-forest-700 px-5 py-3 text-sm font-black text-white">
          다시 스캔하기
        </Link>
      </section>
    );
  }

  const impact = calculateKitImpact(kit);

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-white p-5 shadow-soft">
        <div className="flex flex-wrap gap-2">
          <EcoBadge>{kit.kitId}</EcoBadge>
          <EcoBadge>친환경 WPC</EcoBadge>
        </div>
        <h1 className="mt-4 text-3xl font-black leading-tight text-forest-950">{kit.name}</h1>
        <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600">
          <p className="flex items-center gap-2">
            <MapPin size={18} className="text-forest-700" />
            생산지역 {kit.region}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays size={18} className="text-forest-700" />
            생산일 {formatDate(kit.producedAt)}
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <ImpactCard title="폐목 사용량" value={formatGram(impact.woodAmountG).replace(' g', '')} unit="g" icon={<Recycle size={22} />} />
        <ImpactCard title="폐배지 사용량" value={formatGram(impact.mushroomBedAmountG).replace(' g', '')} unit="g" icon={<Boxes size={22} />} />
        <ImpactCard title="Bio-PLA 사용량" value={formatGram(impact.bioPlaAmountG).replace(' g', '')} unit="g" icon={<Leaf size={22} />} />
        <ImpactCard title="총 재활용 폐자원량" value={formatGram(impact.recycledAmountG).replace(' g', '')} unit="g" icon={<Recycle size={22} />} />
        <ImpactCard title="탄소 절감량" value={formatKg(kit.co2SavedKg).replace(' kg CO2e', '')} unit="kg CO2e" icon={<Leaf size={22} />} />
        <ImpactCard title="나무 흡수량 환산" value={formatDays(impact.treeDaysEquivalent).replace('일', '')} unit="일" description="소나무 1그루의 약 이 기간 CO2 흡수량에 해당합니다." icon={<Trees size={22} />} />
      </div>

      <section className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
        <h2 className="text-lg font-black text-forest-950">소재 정보</h2>
        <div className="mt-4 space-y-3 text-sm">
          <p className="flex justify-between gap-3">
            <span className="font-bold text-slate-500">총 키트 무게</span>
            <strong>{formatGram(kit.totalWeightG)}</strong>
          </p>
          <p className="flex justify-between gap-3">
            <span className="font-bold text-slate-500">폐목 비율</span>
            <strong>{formatPercent(kit.materialRatio.recycledWood)}</strong>
          </p>
          <p className="flex justify-between gap-3">
            <span className="font-bold text-slate-500">폐배지 비율</span>
            <strong>{formatPercent(kit.materialRatio.mushroomBed)}</strong>
          </p>
          <p className="flex justify-between gap-3">
            <span className="font-bold text-slate-500">Bio-PLA 비율</span>
            <strong>{formatPercent(kit.materialRatio.bioPla)}</strong>
          </p>
          <p className="pt-3 text-slate-600">폐목: {kit.sourceInfo.woodSource}</p>
          <p className="text-slate-600">폐배지: {kit.sourceInfo.mushroomBedSource}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
        <h2 className="text-lg font-black text-forest-950">3D프린팅 정보</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Info label="출력 방식" value={kit.printInfo.printerType} />
          <Info label="출력 시간" value={formatMinutes(kit.printInfo.printTimeMin)} />
          <Info label="사용 소재량" value={formatGram(kit.printInfo.filamentUsedG)} />
          <Info label="레이어 높이" value={`${kit.printInfo.layerHeightMm} mm`} />
          <Info label="노즐 온도" value={`${kit.printInfo.nozzleTempC}°C`} />
          <Info label="베드 온도" value={`${kit.printInfo.bedTempC}°C`} />
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link to={`/kit/${kit.kitId}/print`} className="flex items-center justify-center gap-2 rounded-2xl bg-forest-700 px-4 py-4 text-sm font-black text-white">
          <Hammer size={20} />
          제작 과정 보기
        </Link>
        <Link to={`/kit/${kit.kitId}/assembly`} className="flex items-center justify-center gap-2 rounded-2xl bg-lime-600 px-4 py-4 text-sm font-black text-white">
          조립 방법 보기
        </Link>
        <Link to="/missions" className="sm:col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-sm font-black text-forest-800 shadow-soft">
          환경 미션 시작
        </Link>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-forest-50 p-3">
      <p className="font-bold text-slate-500">{label}</p>
      <p className="mt-1 font-black text-forest-950">{value}</p>
    </div>
  );
}
