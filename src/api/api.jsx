import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const isAuthEndpoint = [
      '/api/auth/login',
      '/api/admin/auth/login',
      '/api/admin/auth/signup', // Add signup endpoint here
    ].some((path) => config.url.endsWith(path));
    const token = localStorage.getItem('token');
    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Sending request with token:', token);
    } else {
      console.log('Skipping token for auth endpoint:', config.url);
      delete config.headers.Authorization; // Explicitly remove any existing Authorization header
    }
    console.log('Request config:', config); // Log full config for debugging
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    // Only auto-logout for specific endpoints that should trigger logout
    if (error.response?.status === 401 || error.response?.status === 403) {
      const shouldAutoLogout = [
        '/api/admin/pets',
        '/api/admin/users',
        '/api/admin/adoption-requests',
        '/api/superadmin',
      ].some((endpoint) => error.config?.url?.includes(endpoint));

      // Don't auto-logout for profile endpoints - let the component handle it
      if (error.config?.url?.includes('/profile')) {
        console.log('Profile endpoint error - not auto-logging out');
        return Promise.reject(error);
      }

      if (shouldAutoLogout && localStorage.getItem('token')) {
        const userRole = localStorage.getItem('userRole');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        let redirectPath = '/login';
        if (userRole === 'SUPERADMIN') {
          redirectPath = '/admin/login';
        } else if (userRole === 'ADMIN') {
          redirectPath = '/admin/login';
        }
        if (!window.location.pathname.includes('/login')) {
          window.location.href = redirectPath;
          toast.error(error.response?.status === 401 ? 'Session expired. Please log in again.' : 'Permission denied.');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;