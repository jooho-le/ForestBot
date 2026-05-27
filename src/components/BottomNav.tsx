import { BarChart3, Home, Leaf, QrCode } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '홈', icon: Home },
  { to: '/scan', label: '스캔', icon: QrCode },
  { to: '/missions', label: '미션', icon: Leaf },
  { to: '/impact', label: '효과', icon: BarChart3 },
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-forest-100 bg-white/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'flex min-h-14 flex-col items-center justify-center rounded-2xl text-xs font-semibold transition',
                isActive ? 'bg-forest-700 text-white shadow-soft' : 'text-slate-500 hover:bg-forest-50 hover:text-forest-800',
              ].join(' ')
            }
          >
            <Icon size={21} strokeWidth={2.2} />
            <span className="mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
