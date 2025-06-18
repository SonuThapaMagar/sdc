// src/pages/superadmin/pages/EditUserPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const EditUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
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

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('superadminToken');
            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Authentication Error",
                    description: "No superadmin token found. Please log in.",
                });
                setLoading(false);
                navigate('/superadmin/login');
                return;
            }

            try {
                const response = await api.get(`/api/superadmin/users/${userId}`);
                // Check if response.data exists and has the expected structure
                if (response.data) {
                    const userData = response.data.data || response.data;
                    setUser(userData);
                    setFormData({
                        fullName: userData.fullName || '',
                        email: userData.email || '',
                        phone: userData.phone || '',
                        address: userData.address || '',
                        role: userData.role || '',
                    });
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.response?.data?.message || "Failed to fetch user data. Please try again.",
                });
                // Navigate back to users list after error
                setTimeout(() => navigate('/superadmin/users'), 2000);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId, navigate, toast]);

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
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please correct the errors in the form.",
            });
            return;
        }

        try {
            await api.put(`/api/superadmin/users/${userId}`, formData);
            toast({
                title: "Success",
                description: "User updated successfully!",
            });
            navigate('/superadmin/users');
        } catch (error) {
            console.error("Error updating user:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.response?.data?.message || "Failed to update user. Please try again.",
            });
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
            <Card className="w-full max-w-2xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Edit User: {user.fullName}</CardTitle>
                    <CardDescription>Update the details for this user.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={errors.fullName ? "border-red-500" : ""}
                            />
                            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={errors.address ? "border-red-500" : ""}
                            />
                            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={errors.role ? "border-red-500" : ""}
                            />
                            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/superadmin/users')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#757FF6] hover:bg-[#6a73e0]">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditUserPage;