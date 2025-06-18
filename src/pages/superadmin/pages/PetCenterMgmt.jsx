// src/pages/superadmin/pages/PetCenterMgmt.jsx
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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Pencil, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { TOAST_MESSAGES } from '../../../constants/toastMessages.jsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      setError(err.response?.data?.message || TOAST_MESSAGES.FETCH_CENTERS_FAILED);
      console.error('Fetch centers error:', err);
      toast.error(err.response?.data?.message || TOAST_MESSAGES.FETCH_CENTERS_FAILED);
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
      console.error('Fetch stats error:', err);
      toast.error(TOAST_MESSAGES.FETCH_STATS_FAILED);
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
      setError(err.response?.data?.message || TOAST_MESSAGES.FETCH_CENTER_FAILED);
      console.error('Fetch center error:', err);
      toast.error(err.response?.data?.message || TOAST_MESSAGES.FETCH_CENTER_FAILED);
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
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      await api.put(`/api/superadmin/pet-centers/${editCenter}`, formData);
      toast.success(TOAST_MESSAGES.UPDATE_CENTER_SUCCESS);
      setEditCenter(null);
      setFormErrors({});
      await fetchCenters();
    } catch (err) {
      setError(err.response?.data?.message || TOAST_MESSAGES.UPDATE_CENTER_FAILED);
      console.error('Update center error:', err);
      toast.error(err.response?.data?.message || TOAST_MESSAGES.UPDATE_CENTER_FAILED);
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
        toast.success(TOAST_MESSAGES.DELETE_CENTER_SUCCESS);
        setCenterToDelete(null);
        fetchCenters();
      } catch (err) {
        setError(err.response?.data?.message || TOAST_MESSAGES.DELETE_CENTER_FAILED);
        console.error('Delete center error:', err);
        toast.error(err.response?.data?.message || TOAST_MESSAGES.DELETE_CENTER_FAILED);
      }
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(centers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Pet Centers');
      XLSX.writeFile(workbook, 'pet-centers.xlsx');
      toast.success(TOAST_MESSAGES.EXPORT_EXCEL_SUCCESS);
    } catch (err) {
      console.error('Export to Excel error:', err);
      toast.error(TOAST_MESSAGES.EXPORT_EXCEL_FAILED);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCenters();
    fetchCenterStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Pet Center Management</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-center text-gray-600">Loading...</div>
      )}

      {/* Chart Section */}
      {!loading && (
        <Card className="bg-white border border-gray-100 shadow-sm mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">Center Statistics</CardTitle>
            <Button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="w-4 h-4" />
              Export to Excel
            </Button>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}

      {/* Table Section */}
      {!loading && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">All Pet Centers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {centers.map((center) => (
                  <TableRow key={center.id}>
                    <TableCell>{center.shelterName || 'N/A'}</TableCell>
                    <TableCell>{center.address || 'N/A'}</TableCell>
                    <TableCell>{center.phone || 'N/A'}</TableCell>
                    <TableCell>{center.email || 'N/A'}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {center.description || 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(center.id)}
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(center.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {centers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-600">
                      No pet centers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      <Transition appear show={Boolean(editCenter)} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setEditCenter(null);
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
                    Edit Pet Center
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
                        <Label htmlFor="shelterName">Shelter Name</Label>
                        <Input
                          id="shelterName"
                          value={formData.shelterName}
                          onChange={(e) => setFormData({ ...formData, shelterName: e.target.value })}
                          className={formErrors.shelterName ? "border-red-500" : ""}
                        />
                        {formErrors.shelterName && <p className="text-sm text-red-500">{formErrors.shelterName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className={formErrors.address ? "border-red-500" : ""}
                        />
                        {formErrors.address && <p className="text-sm text-red-500">{formErrors.address}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={formErrors.phone ? "border-red-500" : ""}
                        />
                        {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={formErrors.email ? "border-red-500" : ""}
                        />
                        {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
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
                      <div className="mt-4 flex justify-end gap-2">
                        <Button
                          type="button"
                          className="bg-gray-300 text-gray-600 hover:bg-gray-400"
                          onClick={() => {
                            setEditCenter(null);
                            setFormErrors({});
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#757FF6] text-white hover:bg-[#6a73E0]">
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
                      Are you sure you want to delete this pet center? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      type="button"
                      className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      No
                    </Button>
                    <Button
                      type="button"
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={confirmDeleteCenter}
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
    </div>
  );
};

export default PetCenterMgmt;