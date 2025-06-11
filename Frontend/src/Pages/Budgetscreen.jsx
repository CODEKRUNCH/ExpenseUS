import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sideBar';
import BudgetForm from '../Components/NewBudgetForm';
import Budgetlist from '../Components/BudgetBox';
import { BudgetRetrieve } from '../api/budgetretrieve';

const BudgetScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets when the component mounts
  useEffect(() => {
    const handleBudgetRetrieve = async () => {
      try {
        const data = await BudgetRetrieve();
        console.log("Retrieval successful", data);
        setBudgets(data);
      } catch (error) {
        console.error("Retrieval failed", error);
      }
    };
    handleBudgetRetrieve();
  }, []); // runs once on mount

  // Add a new budget to the list
  const handleAddBudget = (newBudget) => {
    setBudgets((prevBudgets) => [
      ...prevBudgets,
      { ...newBudget, id: Date.now() } // generate unique id using Date.now()
    ]);
  };

  // Calculate overall budget totals
  const totalBudget = budgets.reduce((acc, budget) => acc + parseFloat(budget.amount), 0);
  const totalSpentOverall = budgets.reduce((acc, budget) => acc + parseFloat(budget.total_spent), 0);
  const remainingOverall = totalBudget - totalSpentOverall;
  const percentageLeftOverall = totalBudget > 0 ? (remainingOverall / totalBudget) * 100 : 0;

  return (
    <div className="flex bg-[#080F25] min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-[200px]' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Budget</h2>
            <p className="text-sm text-gray-400">Create and track your budgets</p>
          </div>
          <button
            className="mt-4 md:mt-0 bg-[#A33AFF] text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700"
            onClick={() => setShowModal(true)} // Open modal on button click
          >
            Add new Budget
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget List */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button className="px-3 py-1 bg-[#2D3748] rounded-md text-sm">All</button>
              <button className="px-3 py-1 bg-[#2D3748] rounded-md text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Filter
              </button>
              <button className="px-3 py-1 bg-[#2D3748] rounded-md text-sm">Reset</button>
            </div>
            <Budgetlist budgets={budgets} />
          </div>

          {/* Overall Summary */}
            {/* Overall Summary */}
        <div className="sticky top-24 self-start bg-[#1A202C] p-6 rounded-lg shadow-lg max-h-[calc(100vh-6rem)] overflow-auto">

            <h3 className="text-lg font-bold mb-4">Total budget</h3>
            <p className="text-2xl font-bold mb-4">${totalBudget.toFixed(2)}</p>
            {totalSpentOverall > totalBudget && (
            <div className="flex items-center text-red-500 text-sm mb-4">
                ⚠️ exceeding
            </div>
            )}
            <div className="relative w-48 h-48 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                className="text-gray-700"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                />
                <circle
                className="text-[#A33AFF]"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - Math.min(totalSpentOverall / totalBudget, 1))}
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-bold text-sm">
                <span className="text-gray-300">Total spent</span>
                <span className="text-lg">${totalSpentOverall.toFixed(2)}</span>
            </div>
            </div>
            <p className="text-center text-sm text-gray-400">
            Remaining: ${remainingOverall.toFixed(2)} ({percentageLeftOverall.toFixed(2)}%)
            </p>
        </div>
        </div>
      </div>

      {/* Render the modal conditionally */}
      {showModal && <BudgetForm onClose={() => setShowModal(false)} onSave={handleAddBudget} />}
    </div>
  );
};

export default BudgetScreen;
