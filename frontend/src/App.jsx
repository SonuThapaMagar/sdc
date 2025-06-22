<<<<<<< HEAD
import "./styles/global.css";
<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";
import LearnMore from "./pages/users/LearnMore";
import AboutUs from "./pages/users/AboutUs";
import ShelterRegistration from "./pages/users/ShelterRegistration";
import Adoptme from "./pages/users/Adoptme";
import AdoptionSuccess from "./pages/users/AdoptionSucess";

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
=======
import UserRoutes from "./routes/userRoutes";

export default function App() {
  return (
    <UserRoutes/>
>>>>>>> 738ef58e456ba53f390dd8a33ee250714938da76
  );
}
=======
import { useRoutes } from 'react-router-dom';
import superadminRoutes from './routes/superadminRoutes';
import userRoutes from './routes/userRoutes';

function App() {
  const routes = useRoutes([...userRoutes, ...superadminRoutes]);
  return routes;
}

export default App;
>>>>>>> 3969f1fee02de0f482a859ee1e1072eea98dfe64
