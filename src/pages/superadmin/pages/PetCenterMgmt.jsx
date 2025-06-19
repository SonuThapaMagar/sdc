import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCenterBarChart from '../components/PetCenterBarChart';
import PetCenterList from '../components/PetCenterList';
import PetCenterDeleteDialog from '../components/PetCenterDeleteDialog';
import { toast } from 'react-toastify';
import api from '../../../api/api';

export default function PetCenterMgmt() {
  const navigate = useNavigate();
  const [petCenters, setPetCenters] = useState([]);
  const [deletePetCenterId, setDeletePetCenterId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('superadminToken');
    if (!token) {
      toast.error('Please log in to access pet center management');
      navigate('/superadmin/login');
      return;
    }
    fetchPetCenters();
  }, [navigate]);

  const fetchPetCenters = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('superadminToken');
      const response = await api.get('/api/superadmin/pet-centers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Map backend response to match PetCenterList props
      const mappedCenters = response.data.map(center => ({
        id: center.id,
        name: center.shelterName,
        location: center.address,
        contact: center.phone,
        status: 'active', // Assume active unless backend provides status
      }));

      setPetCenters(mappedCenters);
    } catch (error) {
      console.error('Failed to fetch pet centers:', error);
      setError('Failed to load pet centers');

      if (error.response?.status === 403) {
        toast.error('Permission denied. Ensure you have SUPERADMIN role.');
        navigate('/superadmin/login');
      } else if (error.response?.status === 401) {
        toast.error('Please log in to view pet centers');
        navigate('/superadmin/login');
      } else {
        toast.error('Failed to load pet centers. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (petCenterId) => {
    try {
      const token = localStorage.getItem('superadminToken');
      await api.delete(`/api/superadmin/pet-centers/${petCenterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPetCenters(petCenters.filter(pc => pc.id !== petCenterId));
      toast.success('Pet center deleted successfully!');
      setDeletePetCenterId(null);
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 403) {
        toast.error('Permission denied. Ensure you have SUPERADMIN role.');
      } else if (error.response?.status === 401) {
        toast.error('Please log in to delete pet centers');
        navigate('/superadmin/login');
      } else {
        toast.error('Failed to delete pet center. Please try again.');
      }
    }
  };

  const handleEdit = (petCenterId) => {
    const token = localStorage.getItem('superadminToken');
    if (!token) {
      toast.error('Please log in to edit pet centers');
      navigate('/superadmin/login');
      return;
    }
    navigate(`/superadmin/pet-centers/edit/${petCenterId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center h-[400px] text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Pet Center Management</h1>
      <PetCenterBarChart />
      <PetCenterList
        petCenters={petCenters}
        onEdit={handleEdit}
        onDelete={petCenterId => setDeletePetCenterId(petCenterId)}
      />
      <PetCenterDeleteDialog
        open={!!deletePetCenterId}
        onCancel={() => setDeletePetCenterId(null)}
        onConfirm={() => handleDelete(deletePetCenterId)}
      />
    </div>
  );
}