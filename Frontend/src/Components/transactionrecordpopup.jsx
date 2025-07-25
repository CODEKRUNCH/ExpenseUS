import React,{useEffect,useState} from "react";
import { MdMoreHoriz } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { TransactionRetrieve } from "../api/transactionsretrieve";
const TransactionsRecordPopup=()=>{
  
    const [transactions, setTransactions] = useState([]); // state for transactions
    
    const navigate=useNavigate();
   useEffect(()=>{
        const handleTransactionsRetrieve = async () => {
        try {
            const user = await TransactionRetrieve();
            console.log("Retrieval successful", user);
            setTransactions(user);
        } catch (error) {
            console.error("Retrieval failed", error);
        }
        };
        handleTransactionsRetrieve();
      },[])

    
        return (
    
      <div className="bg-[#0B1739] rounded-lg p-4">
           <div className="flex justify-between items-center text-xl p-2 pl-0 border-b-1 border-gray-500">
            <h2 className="text-gray-400  font-medium ">Recent Transactions</h2>
            <button onClick={() => navigate("/transactions")} 
             className="border rounded-xl p-2 cursor-pointer border-indigo-500 text-indigo-300 hover:bg-indigo-900/30 shadow-[0_4px_12px_rgba(163,58,255,0.25)] hover:shadow-[0_6px_15px_rgba(163,58,255,0.3)]">See all</button>
          </div>
        <table className="min-w-full ">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-sm">
              
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Payed To</th>
              
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-800">
                {/* Extract date part only */}
                <td className="px-4 py-3">
                  {transaction.DateandTimePayed?.split("T")[0]}
                </td>
                <td className="px-4 py-3">{transaction.Amount}</td>
                <td className="px-4 py-3">{transaction.Payedto}</td>
              
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
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    
        )
}
export default TransactionsRecordPopup;