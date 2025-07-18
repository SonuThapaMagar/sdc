import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { toast } from 'react-toastify';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await api.get(`/api/admin/pets/${id}`);
        setPet(res.data);
      } catch (error) {
        toast.error('Failed to fetch pet details');
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!pet) return <div className="p-6">Pet not found.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back
        </button>
        <div className="flex flex-col items-center">
          {pet.imageUrl && (
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-40 h-40 object-cover rounded-full mb-4 border"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
          <div className="mb-2 text-gray-700"><b>Breed:</b> {pet.breed}</div>
          <div className="mb-2 text-gray-700"><b>Age:</b> {pet.age}</div>
          <div className="mb-2 text-gray-700"><b>Gender:</b> {pet.gender}</div>
          <div className="mb-2 text-gray-700"><b>Location:</b> {pet.location}</div>
          <div className="mb-2 text-gray-700"><b>Status:</b> {pet.status}</div>
          <div className="mb-2 text-gray-700"><b>Description:</b></div>
          <div className="text-gray-600 whitespace-pre-line">{pet.description}</div>
        </div>
      </div>
    </div>
  );
} 