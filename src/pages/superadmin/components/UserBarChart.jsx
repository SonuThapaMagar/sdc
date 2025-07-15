import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { RiFileExcel2Line } from 'react-icons/ri';

export default function UserBarChart({ monthlyStats, totalUsers }) {
  // Fallback if monthlyStats is empty
  if (!monthlyStats || monthlyStats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center text-gray-500">
        No monthly data available
        {totalUsers > 0 && (
          <p className="mt-2">Total Users: {totalUsers}</p>
        )}
      </div>
    );
  }

  const handleExport = () => {
    // Basic export logic - can be enhanced with a library like FileSaver.js
    const csv = [
      'Month,Users',
      ...monthlyStats.map(stat => `${stat.month},${stat.users}`).join('\n'),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_stats.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">User Statistics</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RiFileExcel2Line className="text-xl" />
          Export to CSV
        </button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#1F2937" />
            <YAxis stroke="#1F2937" />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '4px' }}
              itemStyle={{ color: '#1F2937' }}
            />
            <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-600 mt-2">Total Users: {totalUsers}</p>
    </div>
  );
}