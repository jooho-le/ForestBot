import type { ReactNode } from 'react';

type ImpactCardProps = {
  title: string;
  value: string;
  unit?: string;
  description?: string;
  icon?: ReactNode;
};

export default function ImpactCard({ title, value, unit, description, icon }: ImpactCardProps) {
  return (
    <section className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <div className="mt-2 flex flex-wrap items-end gap-1">
            <strong className="text-3xl font-black leading-none text-forest-900">{value}</strong>
            {unit ? <span className="pb-1 text-sm font-bold text-forest-700">{unit}</span> : null}
          </div>
        </div>
        {icon ? <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest-100 text-forest-800">{icon}</div> : null}
      </div>
      {description ? <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p> : null}
    </section>
  );
}
