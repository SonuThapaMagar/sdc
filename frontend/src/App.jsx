import { useRoutes } from 'react-router-dom';
import superadminRoutes from './routes/superadminRoutes';
import userRoutes from './routes/userRoutes';

function App() {
  const routes = useRoutes([...userRoutes, ...superadminRoutes]);
  return routes;
}

export default App;
