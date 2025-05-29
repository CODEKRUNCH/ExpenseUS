import React, { PureComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sideBar';
import { AiOutlineMenu, AiOutlineDownload } from 'react-icons/ai'; // Import download icon
import DashboardUpperMetrics from '../components/DashboardMetric';
import Example from '../components/Graph';

const ProfitPathHome = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set initial state to true

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex text-white bg-[#080F25] min-h-screen'>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

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
              alignItems: 'center',
            padding: '15px',
            backgroundColor: '#080F25',
          }}
        >
          {/* Welcome Text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Welcome back, Bablu Boxer</h2>
            <p style={{ fontSize: '14px', color: '#CBD5E0' }}>Measure your Expenses and Track Your Finances.</p>
          </div>

          {/* Right Side Buttons */}
          <div>
          <div className='flex'>
            <button
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #4A5568',
                color: '#CBD5E0',
                padding: '10px 15px',
                borderRadius: '6px',
                marginRight: '16px',
                marginLeft: '580px',
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
        </div>

          {/* Your Existing Content */}
        
        
        <div className=" h-screen p-2 w-full flex text-white bg-[#080F25] justify-center gap-3">
     <div className="grid h-110 w-280 grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 grid-rows-4 gap-4">


                        <DashboardUpperMetrics
          innerheader="Current Balance"
          cashval="50.8K"
          grosspercent="28.4"
                              />
                        <DashboardUpperMetrics
          innerheader="Monthly Spending"
          cashval="100.8K"
          grosspercent="30.4"
                        />
                        <DashboardUpperMetrics
          innerheader="Budget Utilization"
          cashval="50%"
                      />
                        
              
                        <DashboardUpperMetrics
          innerheader="Savings"
          cashval="40.8K"
          grosspercent="-30.4"
                />
      
       <div >
         <div>
          <div className='flex pb-2 flex-row gap-4'>
          <button className='px-2 py-1 bg-[#0B1739] radius rounded-sm whitespace-nowrap'>Last 12 months</button>
          <button className='px-2 py-1 bg-[#0B1739] radius rounded-sm whitespace-nowrap'>Compare to</button>

          </div>
          
          <div style={{ 
              width: '100%', 
              height: '400px',
              minWidth: '600px'  // Add minimum width
            }} >    
          <Example /> 
          <div>hello</div>
            </div>
              </div>
                </div>

            </div>
        </div>

    
    </div>
    </div>
  );
};

export default ProfitPathHome;