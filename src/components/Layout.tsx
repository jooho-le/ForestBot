import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import BottomNav from './BottomNav';
import { useForestStore } from '../store/useForestStore';

export default function Layout() {
  const loadSavedState = useForestStore((state) => state.loadSavedState);

  useEffect(() => {
    loadSavedState();
  }, [loadSavedState]);

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-30 border-b border-forest-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-forest-700 text-white">
              <Sprout size={22} />
            </div>
            <div>
              <p className="text-base font-black leading-tight text-forest-900">ForestBot</p>
              <p className="text-xs font-semibold text-slate-500">자원순환 로봇 키트</p>
            </div>
          </div>
          <span className="rounded-full bg-forest-100 px-3 py-1 text-xs font-bold text-forest-800">WPC 교육용</span>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-5 py-5">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
