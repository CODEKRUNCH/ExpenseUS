import React, { useEffect, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { BudgetDelete } from "../api/budgetdelete";

const Budgetlist = ({ budgets }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

          // ✅ Move this function outside of useEffect
        const handleBudgetDelete = async (id) => {
          try {
            await BudgetDelete(id);
            console.log("Budget deleted:", id);
            // Optional: trigger a UI update or refresh the list
          } catch (error) {
            console.error("Deletion failed", error);
          }
        };
  return (
    <div>
      <p className="text-sm mb-4">
        {budgets.length} budget{budgets.length !== 1 ? "s" : ""}
      </p>

      {budgets.map((budget) => {
        // Parse 'amount' as the budget limit (since it's provided as a string)
        const budgetLimit = parseFloat(budget.amount);
        // Parse 'total_spent' for calculations
        const totalSpent = parseFloat(budget.total_spent);
        // Compute the percentage used; cap at 100%
        const percentUsed =
          budgetLimit > 0 ? Math.min(totalSpent / budgetLimit, 1) : 0;

        return (
          <div key={budget.id} className="bg-[#1A202C] p-4 rounded-lg mb-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">
                {budget.name} ({budget.period})
              </h3>
              <button
                onClick={() => toggleMenu(budget.id)}
                className="relative text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition"
              >
                <MdMoreHoriz />
                {/* Dropdown menu */}
                {openMenuId === budget.id && (
                  <div className="absolute right-0 mt-2 w-20 bg-gray-800 border border-gray-600 rounded shadow-lg z-10">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        Details
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer"  onClick={()=>handleBudgetDelete(budget.id)}>
                        Delete
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        Edit
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>

            {/* Display wallet balance from wallet object */}
            <p className="text-sm text-gray-400 mb-4">
              Wallet Balance:{" "}
              {budget.wallet && budget.wallet.balance
                ? `$${parseFloat(budget.wallet.balance).toFixed(2)}`
                : "N/A"}
            </p>

            <div className="flex items-center">
              <div className="relative w-24 h-24">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
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
                  <span className="text-sm">${totalSpent.toFixed(2)}</span>
                </div>
              </div>

              <div className="ml-4 flex-grow">
                <p className="text-sm text-gray-400">Left</p>
                <p
                  className={`text-xl font-bold ${
                    totalSpent > budgetLimit ? "text-red-500" : "text-white"
                  }`}
                >
                  {(budgetLimit - totalSpent).toFixed(2)} /{" "}
                  {budgetLimit.toFixed(2)}
                </p>
                {totalSpent > budgetLimit && (
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
  );
};

export default Budgetlist;
