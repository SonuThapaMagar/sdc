import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const superadminToken = localStorage.getItem('superadminToken');
    const adminToken = localStorage.getItem('adminToken');
    const token = superadminToken || adminToken;

    // Skip Authorization header for auth-related endpoints
    if (token && !config.url.includes('/api/auth')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('superadminToken');
      localStorage.removeItem('superadminId');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminId');
      localStorage.removeItem('userRole');

      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
        toast.error(error.response?.status === 401 ? 'Session expired. Please log in again.' : 'Permission denied.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;