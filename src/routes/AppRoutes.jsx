import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import SuperadminLayout from "@/pages/superadmin/layout/SuperadminLayout";
import Dashboard from "@/pages/superadmin/Dashboard";
import UserManagement from "../pages/superadmin/pages/UserManagement";
import PetCenterMgmt from "../pages/superadmin/pages/PetCenterMgmt";
import PetMgmt from "../pages/superadmin/pages/PetMgmt";
import EditUserPage from "../pages/superadmin/pages/EditUser";
import EditPet from "../pages/superadmin/pages/EditPet";
import EditPetCenter from "../pages/superadmin/pages/EditPetCenter";
import AdminLayout from "../pages/admin/layout/AdminLayout";
import AdminDashboard from "../pages/admin/pages/AdminDashboard";
import AdoptionRequests from "../pages/admin/pages/AdoptionRequests";
import PetCenterProfile from "../pages/admin/pages/PetCenterProfile";
import ViewUsers from "../pages/admin/pages/ViewUsers";
import PetCRUD from "../pages/admin/pages/PetCRUD";

const ProtectedRoute = ({ children, requiredRole }) => {
  const superadminToken = localStorage.getItem('superadminToken');
  const adminToken = localStorage.getItem('adminToken');
  const userRole = localStorage.getItem('userRole');
  
  if (!superadminToken && !adminToken) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="ADMIN">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ViewUsers />} />
        <Route path="pets" element={<PetCRUD />} />
        <Route path="adoptionRequests" element={<AdoptionRequests />} />
        <Route path="adminProfile" element={<PetCenterProfile />} />
        <Route path="pet-centers/edit/:centerId" element={<EditPetCenter />} />
      </Route>
      
      {/* Superadmin routes */}
      <Route path="/superadmin" element={
        <ProtectedRoute requiredRole="SUPERADMIN">
          <SuperadminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/edit/:userId" element={<EditUserPage />} />
        <Route path="pet-centers" element={<PetCenterMgmt />} />
        <Route path="pet-centers/edit/:centerId" element={<EditPetCenter />} />
        <Route path="pets" element={<PetMgmt />} />
        <Route path="pets/edit/:petId" element={<EditPet />} />
      </Route>
    </Routes>
  );
}
