import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import SuperadminLayout from '../layout/SuperadminLayout';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const SuperadminSettings = () => (
  <SuperadminLayout>
    <div className="h-[calc(100vh-80px)] px-4 md:px-6 lg:px-12 bg-gray-100">
      <div className="max-w-5xl mx-auto my-8">
        <Card className="border-none shadow-lg bg-[#fff]">
          <CardHeader >
            <CardTitle className="text-3xl font-bold text-gray-800">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#E4E6FB] rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center md:items-start min-w-[120px]">
                  <Label className="text-lg font-semibold mb-6 text-gray-800">Profile</Label>
                  <div className="w-24 h-24 rounded-full bg-[#757FF6] flex items-center justify-center mb-4">
                    <UserOutlined className="text-white text-3xl" />
                  </div>
                  <button
                    className="bg-[#6BC9BB] hover:bg-[#5bc9b9] text-white font-medium px-7 py-2 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                </div>

                {/* Profile Details */}
                <div className="flex-1 flex flex-col justify-center w-full md:pl-4 md:ml-12">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Username</Label>
                      <Input
                        value="superadmin"
                        readOnly
                        className="w-full md:w-1/2 bg-white"
                      />
                    </div>
                    <button
                      className="bg-[#4747A1] hover:bg-[#3a3a8a] text-white font-medium px-9 py-2.5 rounded-md transition-colors w-full md:w-1/2"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </SuperadminLayout>
);

export default SuperadminSettings;