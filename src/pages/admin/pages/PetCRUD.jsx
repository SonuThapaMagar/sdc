import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { RiEdit2Line, RiDeleteBin6Line, RiAddLine, RiCloseLine, RiSaveLine } from 'react-icons/ri';

const initialPet = {
  name: '',
  breed: '',
  age: '',
  gender: '',
  location: '',
  status: 'AVAILABLE',
  description: ''
};

export default function PetCRUD() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPet, setCurrentPet] = useState(initialPet);
  const [errors, setErrors] = useState({});
  const [deletePetId, setDeletePetId] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/admin/pets');
      setPets(res.data);
    } catch (error) {
      toast.error('Failed to fetch pets');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setCurrentPet(initialPet);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (pet) => {
    setEditMode(true);
    setCurrentPet(pet);
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPet(initialPet);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPet((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentPet.name.trim()) newErrors.name = 'Name is required.';
    if (!currentPet.breed.trim()) newErrors.breed = 'Breed is required.';
    if (!String(currentPet.age).trim()) newErrors.age = 'Age is required.';
    if (!currentPet.gender.trim()) newErrors.gender = 'Gender is required.';
    if (!currentPet.location.trim()) newErrors.location = 'Location is required.';
    if (!currentPet.status.trim()) newErrors.status = 'Status is required.';
    if (!currentPet.description.trim()) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct the errors in the form.');
      return;
    }
    try {
      if (editMode) {
        await api.put(`/api/admin/pets/${currentPet.id}`, currentPet);
        toast.success('Pet updated successfully!');
      } else {
        await api.post('/api/admin/pets', currentPet);
        toast.success('Pet added successfully!');
      }
      closeModal();
      fetchPets();
    } catch (error) {
      toast.error('Failed to save pet. Please try again.');
    }
  };

  const handleDelete = async (petId) => {
    try {
      await api.delete(`/api/admin/pets/${petId}`);
      setPets(pets.filter((p) => p.id !== petId));
      toast.success('Pet deleted successfully!');
      setDeletePetId(null);
    } catch (error) {
      toast.error('Failed to delete pet. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pet Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RiAddLine className="text-lg" /> Add Pet
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pets.map((pet) => (
                <tr key={pet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{pet.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.breed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pet.status === 'AVAILABLE'
                        ? 'bg-green-100 text-green-800'
                        : pet.status === 'ADOPTED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pet.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(pet)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title="Edit"
                    >
                      <RiEdit2Line className="text-xl" />
                    </button>
                    <button
                      onClick={() => setDeletePetId(pet.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <RiDeleteBin6Line className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
              {pets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No pets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{editMode ? 'Edit Pet' : 'Add Pet'}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  name="name"
                  value={currentPet.name}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input
                  name="breed"
                  value={currentPet.breed}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.breed ? 'border-red-500' : ''}`}
                />
                {errors.breed && <p className="text-sm text-red-500">{errors.breed}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  name="age"
                  value={currentPet.age}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.age ? 'border-red-500' : ''}`}
                />
                {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={currentPet.gender}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.gender ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  name="location"
                  value={currentPet.location}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={currentPet.status}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.status ? 'border-red-500' : ''}`}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="ADOPTED">Adopted</option>
                  <option value="PENDING">Pending</option>
                </select>
                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={currentPet.description}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
                  rows={3}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RiSaveLine className="text-lg" /> {editMode ? 'Save Changes' : 'Add Pet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletePetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="font-semibold text-lg mb-2">Are you sure?</div>
            <div className="text-gray-600 mb-4">
              This action cannot be undone. This will permanently delete the pet and remove their data from our servers.
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setDeletePetId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(deletePetId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
