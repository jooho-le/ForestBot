type ProgressBarProps = {
  value: number;
  label?: string;
};

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-600">
        <span>{label ?? '진행률'}</span>
        <span>{Math.round(safeValue)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-forest-100">
        <div className="h-full rounded-full bg-forest-700 transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
