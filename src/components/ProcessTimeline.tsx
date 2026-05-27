import { CheckCircle2 } from 'lucide-react';

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  imageLabel: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <article key={step.id} className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-forest-700 text-sm font-black text-white">
                {index + 1}
              </div>
              {index < steps.length - 1 ? <div className="mt-2 h-full w-0.5 flex-1 bg-forest-100" /> : null}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-forest-700" />
                <h3 className="text-lg font-black text-forest-950">{step.title}</h3>
              </div>
              <div className="mb-3 grid aspect-[16/9] place-items-center rounded-2xl bg-gradient-to-br from-forest-100 via-skywash to-lime-100 text-sm font-bold text-forest-800">
                {step.imageLabel}
              </div>
              <p className="text-sm leading-6 text-slate-600">{step.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
