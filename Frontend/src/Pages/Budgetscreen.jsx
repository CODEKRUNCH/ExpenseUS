import React, { useState } from 'react';
import Sidebar from '../components/sideBar';
import BudgetForm from '../Components/NewBudgetForm';
// Modal Component


const BudgetScreen = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const [budgets, setBudgets] = useState([
        {
            id: 1,
            name: 'Testing',
            period: 'Year',
            wallet: 'testinggg',
            totalSpent: 5615.0,
            budgetLimit: 5000.0,
        },
        {
            id: 2,
            name: 'Groceries',
            period: 'Month',
            wallet: 'Main Account',
            totalSpent: 300.0,
            budgetLimit: 400.0,
        },
        {
            id: 3,
            name: 'Entertainment',
            period: 'Month',
            wallet: 'Credit Card',
            totalSpent: 250.0,
            budgetLimit: 200.0,
        },
    ]);

    const handleAddBudget = (newBudget) => {
        // Add a unique ID to the new budget (using Date.now() for simplicity)
        setBudgets(prevBudgets => [...prevBudgets, { ...newBudget, id: Date.now() }]);
    };


    const totalBudget = budgets.reduce((acc, budget) => acc + budget.budgetLimit, 0); // Calculate total from all budgets
    const totalSpentOverall = budgets.reduce((acc, budget) => acc + budget.totalSpent, 0); // Calculate total spent from all budgets
    const remainingOverall = totalBudget - totalSpentOverall;
    const percentageLeftOverall = totalBudget > 0 ? (remainingOverall / totalBudget) * 100 : 0; // Avoid division by zero


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
                        <p className="text-sm mb-4">{budgets.length} budget{budgets.length !== 1 ? 's' : ''}</p>

                        {budgets.map((budget) => {
                            const percentUsed = budget.budgetLimit > 0 ? Math.min(budget.totalSpent / budget.budgetLimit, 1) : 0; // Handle division by zero
                            return (
                                <div key={budget.id} className="bg-[#1A202C] p-4 rounded-lg mb-4 shadow-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold">
                                            {budget.name} ({budget.period})
                                        </h3>
                                        <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition">
                                            ✎
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">Wallet: {budget.wallet}</p>

                                    <div className="flex items-center">
                                        <div className="relative w-24 h-24">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                                <circle
                                                    className="text-[#A33AFF]"
                                                    strokeWidth="10"
                                                    strokeDasharray={2 * Math.PI * 40}
                                                    strokeDashoffset={2 * Math.PI * 40 * (1 - percentUsed)}
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="40"
                                                    cx="50"
                                                    cy="50"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-bold">
                                                <span className="text-gray-300">Total spent</span>
                                                <span className="text-sm">${budget.totalSpent.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="ml-4 flex-grow">
                                            <p className="text-sm text-gray-400">Left</p>
                                            <p className={`text-xl font-bold ${budget.totalSpent > budget.budgetLimit ? 'text-red-500' : 'text-white'}`}>
                                                {(budget.budgetLimit - budget.totalSpent).toFixed(2)} / {budget.budgetLimit.toFixed(2)}
                                            </p>
                                            {budget.totalSpent > budget.budgetLimit && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                    ⚠️ exceeding
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Overall Summary */}
                    <div className="bg-[#1A202C] p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Total budget</h3>
                        <p className="text-2xl font-bold mb-4">${totalBudget.toFixed(2)}</p>
                        {totalSpentOverall > totalBudget && (
                            <div className="flex items-center text-red-500 text-sm mb-4">
                                ⚠️ exceeding
                            </div>
                        )}
                        <div className="relative w-48 h-48 mx-auto mb-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
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
                        <p className="text-center text-sm text-gray-400">Remaining: ${remainingOverall.toFixed(2)} ({percentageLeftOverall.toFixed(2)}%)</p>
                    </div>
                </div>
            </div>

            {/* Render the modal conditionally */}
            {showModal && <BudgetForm onClose={() => setShowModal(false)} onSave={handleAddBudget} />}
           
        </div>
    );
};

export default BudgetScreen;