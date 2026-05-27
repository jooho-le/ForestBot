import { CheckCircle2, Circle } from 'lucide-react';
import type { Mission } from '../types/mission';

type MissionCardProps = {
  mission: Mission;
  completed: boolean;
  onToggle: () => void;
};

export default function MissionCard({ mission, completed, onToggle }: MissionCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full rounded-3xl border border-forest-100 bg-white p-4 text-left shadow-soft transition active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-forest-950">{mission.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{mission.description}</p>
          <span className="mt-3 inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs font-black text-lime-800">
            {mission.points}점
          </span>
        </div>
        <div className={completed ? 'text-forest-700' : 'text-slate-300'}>
          {completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
        </div>
      </div>
    </button>
  );
}
