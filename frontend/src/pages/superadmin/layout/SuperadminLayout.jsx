import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    TeamOutlined,
    PieChartOutlined,
    LogoutOutlined,
    ShopOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        key: 'dashboard',
        icon: <PieChartOutlined />,
        label: 'Dashboard',
        path: '/superadmin/dashboard'
    },
    {
        key: 'users',
        icon: <TeamOutlined />,
        label: 'User Management',
        path: '/superadmin/users'
    },
    {
        key: 'petcenter',
        icon: <ShopOutlined />,
        label: 'Pet Center Management',
        path: '/superadmin/pet-centers'
    },
    {
        key: 'pets',
        icon: <AppstoreOutlined />,
        label: 'Pet Management',
        path: '/superadmin/pets'
    },
    {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        path: '/logout'
    },
];

const SuperadminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(() => {
        const currentPath = location.pathname;
        const menuItem = menuItems.find(item => item.path === currentPath);
        return menuItem ? menuItem.key : 'dashboard';
    });

    const handleMenuClick = (item) => {
        setActiveMenu(item.key);
        if (item.key === 'logout') {
            // Handle logout logic here
            localStorage.removeItem('superadminToken');
            navigate('/superadmin/login');
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className="h-screen bg-[#f2f2f2] overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7d8ff5] flex items-center justify-center">
                        <UserOutlined className="text-white text-xl" />
                    </div>
                    <span className="text-lg font-semibold text-[#757FF6]">Superadmin</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden"
                >
                    {isMobileMenuOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                </Button>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "lg:hidden fixed inset-0 z-40 bg-[#f8fafc] transform transition-transform duration-300 ease-in-out",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-[#7d8ff5] flex items-center justify-center mb-4">
                            <UserOutlined className="text-white text-2xl" />
                        </div>
                        <span className="text-xl font-semibold text-[#757FF6]">Superadmin</span>
                    </div>
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => handleMenuClick(item)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg transition-colors",
                                    activeMenu === item.key 
                                        ? "bg-[#e6e8fa] text-[#757FF6] font-medium" 
                                        : "hover:bg-gray-100"
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex h-screen">
                {/* Sidebar */}
                <aside className={cn(
                    "fixed left-0 top-0 z-30 h-screen bg-[#f8fafc] border-r border-gray-100 transition-all duration-300",
                    collapsed ? "w-[80px]" : "w-[280px]"
                )}>
                    <div className="flex flex-col h-full">
                        <div className="flex flex-col items-center p-6">
                            <div className="w-12 h-12 rounded-full bg-[#7d8ff5] flex items-center justify-center mb-4">
                                <UserOutlined className="text-white text-xl" />
                            </div>
                            {!collapsed && (
                                <span className="text-lg font-semibold text-[#757FF6]">Superadmin</span>
                            )}
                        </div>
                        <nav className="flex-1 px-4 space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => handleMenuClick(item)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg transition-colors",
                                        activeMenu === item.key 
                                            ? "bg-[#e6e8fa] text-[#757FF6] font-medium" 
                                            : "hover:bg-gray-100",
                                        collapsed ? "justify-center" : "justify-start"
                                    )}
                                >
                                    {item.icon}
                                    {!collapsed && <span>{item.label}</span>}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={cn(
                    "flex-1 transition-all duration-300 h-screen overflow-y-auto",
                    collapsed ? "ml-[80px]" : "ml-[280px]"
                )}>
                    <div className="p-6">
                        <div className="mb-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setCollapsed(!collapsed)}
                                className="hidden lg:flex"
                            >
                                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </Button>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SuperadminLayout;