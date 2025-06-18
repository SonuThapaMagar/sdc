// src/components/layout/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/utils/toast';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Superadmin Panel</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link to="/pet-mgmt" className="block p-2 hover:bg-gray-700 rounded">Pet Mgmt</Link>
          </li>
          <li className="mb-2">
            <Link to="/user-mgmt" className="block p-2 hover:bg-gray-700 rounded">User Mgmt</Link>
          </li>
          <li className="mt-4">
            <button 
              onClick={handleLogout} 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}