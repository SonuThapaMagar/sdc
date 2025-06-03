import { Routes, Route } from 'react-router-dom';
import SuperadminDashboard from '../pages/superadmin/pages/SuperadminDashboard';
import SuperadminSettings from '../pages/superadmin/pages/SuperadminSettings';
import SuperadminLogin from '@/pages/auth/superadminLogin';

function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SuperadminLogin />} />
      <Route path="/dashboard" element={<SuperadminDashboard />} />
      <Route path="/settings" element={<SuperadminSettings />} />
    </Routes>
  );
}

export default SuperAdminRoutes;