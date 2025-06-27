import api from '../api/api';

export const getUserProfile = async () => {
  try {
    const response = await api.get('/api/user/profile');
    return response.data.data || response.data; 
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/api/user/profile', profileData);
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

export const getPets = async () => {
  try {
    const response = await api.get('/api/user/pets');
    return response.data.data || response.data; // Assuming backend returns a list of pets
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch pets' };
  }
};

export const searchPets = async (query) => {
  try {
    const response = await api.get(`/api/user/pets/search?query=${encodeURIComponent(query)}`);
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to search pets' };
  }
};