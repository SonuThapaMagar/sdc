<<<<<<< HEAD
import "./styles/global.css";
import UserRoutes from "./routes/userRoutes";

export default function App() {
  return (
    <UserRoutes/>
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
