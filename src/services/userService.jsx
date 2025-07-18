import api from '../api/api';

export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/user/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    });
    const { data } = response.data; // Extract data from SuccessResponse
    return {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      createdAt: data.createdAt, // Ensure backend includes createdAt if needed
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put("/api/user/profile", profileData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    });
    return response.data.data; // Extract data from SuccessResponse
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update profile");
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

export const getPetById = (id) => api.get(`/api/pets/${id}`);