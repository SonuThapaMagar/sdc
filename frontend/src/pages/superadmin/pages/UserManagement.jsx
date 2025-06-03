import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserManagement = () => {
    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">User Management</h1>
            
            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Add your user management content here */}
                        <p className="text-gray-600">User management content will be added here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagement;
