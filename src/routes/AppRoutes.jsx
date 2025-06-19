import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import SuperadminLayout from "@/pages/superadmin/layout/SuperadminLayout";
import Dashboard from "@/pages/superadmin/Dashboard";
import UserManagement from "../pages/superadmin/pages/UserManagement";
import PetCenterMgmt from "../pages/superadmin/pages/PetCenterMgmt";
import PetMgmt from "../pages/superadmin/pages/PetMgmt";
import EditUserPage from "../pages/superadmin/pages/EditUser";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('superadminToken');
  if (!token) {
    return <Navigate to="/superadmin/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/superadmin/login" replace />} />
      <Route path="/superadmin/login" element={<Login />} />
      
      {/* Protected routes with layout */}
      <Route path="/superadmin" element={
        <ProtectedRoute>
          <SuperadminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/edit/:userId" element={<EditUserPage />} />
        <Route path="pet-centers" element={<PetCenterMgmt />} />
        <Route path="pets" element={<PetMgmt />} />
      </Route>
    </Routes>
  );
}
