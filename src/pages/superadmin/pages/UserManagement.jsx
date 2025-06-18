import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBarChart from '../components/UserBarChart';
import UserList from '../components/UserList';
import UserDeleteDialog from '../components/UserDeleteDialog';
import { toast } from 'react-toastify';
import api from '../../../api/api';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users from API
      const res = await api.get('/api/superadmin/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/api/superadmin/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      toast.success('User deleted successfully!');
      setDeleteUserId(null);
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (userId) => {
    navigate(`/superadmin/users/edit/${userId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">User Management</h1>
      <UserBarChart />
      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={userId => setDeleteUserId(userId)}
      />
      <UserDeleteDialog
        open={!!deleteUserId}
        onCancel={() => setDeleteUserId(null)}
        onConfirm={() => handleDelete(deleteUserId)}
      />
    </div>
  );
}
