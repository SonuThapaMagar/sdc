import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { toast } from 'react-toastify';

const EditPet = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        gender: '',
        location: '',
        status: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [toastMsg, setToastMsg] = useState(null);

    useEffect(() => {
        const fetchPet = async () => {
            const token = localStorage.getItem('superadminToken');
            if (!token) {
                setToastMsg({ type: 'error', text: 'No superadmin token found. Please log in.' });
                setLoading(false);
                navigate('/superadmin/login');
                return;
            }
            try {
                const response = await api.get(`/api/superadmin/pets/${petId}`);
                const petData = response.data.data || response.data;
                setPet(petData);
                setFormData({
                    name: petData.name || '',
                    breed: petData.breed || '',
                    age: petData.age || '',
                    gender: petData.gender || '',
                    location: petData.location || '',
                    status: petData.status || 'AVAILABLE',
                    description: petData.description || ''
                });
            } catch (error) {
                setToastMsg({ type: 'error', text: error.response?.data?.message || 'Failed to fetch pet data. Please try again.' });
                setTimeout(() => navigate('/superadmin/pets'), 2000);
            } finally {
                setLoading(false);
            }
        };
        if (petId) fetchPet();
    }, [petId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Pet name is required.";
        if (!formData.breed.trim()) newErrors.breed = "Breed is required.";
        if (!String(formData.age).trim()) newErrors.age = "Age is required.";
        if (!formData.gender.trim()) newErrors.gender = "Gender is required.";
        if (!formData.location.trim()) newErrors.location = "Location is required.";
        if (!formData.status.trim()) newErrors.status = "Status is required.";
        if (!formData.description.trim()) newErrors.description = "Description is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setToastMsg({ type: 'error', text: 'Please correct the errors in the form.' });
            return;
        }
        try {
            await api.put(`/api/superadmin/pets/${petId}`, formData);
            setToastMsg({ type: 'success', text: 'Pet updated successfully!' });
            toast.success('Pet updated successfully!');
            setTimeout(() => navigate('/superadmin/pets'), 1000);
        } catch (error) {
            setToastMsg({ type: 'error', text: error.response?.data?.message || 'Failed to update pet. Please try again.' });
            toast.error(error.response?.data?.message || 'Failed to update pet. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Pet not found.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit Pet: {pet.name}</h1>
                {toastMsg && (
                    <div className={`mb-4 p-3 rounded ${toastMsg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{toastMsg.text}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                        <input
                            id="breed"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.breed ? 'border-red-500' : ''}`}
                        />
                        {errors.breed && <p className="text-sm text-red-500">{errors.breed}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.age ? 'border-red-500' : ''}`}
                        />
                        {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.gender ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : ''}`}
                        />
                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.status ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Status</option>
                            <option value="AVAILABLE">Available</option>
                            <option value="ADOPTED">Adopted</option>
                            <option value="PENDING">Pending</option>
                        </select>
                        {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
                            rows={4}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            onClick={() => navigate('/superadmin/pets')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPet; 