import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { UserOutlined, AppstoreOutlined, SolutionOutlined, ShopOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

const iconMap = {
  UserOutlined: <UserOutlined className="text-[#757FF6] text-xl" />,
  AppstoreOutlined: <AppstoreOutlined className="text-[#ff7f7f] text-xl" />,
  ShopOutlined: <ShopOutlined className="text-[#4bb543] text-xl" />,
  SolutionOutlined: <SolutionOutlined className="text-[#757FF6] text-xl" />,
};

export default function SuperadminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPets: 0,
    totalCenters: 0,
    totalAdoptions: 0,
  });
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [petStatusData, setPetStatusData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch summary stats
      const statsResponse = await api.get('/api/superadmin/dashboard/stats');
      setStats(statsResponse.data);

      // Fetch monthly stats
      const monthlyStatsResponse = await api.get('/api/superadmin/dashboard/monthly-stats');
      setMonthlyStats(monthlyStatsResponse.data);

      // Fetch pet status
      const petStatusResponse = await api.get('/api/superadmin/dashboard/pet-status');
      setPetStatusData(petStatusResponse.data);

      // Fetch recent activities
      const activitiesResponse = await api.get('/api/superadmin/dashboard/recent-activities');
      setRecentActivities(activitiesResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
      console.error('Fetch dashboard error:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(monthlyStats);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Monthly Statistics');
      XLSX.writeFile(workbook, 'dashboard-stats.xlsx');
      toast.success('Statistics exported successfully.');
    } catch (err) {
      console.error('Export to Excel error:', err);
      toast.error('Failed to export statistics.');
    }
  };

  // Compute previous month's stats for percentage change
  const lastMonthStats = monthlyStats.length > 1 ? monthlyStats[monthlyStats.length - 2] : null;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <Button onClick={exportToExcel} className="flex items-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="w-4 h-4" />
          Export Statistics
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-center text-gray-600">Loading...</div>
      )}

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gradient-to-br from-white to-[#f8faff] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e6e8fa] flex items-center justify-center">
                  <UserOutlined className="text-[#757FF6] text-xl" />
                </div>
                <div>
                  <CardTitle className="text-base font-medium text-gray-600">Total Users</CardTitle>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-500">
                    {lastMonthStats ? calculatePercentageChange(stats.totalUsers, lastMonthStats.users) : 'N/A'} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-[#fff5f5] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ffe7e7] flex items-center justify-center">
                  <AppstoreOutlined className="text-[#ff7f7f] text-xl" />
                </div>
                <div>
                  <CardTitle className="text-base font-medium text-gray-600">Total Pets</CardTitle>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalPets}</p>
                  <p className="text-sm text-gray-500">
                    {lastMonthStats ? calculatePercentageChange(stats.totalPets, lastMonthStats.pets) : 'N/A'} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-[#f5fff5] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e7fbe7] flex items-center justify-center">
                  <ShopOutlined className="text-[#4bb543] text-xl" />
                </div>
                <div>
                  <CardTitle className="text-base font-medium text-gray-600">Pet Centers</CardTitle>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalCenters}</p>
                  <p className="text-sm text-gray-500">
                    {lastMonthStats ? calculatePercentageChange(stats.totalCenters, lastMonthStats.centers) : 'N/A'} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-[#f0f4ff] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e6e8fa] flex items-center justify-center">
                  <SolutionOutlined className="text-[#757FF6] text-xl" />
                </div>
                <div>
                  <CardTitle className="text-base font-medium text-gray-600">Adoptions</CardTitle>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalAdoptions}</p>
                  <p className="text-sm text-gray-500">
                    {lastMonthStats ? calculatePercentageChange(stats.totalAdoptions, lastMonthStats.adoptions) : 'N/A'} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl font-semibold text-gray-800">Monthly Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyStats}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" name="Users" fill="#757FF6" />
                    <Bar dataKey="pets" name="Pets" fill="#ff7f7f" />
                    <Bar dataKey="centers" name="Centers" fill="#4bb543" />
                    <Bar dataKey="adoptions" name="Adoptions" fill="#757FF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl font-semibold text-gray-800">Pet Adoption Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={petStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {petStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity Section */}
      {!loading && (
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6 bg-[#f8fafc] rounded-xl border border-gray-100 hover:bg-[#f0f4ff] transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl ${activity.bgColor} flex items-center justify-center`}>
                    {iconMap[activity.icon]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-lg">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
              {recentActivities.length === 0 && (
                <p className="text-center text-gray-600">No recent activities.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}