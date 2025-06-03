import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Pencil, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

// Mock data - replace with actual API data
const mockCenters = [
    {
        id: "1",
        name: "Happy Paws Center",
        address: "123 Pet Street, New York",
        contact: "+1234567890",
        description: "A loving home for pets",
        email: "happy@paws.com"
    },
    // Add more mock data as needed
];

const centerStats = [
    { month: "Jan", centers: 5 },
    { month: "Feb", centers: 7 },
    { month: "Mar", centers: 4 },
    { month: "Apr", centers: 8 },
    { month: "May", centers: 6 },
    { month: "Jun", centers: 9 },
];

const PetCenterMgmt = () => {
    const [centers, setCenters] = useState(mockCenters);

    const handleEdit = (centerId) => {
        // Implement edit functionality
        console.log('Edit center:', centerId);
    };

    const handleDelete = (centerId) => {
        // Implement delete functionality
        console.log('Delete center:', centerId);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(centers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pet Centers");
        XLSX.writeFile(workbook, "pet-centers.xlsx");
    };

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Pet Center Management</h1>
            
            {/* Chart Section */}
            <Card className="bg-white border border-gray-100 shadow-sm mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-800">Center Statistics</CardTitle>
                    <Button onClick={exportToExcel} className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export to Excel
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={centerStats}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="centers" fill="#757FF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Table Section */}
            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">All Pet Centers</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {centers.map((center) => (
                                <TableRow key={center.id}>
                                    <TableCell>{center.name}</TableCell>
                                    <TableCell>{center.address}</TableCell>
                                    <TableCell>{center.contact}</TableCell>
                                    <TableCell>{center.email}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        {center.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(center.id)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(center.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default PetCenterMgmt;
