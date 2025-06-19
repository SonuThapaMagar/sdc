import React, { useState, useEffect } from 'react';
import { FaUsers, FaPaw, FaStore, FaHeart } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('superadminToken');
    if (!token) {
      toast.error('Please log in to access the dashboard');
      navigate('/superadmin/login');
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard stats
      const statsResponse = await api.get('/api/superadmin/dashboard/stats');
      const statsData = [
        { title: 'Total Users', value: statsResponse.data.totalUsers, icon: <FaUsers className="text-blue-500 text-2xl" /> },
        { title: 'Total Pets', value: statsResponse.data.totalPets, icon: <FaPaw className="text-pink-500 text-2xl" /> },
        { title: 'Total Pet Centers', value: statsResponse.data.totalCenters, icon: <FaStore className="text-green-500 text-2xl" /> },
        { title: 'Total Adoptions', value: statsResponse.data.totalAdoptions, icon: <FaHeart className="text-red-500 text-2xl" /> },
      ];
      setStats(statsData);

      // Fetch monthly stats
      const monthlyStatsResponse = await api.get('/api/superadmin/dashboard/monthly-stats');
      const mappedBarData = monthlyStatsResponse.data.map(stat => ({
        month: stat.month,
        users: stat.users,
      }));
      setBarData(mappedBarData);

      // Fetch pet centers distribution (mocked since no specific endpoint)
      const petCentersResponse = await api.get('/api/superadmin/pet-centers');
      const centersCount = petCentersResponse.data.reduce((acc, center) => {
        acc[center.shelterName] = (acc[center.shelterName] || 0) + 1;
        return acc;
      }, {});
      const colors = ['#34d399', '#60a5fa', '#f472b6', '#f59e0b', '#ef4444'];
      const mappedPieData = Object.entries(centersCount).map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      }));
      setPieData(mappedPieData);

      // Fetch recent activities
      const activitiesResponse = await api.get('/api/superadmin/dashboard/recent-activities');
      const mappedActivities = activitiesResponse.data.map(activity => ({
        activity: activity.description,
        time: activity.time,
      }));
      setRecentActivities(mappedActivities);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      if (error.response?.status === 403) {
        toast.error('Permission denied. Ensure you have SUPERADMIN role.');
        navigate('/superadmin/login');
      } else if (error.response?.status === 401) {
        toast.error('Please log in to view dashboard');
        navigate('/superadmin/login');
      } else {
        toast.error('Failed to load dashboard data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
              {stat.icon}
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium">{stat.title}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold text-gray-800 mb-4">Monthly User Growth</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold text-gray-800 mb-4">Pet Centers Distribution</div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap">{item.activity}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}