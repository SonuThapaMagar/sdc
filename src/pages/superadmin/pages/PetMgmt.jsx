// src/pages/superadmin/pages/PetMgmt.jsx
import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Pencil, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { TOAST_MESSAGES } from '../../../constants/toastMessages.jsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Mock stats data (replace with API data later)
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

    // Add authentication check
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
            toast.success(TOAST_MESSAGES.EXPORT_EXCEL_SUCCESS);
        } catch (err) {
            console.error('Export to Excel error:', err);
            toast.error(TOAST_MESSAGES.EXPORT_EXCEL_FAILED);
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
                    <Card className="bg-white border border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl font-semibold text-gray-800">Pet Statistics</CardTitle>
                            <Button onClick={exportToExcel} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                <Download className="w-4 h-4" />
                                Export to Excel
                            </Button>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-gray-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-800">Adoption Status</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Table Section */}
            {!loading && (
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">All Pets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Breed</TableHead>
                                    <TableHead>Age</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pets.map((pet) => (
                                    <TableRow key={pet.id}>
                                        <TableCell>{pet.name || 'N/A'}</TableCell>
                                        <TableCell>{pet.breed || 'N/A'}</TableCell>
                                        <TableCell>{pet.age || 'N/A'}</TableCell>
                                        <TableCell>{pet.gender || 'N/A'}</TableCell>
                                        <TableCell>{pet.location || 'N/A'}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                pet.status === 'AVAILABLE' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {pet.status || 'N/A'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(pet.id)}
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4 text-blue-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(pet.id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {pets.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-gray-600">
                                            No pets found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Delete Confirmation Modal */}
            <Transition appear show={showDeleteConfirm} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setShowDeleteConfirm(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Confirm Deletion
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this pet? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                                            onClick={() => setShowDeleteConfirm(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            className="bg-red-600 text-white hover:bg-red-700"
                                            onClick={confirmDelete}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Edit Modal */}
            <Transition appear show={Boolean(editPet)} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {
                    setEditPet(null);
                    setFormErrors({});
                }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                        Edit Pet
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleUpdate();
                                            }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={formErrors.name ? "border-red-500" : ""}
                                                />
                                                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="breed">Breed</Label>
                                                <Input
                                                    id="breed"
                                                    value={formData.breed}
                                                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                                    className={formErrors.breed ? "border-red-500" : ""}
                                                />
                                                {formErrors.breed && <p className="text-sm text-red-500">{formErrors.breed}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="age">Age</Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    value={formData.age}
                                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                    className={formErrors.age ? "border-red-500" : ""}
                                                />
                                                {formErrors.age && <p className="text-sm text-red-500">{formErrors.age}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="gender">Gender</Label>
                                                <Input
                                                    id="gender"
                                                    value={formData.gender}
                                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                    className={formErrors.gender ? "border-red-500" : ""}
                                                />
                                                {formErrors.gender && <p className="text-sm text-red-500">{formErrors.gender}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <textarea
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    className={`w-full p-2 border rounded ${formErrors.description ? 'border-red-500' : ''}`}
                                                    rows={5}
                                                />
                                                {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    className={formErrors.location ? "border-red-500" : ""}
                                                />
                                                {formErrors.location && <p className="text-sm text-red-500">{formErrors.location}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="status">Status</Label>
                                                <Input
                                                    id="status"
                                                    value={formData.status}
                                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                    className={formErrors.status ? "border-red-500" : ""}
                                                />
                                                {formErrors.status && <p className="text-sm text-red-500">{formErrors.status}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="centerId">Center ID</Label>
                                                <Input
                                                    id="centerId"
                                                    value={formData.centerId}
                                                    onChange={(e) => setFormData({ ...formData, centerId: e.target.value })}
                                                    className={formErrors.centerId ? "border-red-500" : ""}
                                                />
                                                {formErrors.centerId && <p className="text-sm text-red-500">{formErrors.centerId}</p>}
                                            </div>
                                            <div className="mt-4 flex justify-end gap-2">
                                                <Button
                                                    type="button"
                                                    className="bg-gray-300 text-gray-600 hover:bg-gray-400"
                                                    onClick={() => {
                                                        setEditPet(null);
                                                        setFormErrors({});
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" className="bg-[#757FF6] text-white hover:bg-[#6a73e0]">
                                                    Save
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default PetMgmt;