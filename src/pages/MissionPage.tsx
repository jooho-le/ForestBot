import { Award, Leaf } from 'lucide-react';
import ImpactCard from '../components/ImpactCard';
import MissionCard from '../components/MissionCard';
import ProgressBar from '../components/ProgressBar';
import { missions } from '../data/missions';
import { useForestStore } from '../store/useForestStore';

export default function MissionPage() {
  const completedMissionIds = useForestStore((state) => state.completedMissionIds);
  const toggleMissionComplete = useForestStore((state) => state.toggleMissionComplete);
  const completedCount = completedMissionIds.length;
  const totalPoints = missions
    .filter((mission) => completedMissionIds.includes(mission.id))
    .reduce((sum, mission) => sum + mission.points, 0);
  const progress = (completedCount / missions.length) * 100;

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-forest-800 p-5 text-white shadow-soft">
        <div className="flex items-center gap-2 text-sm font-bold text-forest-100">
          <Leaf size={18} />
          환경 실천 기록
        </div>
        <h1 className="mt-3 text-3xl font-black leading-tight">오늘 할 수 있는 작은 실천</h1>
        <p className="mt-3 text-sm leading-6 text-forest-50">완료한 미션은 이 기기에 저장됩니다.</p>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <ImpactCard title="완료 미션" value={`${completedCount}/${missions.length}`} icon={<Award size={22} />} />
        <ImpactCard title="참여 점수" value={String(totalPoints)} unit="점" icon={<Leaf size={22} />} />
      </div>

      <section className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
        <ProgressBar value={progress} label="참여율" />
      </section>

      <section className="space-y-3">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            completed={completedMissionIds.includes(mission.id)}
            onToggle={() => toggleMissionComplete(mission.id)}
          />
        ))}
      </section>
    </div>
  );
}
