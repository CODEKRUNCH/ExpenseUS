import React, { useContext } from "react";
import { expensecategoryContext } from "./PieChartExpenses";

// Same colors used in the Pie chart
const COLORS = ['#0088FE', '#00C49F', '#A33AFF', '#FFBB28', '#FF8042', '#8884d8'];

const ExpensesByCategory = () => {
  const { data } = useContext(expensecategoryContext);

  return (
    <div className="p-6 mt-6 rounded-xl bg-[#0B1739] shadow-lg text-white w-full">
    
      <table className="w-full">
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className={`transition-all hover:bg-[#1f2e5a] ${
                  index % 2 === 0 ? "bg-[#121c3d]" : "bg-[#0f1a38]"
                }`}
              >
                <td className="py-3 px-4 text-md font-medium flex items-center gap-3">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  {item.name}
                </td>
                <td className="py-3 px-4 text-right text-indigo-300 font-bold text-md">
                  ${item.value.toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-4 px-4 text-center text-gray-400">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesByCategory;
