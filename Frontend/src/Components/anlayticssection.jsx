import React from 'react';

const AnalyticsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
      
      {/* Time Period Selector */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-gray-700">Last 30 days</h2>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Compare to: Mar 5–Apr 3, 2025
          </button>
          <span className="text-gray-400">|</span>
          <button className="text-sm text-gray-600 hover:text-gray-800">
            Export
          </button>
        </div>
      </div>
      
      {/* Time Range Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 
          'Last 90 days', 'Last 365 days', 'Last month', 
          'Last 12 months', 'Last year'].map((item) => (
          <button 
            key={item}
            className={`px-4 py-2 text-sm rounded-md ${
              item === 'Last 12 months' 
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      
      {/* Divider */}
      <hr className="my-6 border-gray-200" />
      
      {/* Month View */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">April 2025</h3>
          <span className="text-sm text-gray-500">PKR 0.00 <span className="text-green-500">↑100%</span></span>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center mb-4">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <div key={day} className="text-xs text-gray-500 py-1">{day}</div>
          ))}
          
          {/* Calendar Dates - Simplified */}
          {Array.from({ length: 30 }, (_, i) => i + 1).map(date => (
            <div 
              key={date} 
              className={`p-2 text-sm ${
                date === 14 ? 'bg-blue-100 text-blue-700 rounded-full' : 'hover:bg-gray-100'
              }`}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
      
      {/* Comparison Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Apr 14, 2025</span>
          <span className="text-sm">PKR 0.00 <span className="text-green-500">*100%</span></span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Mar 15, 2025</span>
          <span className="text-sm text-gray-700">PKR 1,461.60</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;