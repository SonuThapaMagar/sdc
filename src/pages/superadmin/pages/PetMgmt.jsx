import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Pencil, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

const petStats = [
    { month: "Jan", pets: 45 },
    { month: "Feb", pets: 60 },
    { month: "Mar", pets: 35 },
    { month: "Apr", pets: 75 },
    { month: "May", pets: 55 },
    { month: "Jun", pets: 40 },
];

const statusData = [
    { name: "Available", value: 65, color: "#757FF6" },
    { name: "Adopted", value: 35, color: "#4bb543" },
];

const PetMgmt = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [editPet, setEditPet] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        gender: '',
        description: '',
        location: '',
        status: '',
        centerId: '',
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('superadminToken');
        if (!token) {
            toast.error('Please log in to access this page');
            window.location.href = '/superadmin/login';
            return;
        }
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('superadminToken');
            if (!token) {
                throw new Error('Authentication required');
            }
            const response = await api.get('/api/superadmin/pets');
            setPets(response.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch pets.';
            setError(errorMessage);
            console.error('Fetch pets error:', err);
            toast.error(errorMessage);
            if (err.response?.status === 403) {
                toast.error('You do not have permission to access this resource');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (petId) => {
        try {
            const token = localStorage.getItem('superadminToken');
            if (!token) {
                throw new Error('Authentication required');
            }
            const response = await api.get(`/api/superadmin/pets/${petId}`);
            const petData = response.data;
            setFormData({
                name: petData.name || '',
                breed: petData.breed || '',
                age: petData.age || '',
                gender: petData.gender || '',
                description: petData.description || '',
                location: petData.location || '',
                status: petData.status || '',
                centerId: petData.centerId || '',
            });
            setEditPet(petId);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch pet.';
            setError(errorMessage);
            console.error('Fetch pet error:', err);
            toast.error(errorMessage);
            if (err.response?.status === 403) {
                toast.error('You do not have permission to edit this pet');
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.breed.trim()) newErrors.breed = "Breed is required.";
        if (!formData.age || formData.age <= 0) newErrors.age = "Valid age is required.";
        if (!formData.gender.trim()) newErrors.gender = "Gender is required.";
        if (!formData.location.trim()) newErrors.location = "Location is required.";
        if (!formData.status.trim()) newErrors.status = "Status is required.";
        if (!formData.centerId.trim()) newErrors.centerId = "Center ID is required.";
        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        if (!validateForm()) {
            toast.error("Please correct the errors in the form.");
            return;
        }

        try {
            const token = localStorage.getItem('superadminToken');
            if (!token) {
                throw new Error('Authentication required');
            }
            await api.put(`/api/superadmin/pets/${editPet}`, formData);
            toast.success('Pet updated successfully.');
            setEditPet(null);
            setFormErrors({});
            await fetchPets();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update pet.';
            setError(errorMessage);
            console.error('Update pet error:', err);
            toast.error(errorMessage);
            if (err.response?.status === 403) {
                toast.error('You do not have permission to update this pet');
            }
        }
    };

    const handleDelete = (petId) => {
        setPetToDelete(petId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        setShowDeleteConfirm(false);
        if (petToDelete) {
            try {
                const token = localStorage.getItem('superadminToken');
                if (!token) {
                    throw new Error('Authentication required');
                }
                await api.delete(`/api/superadmin/pets/${petToDelete}`);
                toast.success('Pet deleted successfully.');
                setPetToDelete(null);
                await fetchPets();
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to delete pet.';
                setError(errorMessage);
                console.error('Delete pet error:', err);
                toast.error(errorMessage);
                if (err.response?.status === 403) {
                    toast.error('You do not have permission to delete this pet');
                }
            }
        }
    };

    const exportToExcel = () => {
        try {
            const worksheet = XLSX.utils.json_to_sheet(pets);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Pets');
            XLSX.writeFile(workbook, 'pets.xlsx');
            toast.success('Exported to Excel successfully.');
        } catch (err) {
            console.error('Export to Excel error:', err);
            toast.error('Failed to export to Excel.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Pet Management</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {loading && (
                <div className="text-center text-gray-600">Loading...</div>
            )}

            {/* Charts Section */}
            {!loading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-lg">
                        <div className="flex flex-row items-center justify-between p-6 border-b border-gray-100">
                            <div className="text-xl font-semibold text-gray-800">Pet Statistics</div>
                            <button onClick={exportToExcel} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                                <Download className="w-4 h-4" />
                                Export to Excel
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={petStats}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="pets" fill="#757FF6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 shadow-sm rounded-lg">
                        <div className="p-6 border-b border-gray-100">
                            <div className="text-xl font-semibold text-gray-800">Adoption Status</div>
                        </div>
                        <div className="p-6">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {statusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Section */}
            {!loading && (
                <div className="bg-white border border-gray-100 shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-100">
                        <div className="text-xl font-semibold text-gray-800">All Pets</div>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pets.map((pet) => (
                                    <tr key={pet.id}>
                                        <td className="px-4 py-2 whitespace-nowrap">{pet.name || 'N/A'}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{pet.breed || 'N/A'}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{pet.age || 'N/A'}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{pet.gender || 'N/A'}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{pet.location || 'N/A'}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                pet.status === 'AVAILABLE' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {pet.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="p-2 rounded hover:bg-blue-100"
                                                    title="Edit"
                                                    onClick={() => handleEdit(pet.id)}
                                                >
                                                    <Pencil className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button
                                                    className="p-2 rounded hover:bg-red-100"
                                                    title="Delete"
                                                    onClick={() => handleDelete(pet.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {pets.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center text-gray-600">
                                            No pets found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="font-semibold text-lg mb-2">Confirm Deletion</div>
                        <div className="text-gray-600 mb-4">Are you sure you want to delete this pet? This action cannot be undone.</div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
                                onClick={confirmDelete}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editPet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="font-semibold text-lg mb-2">Edit Pet</div>
                        <form
                            onSubmit={e => { e.preventDefault(); handleUpdate(); }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    className={`w-full p-2 border rounded ${formErrors.name ? 'border-red-500' : ''}`}
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                                <input
                                    className={`w-full p-2 border rounded ${formErrors.breed ? 'border-red-500' : ''}`}
                                    value={formData.breed}
                                    onChange={e => setFormData({ ...formData, breed: e.target.value })}
                                />
                                {formErrors.breed && <p className="text-sm text-red-500">{formErrors.breed}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    className={`w-full p-2 border rounded ${formErrors.age ? 'border-red-500' : ''}`}
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                />
                                {formErrors.age && <p className="text-sm text-red-500">{formErrors.age}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <input
                                    className={`w-full p-2 border rounded ${formErrors.gender ? 'border-red-500' : ''}`}
                                    value={formData.gender}
                                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                />
                                {formErrors.gender && <p className="text-sm text-red-500">{formErrors.gender}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className={`w-full p-2 border rounded ${formErrors.description ? 'border-red-500' : ''}`}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={5}
                                />
                                {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    className={`w-full p-2 border rounded ${formErrors.location ? 'border-red-500' : ''}`}
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                                {formErrors.location && <p className="text-sm text-red-500">{formErrors.location}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <input
                                    className={`w-full p-2 border rounded ${formErrors.status ? 'border-red-500' : ''}`}
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                />
                                {formErrors.status && <p className="text-sm text-red-500">{formErrors.status}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Center ID</label>
                                <input
                                    className={`w-full p-2 border rounded ${formErrors.centerId ? 'border-red-500' : ''}`}
                                    value={formData.centerId}
                                    onChange={e => setFormData({ ...formData, centerId: e.target.value })}
                                />
                                {formErrors.centerId && <p className="text-sm text-red-500">{formErrors.centerId}</p>}
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-600 hover:bg-gray-400 px-4 py-2 rounded"
                                    onClick={() => {
                                        setEditPet(null);
                                        setFormErrors({});
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetMgmt;