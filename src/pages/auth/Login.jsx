import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', credentials);
      const response = await api.post('/api/auth/login', credentials);
      console.log('Login response:', response.data);

      const { message, token, id, role } = response.data;

      if (!token || !role) {
        console.error('Invalid response: missing token or role');
        toast.error('Login failed: Invalid server response');
        return;
      }

      // Store the token and role based on user type
      if (role === 'SUPERADMIN') {
        localStorage.setItem('superadminToken', token);
        localStorage.setItem('superadminId', id);
        localStorage.setItem('userRole', 'SUPERADMIN');
        toast.success(message || 'Logged in successfully as Superadmin!');
        navigate('/superadmin/dashboard');
      } else if (role === 'ADMIN') {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminId', id);
        localStorage.setItem('userRole', 'ADMIN');
        toast.success(message || 'Logged in successfully as Admin!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid user role. Only Superadmin or Admin can log in here.');
      }

    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });

      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // JSX form remains unchanged
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.845 6.07 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.01M6.53 6.53A6.75 6.75 0 0 1 12 5.25c3.68 0 7.714 2.905 9.75 6.75a10.478 10.478 0 0 1-2.042 2.727M6.53 6.53l10.94 10.94M6.53 6.53l-2.55 2.55m13.49 8.39l2.55-2.55" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.285 7.943 7.11 5.25 12 5.25c4.89 0 8.715 2.693 9.75 6.75-1.035 4.057-4.86 6.75-9.75 6.75-4.89 0-8.715-2.693-9.75-6.75z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}