import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import AssemblyPage from '../pages/AssemblyPage';
import HomePage from '../pages/HomePage';
import ImpactPage from '../pages/ImpactPage';
import KitDetailPage from '../pages/KitDetailPage';
import MissionPage from '../pages/MissionPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrintProcessPage from '../pages/PrintProcessPage';
import ScanPage from '../pages/ScanPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/kit/:kitId" element={<KitDetailPage />} />
        <Route path="/kit/:kitId/print" element={<PrintProcessPage />} />
        <Route path="/kit/:kitId/assembly" element={<AssemblyPage />} />
        <Route path="/missions" element={<MissionPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
