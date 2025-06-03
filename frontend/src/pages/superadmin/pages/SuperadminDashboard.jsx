import { UserOutlined, AppstoreOutlined, SolutionOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Total Users Card */}
                <Card className="bg-gradient-to-br from-white to-[#f8faff] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-8 mt-4">
                        <div className="flex items-center gap-6 ">
                            <div className="w-16 h-16 rounded-2xl bg-[#e6e8fa] flex items-center justify-center">
                                <UserOutlined className="text-[#757FF6] text-2xl" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-medium text-gray-600 mb-2">Total Users</CardTitle>
                                <p className="text-3xl font-bold text-gray-800">1,234</p>
                                <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Pets Card */}
                <Card className="bg-gradient-to-br from-white to-[#fff5f5] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-8 mt-4">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-[#ffe7e7] flex items-center justify-center">
                                <AppstoreOutlined className="text-[#ff7f7f] text-2xl" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-medium text-gray-600 mb-2">Total Pets</CardTitle>
                                <p className="text-3xl font-bold text-gray-800">567</p>
                                <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Adoptions Card */}
                <Card className="bg-gradient-to-br from-white to-[#f5fff5] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-8 mt-4">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-[#e7fbe7] flex items-center justify-center">
                                <SolutionOutlined className="text-[#4bb543] text-2xl" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-medium text-gray-600 mb-2">Total Adoptions</CardTitle>
                                <p className="text-3xl font-bold text-gray-800">89</p>
                                <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-10">
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-6 p-6 bg-[#f8fafc] rounded-xl border border-gray-100 hover:bg-[#f0f4ff] transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#e6e8fa] flex items-center justify-center">
                                    <UserOutlined className="text-[#757FF6] text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 text-lg">New user registration</p>
                                    <p className="text-sm text-gray-500">John Doe joined the platform</p>
                                </div>
                                <span className="text-sm text-gray-500 whitespace-nowrap">2 hours ago</span>
                            </div>
                            <div className="flex items-center gap-6 p-6 bg-[#f8fafc] rounded-xl border border-gray-100 hover:bg-[#fff5f5] transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#ffe7e7] flex items-center justify-center">
                                    <AppstoreOutlined className="text-[#ff7f7f] text-xl" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 text-lg">New pet added</p>
                                    <p className="text-sm text-gray-500">Luna the cat is now available</p>
                                </div>
                                <span className="text-sm text-gray-500 whitespace-nowrap">5 hours ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
