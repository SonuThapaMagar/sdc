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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Pencil, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

// Mock data - replace with actual API data
const mockPets = [
    {
        id: "1",
        name: "Buddy",
        breed: "Golden Retriever",
        age: 2,
        gender: "Male",
        description: "Friendly and playful",
        location: "New York",
        status: "AVAILABLE",
        centerId: "center1"
    },
    // Add more mock data as needed
];

const petStats = [
    { month: "Jan", pets: 45 },
    { month: "Feb", pets: 60 },
    { month: "Mar", pets: 35 },
    { month: "Apr", pets: 75 },
    { month: "May", pets: 55 },
    { month: "Jun", pets: 40 },
];

const statusData = [
    { name: "Available", value: 65, color: "#757FF6" },
    { name: "Adopted", value: 35, color: "#4bb543" },
];

const PetMgmt = () => {
    const [pets, setPets] = useState(mockPets);

    const handleEdit = (petId) => {
        // Implement edit functionality
        console.log('Edit pet:', petId);
    };

    const handleDelete = (petId) => {
        // Implement delete functionality
        console.log('Delete pet:', petId);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(pets);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pets");
        XLSX.writeFile(workbook, "pets.xlsx");
    };

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Pet Management</h1>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Bar Chart */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-gray-800">Pet Statistics</CardTitle>
                        <Button onClick={exportToExcel} className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export to Excel
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={petStats}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="pets" fill="#757FF6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">Adoption Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
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

            {/* Table Section */}
            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">All Pets</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Breed</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pets.map((pet) => (
                                <TableRow key={pet.id}>
                                    <TableCell>{pet.name}</TableCell>
                                    <TableCell>{pet.breed}</TableCell>
                                    <TableCell>{pet.age}</TableCell>
                                    <TableCell>{pet.gender}</TableCell>
                                    <TableCell>{pet.location}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            pet.status === 'AVAILABLE' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {pet.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(pet.id)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(pet.id)}
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

export default PetMgmt;
