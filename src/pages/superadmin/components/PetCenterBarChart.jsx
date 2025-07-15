import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../../../api/api';

export default function PetCenterBarChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (!token || userRole !== 'SUPERADMIN') {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get('/api/superadmin/pet-centers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transformedData = res.data.map(center => ({
        name: center.shelterName || 'Unnamed',
        pets: center.petCount || 0, // Use petCount from backend
      }));
      setData(transformedData);
    } catch (error) {
      console.error('Failed to fetch pet center stats:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Pet Centers Overview</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#1F2937" />
            <YAxis stroke="#1F2937" allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '4px' }}
              itemStyle={{ color: '#1F2937' }}
            />
            <Bar dataKey="pets" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {loading && <div className="text-center text-gray-500 mt-2">Loading...</div>}
        {!loading && data.length === 0 && <div className="text-center text-gray-500 mt-2">No data available</div>}
      </div>
    </div>
  );
}