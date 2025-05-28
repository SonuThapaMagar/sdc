import React from 'react';
import { Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SuperadminLayout from '../layout/SuperadminLayout';

const SuperadminSettings = () => (
  <SuperadminLayout>
    <div className="min-h-screen px-4 md:px-6 lg:px-12 bg-white">
      {/* Profile Card */}
      <div className="max-w-5xl mx-auto my-16 md:my-24">
        <Card type="inner" title="Settings" style={{fontSize:'2rem',fontWeight:'bold',fontFamily:'Poppins, sans-serif'}}>
          <Card
            className="rounded-3xl shadow-lg"
            style={{ background: '#E4E6FB', padding: '2rem', margin: '2rem' }}
          >
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center md:items-start min-w-[120px]">
                  <span className="font-bold text-lg mb-8 md:mb-6 text-black text-left w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Profile
                  </span>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#757FF6] flex items-center justify-center mb-2">
                    <UserOutlined className="text-white text-2xl md:text-3xl mt-4 color-white" />
                  </div>
                  <Button
                    className="bg-[#6BC9BB] hover:bg-[#5bc9b9] text-black font-medium mt-6 md:mt-8"
                    style={{
                      borderRadius: '4px',
                      border: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      padding: '0 28px',
                      height: '36px',
                      backgroundColor: '#6BC9BB',
                      color: 'white',
                      marginTop: '20px',
                      marginLeft: '8px',
                    }}
                  >
                    Edit
                  </Button>
                </div>
                {/* Profile Details */}
                <div className="flex-1 flex flex-col justify-center w-full md:pl-4 md:ml-12">
                  <input
                    type="text"
                    value="  superadmin"
                    readOnly
                    className="w-1/2 h-12 p-4 bg-white border border-gray-200 rounded-lg focus:outline-none text-lg mb-8 shadow-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                  <Button
                    className="text-white font-medium mb-2 mt-8 w-1/4"
                    style={{
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#4747A1',
                      fontFamily: 'Poppins, sans-serif',
                      height: '44px',
                      padding: '0 36px',
                      color: 'white',
                      marginTop: '20px',
                      // width:'50%',
                    }}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  </SuperadminLayout>
);

export default SuperadminSettings;