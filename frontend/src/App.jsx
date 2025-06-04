import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Category from "./pages/users/category";
import "./styles/global.css";
import LandingPage from "./pages/LandingPage";
import LearnMore from "./pages/users/LearnMore";
import AboutUs from "./pages/users/AboutUs";
import ShelterRegistration from "./pages/users/ShelterRegistration";

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
     
    </Routes>
  );
}
