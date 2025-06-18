import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Download, Pencil, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const userStats = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 90 },
    { month: "Apr", users: 200 },
    { month: "May", users: 160 },
    { month: "Jun", users: 110 },
];

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [toastMsg, setToastMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('superadminToken');
            if (!token) {
                setToastMsg({ type: 'error', text: 'No superadmin token found. Please log in.' });
                navigate('/superadmin/login');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/superadmin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                setToastMsg({ type: 'error', text: 'Failed to fetch users. Check console for details.' });
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [navigate]);

    const handleEdit = (userId) => {
        navigate(`/superadmin/users/edit/${userId}`);
    };

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        const token = localStorage.getItem('superadminToken');
        if (!token) {
            setToastMsg({ type: 'error', text: 'No superadmin token found. Please log in.' });
            navigate('/superadmin/login');
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/superadmin/users/${userToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.filter(user => user.id !== userToDelete));
            setToastMsg({ type: 'success', text: 'User deleted successfully!' });
        } catch (error) {
            setToastMsg({ type: 'error', text: 'Failed to delete user. Check console for details.' });
            console.error("Error deleting user:", error);
        } finally {
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        }
    };

    const exportToExcel = () => {
        import('xlsx').then(XLSX => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "users.xlsx");
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">User Management</h1>
            {toastMsg && (
                <div className={`mb-4 p-3 rounded ${toastMsg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{toastMsg.text}</div>
            )}
            {/* User Statistics Card */}
            <div className="bg-white border border-gray-100 shadow-sm mb-8 rounded-lg">
                <div className="flex flex-row items-center justify-between p-6 border-b border-gray-100">
                    <div className="text-xl font-semibold text-gray-800">User Statistics</div>
                    <button onClick={exportToExcel} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        <Download className="w-4 h-4" />
                        Export to Excel
                    </button>
                </div>
                <div className="p-6">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userStats}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" fill="#757FF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            {/* All Users Card */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-100">
                    <div className="text-xl font-semibold text-gray-800">All Users</div>
                </div>
                <div className="p-6 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 whitespace-nowrap">{user.fullName}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{user.phone}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{user.address}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{user.role}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="p-2 rounded hover:bg-blue-100"
                                                title="Edit"
                                                onClick={() => handleEdit(user.id)}
                                            >
                                                <Pencil className="w-4 h-4 text-blue-600" />
                                            </button>
                                            <button
                                                className="p-2 rounded hover:bg-red-100"
                                                title="Delete"
                                                onClick={() => handleDeleteClick(user.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Delete Confirmation Dialog */}
            {deleteDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <div className="font-semibold text-lg mb-2">Are you sure?</div>
                        <div className="text-gray-600 mb-4">This action cannot be undone. This will permanently delete the user and remove their data from our servers.</div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => setDeleteDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                onClick={handleDeleteConfirm}
                            >
                            Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;