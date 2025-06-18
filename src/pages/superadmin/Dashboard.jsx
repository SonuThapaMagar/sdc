import React from 'react';
import { FaUsers, FaPaw, FaStore, FaHeart } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const stats = [
  { title: 'Total Users', value: 1200, icon: <FaUsers className="text-blue-500 text-2xl" /> },
  { title: 'Total Pets', value: 350, icon: <FaPaw className="text-pink-500 text-2xl" /> },
  { title: 'Total Pet Centers', value: 15, icon: <FaStore className="text-green-500 text-2xl" /> },
  { title: 'Total Adoptions', value: 200, icon: <FaHeart className="text-red-500 text-2xl" /> },
];

const barData = [
  { month: 'Jan', users: 100 },
  { month: 'Feb', users: 150 },
  { month: 'Mar', users: 120 },
  { month: 'Apr', users: 180 },
  { month: 'May', users: 200 },
  { month: 'Jun', users: 170 },
];

const pieData = [
  { name: 'Center A', value: 5, color: '#34d399' },
  { name: 'Center B', value: 4, color: '#60a5fa' },
  { name: 'Center C', value: 6, color: '#f472b6' },
];

const recentActivities = [
  { activity: 'User John Doe registered', time: '2 hours ago' },
  { activity: 'Pet Bella adopted', time: '4 hours ago' },
  { activity: 'New pet center opened', time: '1 day ago' },
  { activity: 'User Jane Smith updated profile', time: '2 days ago' },
];

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
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
