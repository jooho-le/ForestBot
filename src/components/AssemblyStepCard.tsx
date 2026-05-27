import { Check, Wrench } from 'lucide-react';

type AssemblyStepCardProps = {
  title: string;
  description: string;
  completed: boolean;
  onToggle: () => void;
};

export default function AssemblyStepCard({ title, description, completed, onToggle }: AssemblyStepCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full rounded-3xl border border-forest-100 bg-white p-4 text-left shadow-soft transition active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            'grid h-11 w-11 shrink-0 place-items-center rounded-2xl',
            completed ? 'bg-forest-700 text-white' : 'bg-forest-100 text-forest-800',
          ].join(' ')}
        >
          {completed ? <Check size={22} /> : <Wrench size={21} />}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-black text-forest-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </button>
  );
}
