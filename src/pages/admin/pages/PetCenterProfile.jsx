import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { RiEdit2Line, RiSaveLine, RiCloseLine } from 'react-icons/ri';

const PetCenterProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    shelterName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    operatingHours: '',
    capacity: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('userRole');
    if (!token || userRole !== 'ADMIN') {
      toast.error('Please log in to access profile');
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockProfile = {
        shelterName: 'Happy Paws Shelter',
        address: '123 Pet Street, Animal City, AC 12345',
        phone: '(555) 123-4567',
        email: 'info@happypaws.com',
        description: 'A loving home for abandoned pets where we provide care, rehabilitation, and find forever homes for our furry friends.',
        operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 4:00 PM, Sunday: Closed',
        capacity: '50 pets',
        website: 'www.happypaws.com'
      };
      setProfile(mockProfile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.shelterName.trim()) newErrors.shelterName = "Shelter name is required.";
    if (!profile.address.trim()) newErrors.address = "Address is required.";
    if (!profile.phone.trim()) newErrors.phone = "Phone is required.";
    if (!profile.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = "Invalid email format.";
    if (!profile.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please correct the errors in the form.');
      return;
    }
    
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setErrors({});
    fetchProfile(); // Reset to original data
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pet Center Profile</h1>
            <p className="text-gray-600 mt-2">Manage your pet center information</p>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RiEdit2Line className="text-lg" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="shelterName" className="block text-sm font-medium text-gray-700 mb-2">
                  Shelter Name *
                </label>
                <input
                  id="shelterName"
                  name="shelterName"
                  type="text"
                  value={profile.shelterName}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.shelterName ? 'border-red-500' : 'border-gray-300'
                  } ${!editing ? 'bg-gray-50' : ''}`}
                />
                {errors.shelterName && <p className="text-sm text-red-500 mt-1">{errors.shelterName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${!editing ? 'bg-gray-50' : ''}`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } ${!editing ? 'bg-gray-50' : ''}`}
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={profile.website}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    !editing ? 'bg-gray-50' : ''
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } ${!editing ? 'bg-gray-50' : ''}`}
                />
                {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Hours
                </label>
                <input
                  id="operatingHours"
                  name="operatingHours"
                  type="text"
                  value={profile.operatingHours}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    !editing ? 'bg-gray-50' : ''
                  }`}
                />
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  id="capacity"
                  name="capacity"
                  type="text"
                  value={profile.capacity}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    !editing ? 'bg-gray-50' : ''
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={profile.description}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } ${!editing ? 'bg-gray-50' : ''}`}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>
            </div>

            {editing && (
              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <RiCloseLine className="text-lg" />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RiSaveLine className="text-lg" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetCenterProfile;
