import React,{useEffect,useState} from "react";
import { MdMoreHoriz } from 'react-icons/md';
const TransactionsTable=({
  transactions
})=>{
 {/* Transactions Table */}
 const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

    
        return (
    <div className="p-4 flex-grow">
      <div className="bg-[#0B1739] rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-sm">
              <th className="px-4 py-2 text-left w-10">
                <input
                  type="checkbox"
                  className="form-checkbox bg-gray-800 border-gray-600 rounded"
                />
              </th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Payed To</th>
              <th className="px-4 py-2 text-left">Payment type</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-800">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="form-checkbox bg-gray-800 border-gray-600 rounded"
                  />
                </td>
                {/* Extract date part only */}
                <td className="px-4 py-3">
                  {transaction.DateandTimePayed?.split("T")[0]}
                </td>
                <td className="px-4 py-3">{transaction.Amount}</td>
                <td className="px-4 py-3">{transaction.Payedto}</td>
                <td className="px-4 py-3">{transaction.PaymentType}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    transaction.TransactionType === "Expense"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {transaction.TransactionType}
                </td>
                <td className="px-4 py-3">{transaction.Category}</td>
                <td className="px-4 py-3 text-right relative">
                  {/* Three dots button */}
                  <button
                    className="text-gray-400 hover:text-white cursor-pointer"
                    onClick={() => toggleMenu(transaction.id)}
                  >
                     <MdMoreHoriz size={20} /> {/* Unicode for vertical ellipsis */}
                  </button>

                  {/* Dropdown menu */}
                  {openMenuId === transaction.id && (
                    <div className="absolute  right-0 mt-2 w-20 bg-gray-800 border border-gray-600 rounded shadow-lg z-10">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                          Details
                        </li>

                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                          Delete
                        </li>

                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                          Edit
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination/Selection Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <span>0 of {transactions.length} row(s) selected.</span>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-gray-800 rounded-md border border-gray-600">
              &lt;
            </button>
            <span>1 of 1</span>
            <button className="px-2 py-1 bg-gray-800 rounded-md border border-gray-600">
              &gt;
            </button>
            <select className="px-2 py-1 bg-gray-800 rounded-md border border-gray-600 focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
        )
}
export default TransactionsTable;