  import React from "react"; 
  import { Routes, Route } from "react-router-dom";
  import Login from "./pages/auth/login";
  import Signup from "./pages/auth/signup";
  import Category from "./pages/users/category";
  import "./styles/global.css";
  import LandingPage from "./pages/LandingPage";

  function App() {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    );
  }

  export default App;
