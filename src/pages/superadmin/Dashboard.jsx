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
  const [activityPage, setActivityPage] = useState(0); // zero-based
  const [activityTotalPages, setActivityTotalPages] = useState(1);
  const activitiesPerPage = 5;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (!token || userRole !== 'SUPERADMIN') {
      toast.error('Please log in to access the dashboard');
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [navigate, activityPage]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard stats
      const statsResponse = await api.get('/api/superadmin/dashboard/stats');
      console.log('Stats Response:', statsResponse.data); // Debug log
      const statsData = statsResponse.data
        ? [
            { title: 'Total Users', value: statsResponse.data.totalUsers || 0, icon: <FaUsers className="text-blue-500 text-2xl" /> },
            { title: 'Total Pets', value: statsResponse.data.totalPets || 0, icon: <FaPaw className="text-pink-500 text-2xl" /> },
            { title: 'Total Pet Centers', value: statsResponse.data.totalCenters || 0, icon: <FaStore className="text-green-500 text-2xl" /> },
            { title: 'Total Adoptions', value: statsResponse.data.totalAdoptions || 0, icon: <FaHeart className="text-red-500 text-2xl" /> },
          ]
        : [];
      setStats(statsData);

      // Fetch monthly stats
      const monthlyStatsResponse = await api.get('/api/superadmin/dashboard/monthly-stats');
      console.log('Monthly Stats Response:', monthlyStatsResponse.data); // Debug log
      const mappedBarData = monthlyStatsResponse.data && monthlyStatsResponse.data.length > 0
        ? monthlyStatsResponse.data.map(stat => ({
            month: stat.month || 'N/A',
            users: stat.userCount || 0,
            pets: stat.petCount || 0,
            centers: stat.centerCount || 0,
            adoptions: stat.adoptionCount || 0,
          }))
        : generateDummyMonthlyData(); // Always generate dummy data if no data
      setBarData(mappedBarData);

      // Fetch pet status
      const petStatusResponse = await api.get('/api/superadmin/dashboard/pet-status');
      console.log('Pet Status Response:', petStatusResponse.data); // Debug log
      const mappedPieData = petStatusResponse.data && petStatusResponse.data.length > 0
        ? petStatusResponse.data.map(stat => ({
            name: stat.status || 'Unknown',
            value: stat.count || 0,
            color: stat.color || '#757FF6',
          }))
        : [];
      setPieData(mappedPieData);

      // Fetch recent activities with pagination
      const activitiesResponse = await api.get(`/api/superadmin/dashboard/recent-activities?page=${activityPage}&size=${activitiesPerPage}`);
      const data = activitiesResponse.data;
      let mappedActivities = [];
      if (data && typeof data === 'object') {
        mappedActivities = (data.content || data).map(activity => ({
          activity: activity.description || 'No description',
          time: activity.time || 'N/A',
          title: activity.title || 'No title',
          type: activity.type || 'unknown',
          icon: activity.icon || 'DefaultIcon',
          backgroundColor: activity.backgroundColor || '#e6e8fa',
        }));
        setActivityTotalPages(Math.ceil((data.totalElements || mappedActivities.length || 1) / activitiesPerPage));
      } else {
        setActivityTotalPages(1);
      }
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

  // Generate dummy monthly data for bar chart up to current month (July 2025)
  const generateDummyMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    return months.map(month => ({
      month,
      users: 0,
      pets: 0,
      centers: 0,
      adoptions: 0,
    }));
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
              <div className="text-2xl font-bold text-gray-800">{stat.value !== undefined ? stat.value : 0}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Bar Chart - Monthly Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold text-gray-800 mb-4">Monthly Statistics</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" name="Users" />
                <Bar dataKey="pets" fill="#f472b6" name="Pets" />
                <Bar dataKey="centers" fill="#34d399" name="Centers" />
                <Bar dataKey="adoptions" fill="#ef4444" name="Adoptions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie Chart - Pet Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold text-gray-800 mb-4">Pet Status Distribution</div>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap">{item.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.activity}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center py-4">
          <button
            className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setActivityPage((prev) => Math.max(prev - 1, 0))}
            disabled={activityPage === 0}
          >
            Prev
          </button>
          <span className="mx-2">Page {activityPage + 1} of {activityTotalPages}</span>
          <button
            className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setActivityPage((prev) => Math.min(prev + 1, activityTotalPages - 1))}
            disabled={activityPage >= activityTotalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}