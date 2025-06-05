import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuOutlined, DashboardOutlined, UserOutlined, ShopOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlined />,
        path: '/superadmin/dashboard'
    },
    {
        key: 'users',
        label: 'User Management',
        icon: <UserOutlined />,
        path: '/superadmin/users'
    },
    {
        key: 'centers',
        label: 'Pet Center Management',
        icon: <ShopOutlined />,
        path: '/superadmin/centers'
    },
    {
        key: 'pets',
        label: 'Pet Management',
        icon: <AppstoreOutlined />,
        path: '/superadmin/pets'
    }
];

const SuperadminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic here
        navigate('/superadmin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden"
                >
                    <MenuOutlined className="text-xl" />
                </Button>
                <h1 className="text-xl font-semibold text-gray-800">SDC Furever</h1>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
                "lg:translate-x-0",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
                collapsed ? "w-20" : "w-64"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                        {!collapsed && <h1 className="text-xl font-semibold text-gray-800">SDC Furever</h1>}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:flex"
                        >
                            <MenuOutlined className="text-xl" />
                        </Button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-2">
                            {menuItems.map((item) => (
                                <li key={item.key}>
                                    <Link
                                        to={item.path}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                            "hover:bg-gray-100",
                                            location.pathname === item.path
                                                ? "bg-[#f0f4ff] text-[#757FF6]"
                                                : "text-gray-600"
                                        )}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        {!collapsed && <span>{item.label}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full flex items-center gap-3 text-gray-600 hover:text-red-600",
                                collapsed ? "justify-center" : "justify-start"
                            )}
                            onClick={handleLogout}
                        >
                            <LogoutOutlined className="text-xl" />
                            {!collapsed && <span>Logout</span>}
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "min-h-screen transition-all duration-300",
                "lg:ml-64",
                collapsed ? "lg:ml-20" : "lg:ml-64",
                "pt-16 lg:pt-0" // Add top padding for mobile header
            )}>
                {children}
            </main>
        </div>
    );
};

export default SuperadminLayout;