import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/user/auth/Login";
import SuperadminLayout from "../pages/superadmin/layout/SuperadminLayout";
import Dashboard from "../pages/superadmin/Dashboard";
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
import FAQ from "../pages/user/pages/FAQ";
import Contact from "../pages/user/components/contact/Contact";
import NotFound from "../pages/user/pages/NotFound";
import UserSignup from "../pages/user/auth/Signup";
import LearnMore from "../pages/user/pages/LearnMore";
import AboutUs from "../pages/user/pages/AboutUs";
import ShelterRegistration from "../pages/user/pages/ShelterRegistration";
import Adoptme from "../pages/user/pages/Adoptme";
import AdoptionSuccess from "../pages/user/pages/AdoptionSuccess";
import Category from "../pages/user/pages/category";
import LandingPage from "../pages/user/LandingPage";

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
      {/* User routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/category" element={<Category />} />
      <Route path="/learn-more" element={<LearnMore />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/register-shelter" element={<ShelterRegistration />} />
      <Route path="/adoptme/:petId?" element={<Adoptme />} />
      <Route path="/adoption-success/:petId/:applicationId" element={<AdoptionSuccess />} />
      
      {/* Placeholder routes for pages referenced in navigation */}
      <Route path="/pets" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Pet Listings</h1><p className="text-gray-600">Coming soon! This page will show all available pets for adoption.</p></div></div>} />
      <Route path="/about" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">About Us</h1><p className="text-gray-600">Coming soon! Learn more about our mission and values.</p></div></div>} />
      
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
      
      {/* Catch all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
