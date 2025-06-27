import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
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
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    // Only handle 401/403 errors for authenticated routes
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Don't logout for profile fetch errors on initial load
      if (error.config?.url?.includes('/profile') && !localStorage.getItem('token')) {
        return Promise.reject(error);
      }
      
      // Only logout if we have a token and it's an auth error
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
          toast.error(error.response?.status === 401 ? 'Session expired. Please log in again.' : 'Permission denied.');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;