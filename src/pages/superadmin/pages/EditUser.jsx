import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';

const EditUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        role: '',
    });
    const [errors, setErrors] = useState({});
    const [toastMsg, setToastMsg] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('superadminToken');
            if (!token) {
                setToastMsg({ type: 'error', text: 'No superadmin token found. Please log in.' });
                setLoading(false);
                navigate('/superadmin/login');
                return;
            }
            try {
                const response = await api.get(`/api/superadmin/users/${userId}`);
                const userData = response.data.data || response.data;
                setUser(userData);
                setFormData({
                    fullName: userData.fullName || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                    role: userData.role || '',
                });
            } catch (error) {
                setToastMsg({ type: 'error', text: error.response?.data?.message || 'Failed to fetch user data. Please try again.' });
                setTimeout(() => navigate('/superadmin/users'), 2000);
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchUser();
    }, [userId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        if (!formData.role.trim()) newErrors.role = "Role is required.";
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
            await api.put(`/api/superadmin/users/${userId}`, formData);
            setToastMsg({ type: 'success', text: 'User updated successfully!' });
            setTimeout(() => navigate('/superadmin/users'), 1000);
        } catch (error) {
            setToastMsg({ type: 'error', text: error.response?.data?.message || 'Failed to update user. Please try again.' });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">User not found.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit User: {user.fullName}</h1>
                {toastMsg && (
                    <div className={`mb-4 p-3 rounded ${toastMsg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{toastMsg.text}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
                        />
                        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.role ? 'border-red-500' : ''}`}
                        />
                        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            onClick={() => navigate('/superadmin/users')}
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

export default EditUserPage;