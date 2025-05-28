import { Card, Avatar } from 'antd';
import { UserOutlined, AppstoreOutlined, SolutionOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import SuperadminLayout from '../layout/SuperadminLayout';

const barData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 90 },
    { month: "Apr", users: 200 },
    { month: "May", users: 160 },
    { month: "Jun", users: 110 },
];

const pieData = [
    { name: "Adopted", value: 75, color: "#757FF6" },
    { name: "Available", value: 25, color: "#ff7f7f" },
];

export default function SuperadminDashboard() {
    return (
        <SuperadminLayout>
            <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10 mb-10">
                    {/* Total Users */}
                    <Card
                        className="shadow-lg transform transition-transform hover:scale-105"
                        style={{
                            background: '#96B2FB',
                            borderRadius: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 200,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                        bodyStyle={{ 
                            width: '100%', 
                            padding: '32px 24px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#757FF6', marginBottom: 16 }} />
                        <div className="text-xl font-medium mb-2" style={{ color: '#757FF6', fontFamily: 'Poppins, sans-serif' }}>Total Users</div>
                        <div className="text-4xl font-bold" style={{ color: '#222', fontFamily: 'Poppins, sans-serif' }}>789</div>
                    </Card>
                    {/* Total Animals */}
                    <Card
                        className="shadow-lg transform transition-transform hover:scale-105"
                        style={{
                            background: '#ffe7e7',
                            borderRadius: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 200,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                        bodyStyle={{ 
                            width: '100%', 
                            padding: '32px 24px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        <Avatar size={64} icon={<AppstoreOutlined />} style={{ backgroundColor: '#ff7f7f', marginBottom: 16 }} />
                        <div className="text-xl font-medium mb-2" style={{ color: '#ff7f7f', fontFamily: 'Poppins, sans-serif' }}>Total Animals</div>
                        <div className="text-4xl font-bold" style={{ color: '#222', fontFamily: 'Poppins, sans-serif' }}>120</div>
                    </Card>
                    {/* Total Adoption */}
                    <Card
                        className="shadow-lg transform transition-transform hover:scale-105"
                        style={{
                            background: '#e7fbe7',
                            borderRadius: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 200,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                        bodyStyle={{ 
                            width: '100%', 
                            padding: '32px 24px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        <Avatar size={64} icon={<SolutionOutlined />} style={{ backgroundColor: '#4bb543', marginBottom: 16 }} />
                        <div className="text-xl font-medium mb-2" style={{ color: '#4bb543', fontFamily: 'Poppins, sans-serif' }}>Total Adoption</div>
                        <div className="text-4xl font-bold" style={{ color: '#222', fontFamily: 'Poppins, sans-serif' }}>4</div>
                    </Card>
                </div>
                {/* Graphs Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
                    {/* Bar Chart Card (3/4 width) */}
                    <div className="md:col-span-3 rounded-3xl shadow-lg bg-[#f5f7ff] p-8 flex flex-col justify-between min-h-[500px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <div className="text-2xl font-semibold mb-6 text-[#757FF6]">Monthly Platform Growth & Activity</div>
                        <div style={{ width: '100%', height: 350 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="users" fill="#757FF6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-end mt-6">
                            <span className="text-sm text-gray-500">New users per month (static)</span>
                        </div>
                    </div>
                    {/* Pie Chart Card (1/4 width) */}
                    <div className="md:col-span-1 rounded-3xl shadow-lg bg-[#f7f5ff] p-8 flex flex-col items-center justify-between min-h-[500px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <div className="text-2xl font-semibold mb-6 text-[#757FF6] text-center">Current Pet Adoption Status</div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={60}
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="text-sm text-gray-500 text-center mt-6">75% Adopted, 25% Available</div>
                    </div>
                </div>
            </div>
        </SuperadminLayout>
    );
}
