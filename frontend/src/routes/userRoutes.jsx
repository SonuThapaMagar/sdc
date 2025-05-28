import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/login";
import Dashboard from "../pages/user/Dashboard";
import AdminLogin from "../pages/auth/adminLogin";
import SuperadminDashboard from "../pages/superadmin/pages/SuperadminDashboard";
import SuperadminSettings from "../pages/superadmin/pages/SuperadminSettings";

function UserRoutes() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Admin Routes */}
      <Route path="/superadmin/login" element={<AdminLogin />} />
      <Route path="/superadmin/dashboard" element={<SuperadminDashboard />} />
      <Route path="/superadmin/settings" element={<SuperadminSettings />} />
    </Routes>
  );
}

export default UserRoutes;
