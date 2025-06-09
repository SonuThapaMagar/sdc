import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/auth/signup";
import Login from "../pages/auth/login";
import Category from "../pages/users/category";
import LearnMore from "../pages/users/LearnMore";
import AboutUs from "../pages/users/AboutUs";
import ShelterRegistration from "../pages/users/ShelterRegistration";
import AdminLogin from "../pages/auth/adminLogin";
import SuperadminDashboard from "../pages/superadmin/pages/SuperadminDashboard";
import SuperadminSettings from "../pages/superadmin/pages/SuperadminSettings";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("superadminToken");
  console.log("ProtectedRoute: Token found:", token);
  return token ? children : <Navigate to="/superadmin/login" replace />;
}

function UserRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/category" element={<Category />} />
      <Route path="/learn-more" element={<LearnMore />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/register-shelter" element={<ShelterRegistration />} />

      <Route path="/superadmin/login" element={<AdminLogin />} />
      <Route path="/superadmin/ " element={<SuperadminDashboard />} />
      <Route path="/superadmin/settings" element={<SuperadminSettings />} />

      {/* Admin Routes */}
      <Route path="/superadmin/login" element={<AdminLogin />} />
      <Route
        path="/superadmin/dashboard"
        element={
          <ProtectedRoute>
            <SuperadminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/settings"
        element={
          <ProtectedRoute>
            <SuperadminSettings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default UserRoutes;
