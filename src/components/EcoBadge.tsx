import type { ReactNode } from 'react';

type EcoBadgeProps = {
  children: ReactNode;
};

export default function EcoBadge({ children }: EcoBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-forest-100 px-3 py-1 text-xs font-black text-forest-800">
      {children}
    </span>
  );
}
