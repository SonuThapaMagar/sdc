import LandingPage from '../pages/LandingPage';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
// import Dashboard from '../pages/users';
// import Category from '../pages/user/Category';

const userRoutes = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />
  // },
  // {
  //   path: '/category',
  //   element: <Category />
  // }
];

export default userRoutes;