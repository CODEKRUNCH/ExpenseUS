import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/sideBar';
import { AiOutlineMenu, AiOutlineDownload } from 'react-icons/ai'; // Import download icon

const ProfitPathHome = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set initial state to true

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#080F25', color: 'white' }}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: isSidebarOpen ? '200px' : '0', // Shift content when sidebar is open
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#080F25',
          }}
        >
          {/* Welcome Text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Welcome back, John</h2>
            <p style={{ fontSize: '14px', color: '#CBD5E0' }}>Measure your advertising ROI and report website traffic.</p>
          </div>

          {/* Right Side Buttons */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #4A5568',
                color: '#CBD5E0',
                padding: '10px 15px',
                borderRadius: '6px',
                marginRight: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              Export data <AiOutlineDownload style={{ marginLeft: '5px' }} />
            </button>
            <button
              style={{
                backgroundColor: '#A33AFF',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Create report
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px' }}>
          {/* Menu Button - Keep it for potential collapsing if needed */}
          <button
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <AiOutlineMenu />
          </button>

          {/* Your Existing Content */}
          <div className="text-6xl flex justify-center items-center text-white p-14"></div>
          <div className="h-screen w-full flex justify-center items-center text-white">
            <div className="grid h-auto w-auto grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 grid-rows-4 gap-4">
              <div className="col-span-5 row-span-2 bg-[#101935] text-white rounded-xl flex justify-center items-center">
                taudi
              </div>
              <div className="col-span-2 row-span-2 bg-[#101935] text-white rounded-xl flex justify-center items-center">
                pan
              </div>
              <div className="col-span-1 row-span-2 bg-[#101935] text-white rounded-xl flex justify-center items-center">
                dee
              </div>
              <div className="col-span-full row-span-3 bg-[#101935] text-white rounded-xl flex justify-center items-center">
                siri
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitPathHome;