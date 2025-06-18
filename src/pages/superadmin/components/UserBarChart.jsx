import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { RiFileExcel2Line } from 'react-icons/ri';

export default function UserBarChart() {
  // Sample data - replace with actual data from your API
  const data = [
    { month: 'Jan', users: 65 },
    { month: 'Feb', users: 59 },
    { month: 'Mar', users: 80 },
    { month: 'Apr', users: 81 },
    { month: 'May', users: 56 },
    { month: 'Jun', users: 55 },
  ];

  const handleExport = () => {
    // Implement export to Excel functionality
    console.log('Exporting to Excel...');
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
          Export to Excel
        </button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
