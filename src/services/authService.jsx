import api from '../api/api';

export const signup = async (signupData) => {
  try {
    const response = await api.post('/auth/signup', signupData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Signup failed' };
  }
};

export const login = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    const { token } = response.data;
    localStorage.setItem('token', token); // Store JWT token
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgotPassword', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send OTP' };
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post('/auth/verifyOtp', otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await api.post(`/auth/resetPassword?newPassword=${newPassword}`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Password reset failed' };
  }
};