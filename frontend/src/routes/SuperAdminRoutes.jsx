import React from 'react';
import { Navigate } from 'react-router-dom';
import SuperadminLayout from '../pages/superadmin/layout/SuperadminLayout';
import SuperadminDashboard from '../pages/superadmin/pages/SuperadminDashboard';
import UserManagement from '../pages/superadmin/pages/UserManagement';
import PetCenterMgmt from '../pages/superadmin/pages/PetCenterMgmt';
import PetMgmt from '../pages/superadmin/pages/PetMgmt';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('superadminToken');
    if (!isAuthenticated) {
        return <Navigate to="/superadmin/login" replace />;
    }
    return children;
};

const superadminRoutes = [
    {
        path: '/superadmin',
        element: <Navigate to="/superadmin/dashboard" replace />,
    },
    {
        path: '/superadmin/dashboard',
        element: (
            <ProtectedRoute>
                <SuperadminLayout>
                    <SuperadminDashboard />
                </SuperadminLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/superadmin/users',
        element: (
            <ProtectedRoute>
                <SuperadminLayout>
                    <UserManagement />
                </SuperadminLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/superadmin/pet-centers',
        element: (
            <ProtectedRoute>
                <SuperadminLayout>
                    <PetCenterMgmt />
                </SuperadminLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/superadmin/pets',
        element: (
            <ProtectedRoute>
                <SuperadminLayout>
                    <PetMgmt />
                </SuperadminLayout>
            </ProtectedRoute>
        ),
    },
];

export default superadminRoutes;