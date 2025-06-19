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
    const token = localStorage.getItem('superadminToken');
    if (token && config.url !== '/api/superadmin/auth/login') {
      const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      config.headers.Authorization = formattedToken;
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
      if (!window.location.pathname.includes('/superadmin/login')) {
        window.location.href = '/superadmin/login';
        toast.error(error.response?.status === 401 ? 'Session expired. Please log in again.' : 'Permission denied. Please log in with SUPERADMIN role.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;