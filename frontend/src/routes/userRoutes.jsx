import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
// import Dashboard from '../pages/users';
// import Category from '../pages/user/Category';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/category" element={<Category />} /> */}
    </Routes>
  );
}

export default UserRoutes;