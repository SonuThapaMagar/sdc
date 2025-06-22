import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LearnMore from "./pages/users/LearnMore";
import AboutUs from "./pages/users/AboutUs";
import ShelterRegistration from "./pages/users/ShelterRegistration";
import Adoptme from "./pages/users/Adoptme";
import AdoptionSuccess from "./pages/users/AdoptionSucess";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Category from "./pages/users/Category";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/category" element={<Category />} />
      <Route path="/learn-more" element={<LearnMore />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/register-shelter" element={<ShelterRegistration />} />
      <Route path="/adoptme/:petId?" element={<Adoptme />} />
      <Route path="/adoption-success/:petId/:applicationId" element={<AdoptionSuccess />} />
    </Routes>
  );
}
