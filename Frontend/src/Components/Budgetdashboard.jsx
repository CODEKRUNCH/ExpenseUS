import { useState, useMemo } from "react";
import MeterChart from "./meterchart";

const Budgetdashboard = () => {
  return (
    <div className="bg-[#0B1739] flex flex-col justify-between rounded-lg p-4 w-full h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-gray-300 text-sm font-medium">Monthly Budget Overview</h2>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-white">$125.2k</p>
            
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <MeterChart />
      </div>
    </div>
  );
};

export default Budgetdashboard;
