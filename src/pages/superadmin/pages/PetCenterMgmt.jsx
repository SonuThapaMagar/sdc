// src/pages/superadmin/pages/PetCenterMgmt.jsx
import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { Download, Pencil, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PetCenterMgmt = () => {
  const [centers, setCenters] = useState([]);
  const [centerStats, setCenterStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCenter, setEditCenter] = useState(null);
  const [formData, setFormData] = useState({
    shelterName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [centerToDelete, setCenterToDelete] = useState(null);

  // Fetch all pet centers
  const fetchCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/superadmin/pet-centers');
      setCenters(response.data);
    } catch (err) {
      setError('Failed to fetch pet centers.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch center stats
  const fetchCenterStats = async () => {
    try {
      const response = await api.get('/api/superadmin/pet-centers');
      const centers = response.data;
      const stats = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return {
          month: date.toLocaleString('default', { month: 'short' }),
          centers: 0,
        };
      }).reverse();
      centers.forEach((center) => {
        if (center.createdAt) {
          const month = new Date(center.createdAt).toLocaleString('default', { month: 'short' });
          const stat = stats.find((s) => s.month === month);
          if (stat) stat.centers += 1;
        }
      });
      setCenterStats(stats);
    } catch (err) {
      setCenterStats([
        { month: 'Jan', centers: 5 },
        { month: 'Feb', centers: 7 },
        { month: 'Mar', centers: 4 },
        { month: 'Apr', centers: 8 },
        { month: 'May', centers: 6 },
        { month: 'Jun', centers: 9 },
      ]);
    }
  };

  // Handle edit pet center
  const handleEdit = async (centerId) => {
    try {
      const response = await api.get(`/api/superadmin/pet-centers/${centerId}`);
      const centerData = response.data;
      setFormData({
        shelterName: centerData.shelterName || '',
        address: centerData.address || '',
        phone: centerData.phone || '',
        email: centerData.email || '',
        description: centerData.description || '',
      });
      setEditCenter(centerId);
    } catch (err) {
      setError('Failed to fetch center details.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.shelterName.trim()) newErrors.shelterName = "Shelter Name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    try {
      await api.put(`/api/superadmin/pet-centers/${editCenter}`, formData);
      setEditCenter(null);
      setFormErrors({});
      await fetchCenters();
    } catch (err) {
      setError('Failed to update pet center.');
    }
  };

  // Handle delete pet center
  const handleDelete = (centerId) => {
    setCenterToDelete(centerId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteCenter = async () => {
    setShowDeleteConfirm(false);
    if (centerToDelete) {
      try {
        await api.delete(`/api/superadmin/pet-centers/${centerToDelete}`);
        setCenterToDelete(null);
        fetchCenters();
      } catch (err) {
        setError('Failed to delete pet center.');
      }
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    import('xlsx').then(XLSX => {
      const worksheet = XLSX.utils.json_to_sheet(centers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Pet Centers');
      XLSX.writeFile(workbook, 'pet-centers.xlsx');
    });
  };

  useEffect(() => {
    fetchCenters();
    fetchCenterStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Pet Center Management</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      {loading && (
        <div className="text-center text-gray-600">Loading...</div>
      )}
      {/* Chart Section */}
      {!loading && (
        <div className="bg-white border border-gray-100 shadow-sm mb-8 rounded-lg">
          <div className="flex flex-row items-center justify-between p-6 border-b border-gray-100">
            <div className="text-xl font-semibold text-gray-800">Center Statistics</div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              <Download className="w-4 h-4" />
              Export to Excel
            </button>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={centerStats}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="centers" fill="#757FF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      {/* Table Section */}
      {!loading && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-lg">
          <div className="p-6 border-b border-gray-100">
            <div className="text-xl font-semibold text-gray-800">All Pet Centers</div>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {centers.map((center) => (
                  <tr key={center.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{center.shelterName || 'N/A'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{center.address || 'N/A'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{center.phone || 'N/A'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{center.email || 'N/A'}</td>
                    <td className="px-4 py-2 whitespace-nowrap max-w-[200px] truncate">{center.description || 'N/A'}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 rounded hover:bg-blue-100"
                          title="Edit"
                          onClick={() => handleEdit(center.id)}
                        >
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-red-100"
                          title="Delete"
                          onClick={() => handleDelete(center.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {centers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-600">No pet centers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {editCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="font-semibold text-lg mb-2">Edit Pet Center</div>
                    <form
              onSubmit={e => { e.preventDefault(); handleUpdate(); }}
                      className="space-y-4"
                    >
                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shelter Name</label>
                <input
                  className={`w-full p-2 border rounded ${formErrors.shelterName ? 'border-red-500' : ''}`}
                          value={formData.shelterName}
                  onChange={e => setFormData({ ...formData, shelterName: e.target.value })}
                        />
                        {formErrors.shelterName && <p className="text-sm text-red-500">{formErrors.shelterName}</p>}
                      </div>
                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  className={`w-full p-2 border rounded ${formErrors.address ? 'border-red-500' : ''}`}
                          value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                        />
                        {formErrors.address && <p className="text-sm text-red-500">{formErrors.address}</p>}
                      </div>
                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  className={`w-full p-2 border rounded ${formErrors.phone ? 'border-red-500' : ''}`}
                          value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
                      </div>
                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                          type="email"
                  className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : ''}`}
                          value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                        {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                      </div>
                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                  className={`w-full p-2 border rounded ${formErrors.description ? 'border-red-500' : ''}`}
                          value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                        />
                        {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                <button
                          type="button"
                  className="bg-gray-300 text-gray-600 hover:bg-gray-400 px-4 py-2 rounded"
                  onClick={() => { setEditCenter(null); setFormErrors({}); }}
                        >
                          Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded">Save</button>
                      </div>
                    </form>
                  </div>
            </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="font-semibold text-lg mb-2">Confirm Deletion</div>
            <div className="text-gray-600 mb-4">Are you sure you want to delete this pet center? This action cannot be undone.</div>
                  <div className="mt-4 flex justify-end gap-2">
              <button
                      type="button"
                className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      No
              </button>
              <button
                      type="button"
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
                      onClick={confirmDeleteCenter}
                    >
                      Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCenterMgmt;