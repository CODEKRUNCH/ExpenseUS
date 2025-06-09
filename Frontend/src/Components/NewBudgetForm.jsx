import React, { useState } from 'react'
import{CreateBudget} from '../api/budgetcreate'
const BudgetForm = ({ onClose }) =>{
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState(0);
    const [budgetCategory, setBudgetCategory] = useState('Food & Drinks'); // Default from image
    const [budgetWallet, setBudgetWallet] = useState('For wallet'); // Default from image
    const [budgetPeriod, setBudgetPeriod] = useState('Month'); // Default from image
    const categories = ['Total','Food & Drinks', 'Transportation', 'Utilities', 'Rent', 'Entertainment', 'Shopping'];
    const wallets = ['For wallet', 'Main Account', 'Credit Card', 'Savings'];
    const periods = ['Month', 'Year', 'Week'];

const handleSubmit = async(e) => {
    
        e.preventDefault();
        // The data collected from the form inputs
        try{
            const BudgetData=await CreateBudget(budgetName,
                budgetAmount,
                budgetCategory,
                budgetPeriod
            )
            console.log("Budget Success",BudgetData)
        }
        catch(error)
        {
            console.error("Budget Creation failed", error);
        }
    
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-[#1A202C] p-8 rounded-lg shadow-xl max-w-md w-full text-white">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Creating a New Budget</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
                        &times;
                    </button>
                </div>
                <p className="text-sm text-gray-400 mb-6">Please fill in the form below</p>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-2 bg-[#2D3748] border border-gray-600 rounded-md focus:ring-[#A33AFF] focus:border-[#A33AFF]"
                                placeholder="Name your budget."
                                value={budgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                className="w-full p-2 bg-[#2D3748] border border-gray-600 rounded-md focus:ring-[#A33AFF] focus:border-[#A33AFF]"
                                value={budgetAmount}
                                onChange={(e) => setBudgetAmount(parseFloat(e.target.value))}
                                min="0"
                                required
                            />
                        </div>
                        <div className="col-span-2 text-gray-400 text-xs flex justify-between">
                            <span>Name your budget.</span>
                            <span>Budget amount.</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                            <select
                                id="category"
                                className="w-full p-2 bg-[#2D3748] border border-gray-600 rounded-md focus:ring-[#A33AFF] focus:border-[#A33AFF]"
                                value={budgetCategory}
                                onChange={(e) => setBudgetCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="wallet" className="block text-sm font-medium text-gray-300 mb-1">Wallet</label>
                            <select
                                id="wallet"
                                className="w-full p-2 bg-[#2D3748] border border-gray-600 rounded-md focus:ring-[#A33AFF] focus:border-[#A33AFF]"
                                value={budgetWallet}
                                onChange={(e) => setBudgetWallet(e.target.value)}
                            >
                                {wallets.map(wallet => (
                                    <option key={wallet} value={wallet}>{wallet}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-2 text-gray-400 text-xs flex justify-between">
                            <span>Budget category.</span>
                            <span>Choose wallet.</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="period" className="block text-sm font-medium text-gray-300 mb-1">Period</label>
                        <select
                            id="period"
                            className="w-full p-2 bg-[#2D3748] border border-gray-600 rounded-md focus:ring-[#A33AFF] focus:border-[#A33AFF]"
                            value={budgetPeriod}
                            onChange={(e) => setBudgetPeriod(e.target.value)}
                        >
                            {periods.map(period => (
                                <option key={period} value={period}>{period}</option>
                            ))}
                        </select>
                        <p className="text-gray-400 text-xs mt-2">Budget period.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#A33AFF] text-white px-4 py-2 rounded-md font-bold hover:bg-purple-700 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};
export default BudgetForm