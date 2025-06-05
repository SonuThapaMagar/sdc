import { UserOutlined, AppstoreOutlined, SolutionOutlined, ShopOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

// Mock data - replace with actual API data
const monthlyStats = [
    { month: "Jan", users: 120, pets: 45, centers: 5, adoptions: 15 },
    { month: "Feb", users: 180, pets: 60, centers: 7, adoptions: 25 },
    { month: "Mar", users: 90, pets: 35, centers: 4, adoptions: 12 },
    { month: "Apr", users: 200, pets: 75, centers: 8, adoptions: 30 },
    { month: "May", users: 160, pets: 55, centers: 6, adoptions: 22 },
    { month: "Jun", users: 110, pets: 40, centers: 9, adoptions: 18 },
];

const petStatusData = [
    { name: "Available", value: 65, color: "#757FF6" },
    { name: "Adopted", value: 35, color: "#4bb543" },
];

const recentActivities = [
    {
        type: "user",
        icon: <UserOutlined className="text-[#757FF6] text-xl" />,
        bgColor: "bg-[#e6e8fa]",
        title: "New user registration",
        description: "John Doe joined the platform",
        time: "2 hours ago"
    },
    {
        type: "pet",
        icon: <AppstoreOutlined className="text-[#ff7f7f] text-xl" />,
        bgColor: "bg-[#ffe7e7]",
        title: "New pet added",
        description: "Luna the cat is now available",
        time: "5 hours ago"
    },
    {
        type: "center",
        icon: <ShopOutlined className="text-[#4bb543] text-xl" />,
        bgColor: "bg-[#e7fbe7]",
        title: "New pet center registered",
        description: "Happy Paws Center joined the network",
        time: "1 day ago"
    },
    {
        type: "adoption",
        icon: <SolutionOutlined className="text-[#757FF6] text-xl" />,
        bgColor: "bg-[#e6e8fa]",
        title: "New adoption",
        description: "Buddy found a new home",
        time: "3 hours ago"
    }
];

export default function SuperadminDashboard() {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(monthlyStats);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Statistics");
        XLSX.writeFile(workbook, "dashboard-stats.xlsx");
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <Button onClick={exportToExcel} className="flex items-center gap-2 w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    Export Statistics
                </Button>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Total Users Card */}
                <Card className="bg-gradient-to-br from-white to-[#f8faff] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#e6e8fa] flex items-center justify-center">
                                <UserOutlined className="text-[#757FF6] text-xl" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-medium text-gray-600">Total Users</CardTitle>
                                <p className="text-2xl font-bold text-gray-800">1,234</p>
                                <p className="text-sm text-gray-500">+12% from last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Pets Card */}
                <Card className="bg-gradient-to-br from-white to-[#fff5f5] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#ffe7e7] flex items-center justify-center">
                                <AppstoreOutlined className="text-[#ff7f7f] text-xl" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-medium text-gray-600">Total Pets</CardTitle>
                                <p className="text-2xl font-bold text-gray-800">567</p>
                                <p className="text-sm text-gray-500">+8% from last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Centers Card */}
                <Card className="bg-gradient-to-br from-white to-[#f5fff5] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#e7fbe7] flex items-center justify-center">
                                <ShopOutlined className="text-[#4bb543] text-xl" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-medium text-gray-600">Pet Centers</CardTitle>
                                <p className="text-2xl font-bold text-gray-800">39</p>
                                <p className="text-sm text-gray-500">+5% from last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Adoptions Card */}
                <Card className="bg-gradient-to-br from-white to-[#f0f4ff] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#e6e8fa] flex items-center justify-center">
                                <SolutionOutlined className="text-[#757FF6] text-xl" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-medium text-gray-600">Adoptions</CardTitle>
                                <p className="text-2xl font-bold text-gray-800">89</p>
                                <p className="text-sm text-gray-500">+15% from last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Monthly Statistics Chart */}
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

                {/* Pet Status Chart */}
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

            {/* Recent Activity Section */}
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
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 text-lg">{activity.title}</p>
                                    <p className="text-sm text-gray-500">{activity.description}</p>
                                </div>
                                <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
