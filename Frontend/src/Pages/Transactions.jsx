import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sideBar'; // Assuming your sidebar component
import { AiOutlineMenu, AiOutlineDownload } from 'react-icons/ai'; // Unused, but keeping for consistency with your original code
import { LuPlus } from "react-icons/lu"; // Plus icon for "Add new" button
import { IoClose } from "react-icons/io5"; // Close icon for the modal
import { createTransaction } from '../api/transactionstore';
import { TransactionRetrieve } from "../api/transactionsretrieve";
import TransactionsTable from '../Components/transactiontable';
const Transactions = () => {

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
 
  const [amount,setAmount]= useState('');
  const [payer,setPayer]=useState('');
  const [note,setNote]=useState('');

  const [transactionType,setTransactionType]=useState('Income');
  const [category,setCategory]=useState('Select Category');
  const [paymentType,setPaymentType]=useState('Cash');
 
  const [fromWallet,setFromWallet]= useState('Primary');
  const [dateTime,setDateTime]= useState('');

  const [transactions, setTransactions] = useState([]); // state for transactions
  
  const incomeCategories = [
  "Salary",
  "Investments",
  "Freelance",
  "Gifts",
  "Others"
];

const expenseCategories = [
  "Food & Drinks",
  "Shopping",
  "Utilities",
  "Transport",
  "Rent",
  "Entertainment",
  "Others"
];

 const handleTransactionCreate = async(e) =>
 {
  e.preventDefault();
  // Check if any field is empty or not valid
  if (
    !amount || 
    !transactionType || 
    !category || 
    !paymentType || 
    !payer || 
    !fromWallet || 
    !dateTime || 
    !note
  ) {
    alert('Please fill out all fields.');
    return;
  }
  try{
    const transactionData=await createTransaction( Number(amount) ,
    transactionType,
    category ,
    paymentType,  
    payer ,
    fromWallet, 
    dateTime, 
    note)
    console.log("Transaction Success",transactionData)

    setTransactions(prevTransactions => [...prevTransactions, transactionData]);
  //  Optionally reset the form
  //  Reset the form fields to defaults
    setAmount('');
    setTransactionType('Income');
    setCategory('Select Category');  // or any default category for Income
    setPaymentType('Cash');
    setPayer('');
    setFromWallet('Primary');
    setDateTime('');
    setNote('');

    setIsModalOpen(false);

  }
  catch(error)
  {
   console.error("Transaction failed", error);
  }

 };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Dummy transaction data
  

 
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
    <div className='flex text-white bg-[#080F25] min-h-screen'>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: isSidebarOpen ? '200px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {/* Top Bar for Transactions */}
        <div className='flex justify-between items-center p-4 bg-[#080F25] border-b border-gray-700'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold mb-1'>Transactions</h2>
            <p className='text-sm text-gray-400'>Overview of your activities</p>
          </div>
          <div className='flex items-center space-x-3'>
            <button className='px-4 py-2 bg-gray-800 text-gray-300 rounded-md border border-gray-600 hover:bg-gray-700'>
              Pick a date
            </button>
            <select className='px-4 py-2 bg-gray-800 text-gray-300 rounded-md border border-gray-600 hover:bg-gray-700 focus:outline-none'>
              <option>All</option>
              <option>Expense</option>
              <option>Income</option>
            </select>
            <button
              className='px-4 py-2 bg-[#A33AFF] text-white rounded-md flex items-center space-x-2 hover:bg-[#8e2edb]'
              onClick={openModal} // Call openModal when "Add new" is clicked
            >
              <LuPlus />
              <span>Add new</span>
            </button>
          </div>
        </div>
        {/* //location of the component */}
        <TransactionsTable transactions={transactions}/>
        </div>

      {/* Add New Transaction Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
          <div className='bg-[#0B1739] p-6 rounded-lg shadow-xl w-[550px] relative'>
            <div className='flex justify-between items-center border-b border-gray-700 pb-3 mb-4'>
              <div>
                <h3 className='text-xl font-bold'>Adding a new Transaction</h3>
                <p className='text-sm text-gray-400'>Please fill in the form below</p>
              </div>
              <button onClick={closeModal} className='text-gray-400 hover:text-white'>
                <IoClose size={24} />
              </button>
            </div>
            
            <form onSubmit={handleTransactionCreate} className='grid grid-cols-2 gap-x-6 gap-y-4 text-sm'>
              {/* Row 1 */}
              <div>
                <label htmlFor='amount' className='block text-gray-300 font-medium mb-1'>Amount</label>
                <input
                  type='number'
                  id='amount'
                  value={amount}
                  onChange={(e)=>setAmount(e.target.value)}
                  placeholder='0'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                />
                <p className='text-xs text-gray-500 mt-1'>Transaction amount.</p>
              </div>
              <div>
                <label htmlFor='transactionType' className='block text-gray-300 font-medium mb-1'>Transaction type</label>
                <select
                  id='transactionType'
                  value={transactionType}
                  onChange={(e)=>setTransactionType(e.target.value)}
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                >
                  <option>Income</option>
                  <option>Expense</option>
                </select>
                <p className='text-xs text-gray-500 mt-1'>Transaction type.</p>
              </div>
              <div>
                <label htmlFor='category' className='block text-gray-300 font-medium mb-1'>Category</label>
                <select
                    id='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                  >
                    <option value=''>Select category</option>
                    {(transactionType === "Income" ? incomeCategories : expenseCategories).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                <p className='text-xs text-gray-500 mt-1'>Choose category.</p>
              </div>

              {/* Row 2 */}
              <div>
                <label htmlFor='paymentType' className='block text-gray-300 font-medium mb-1'>Payment type</label>
                <select
                  id='paymentType'
                  value={paymentType}
                  onChange={(e)=>setPaymentType(e.target.value)}
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                >
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                </select>
                <p className='text-xs text-gray-500 mt-1'>Choose category.</p>
              </div>
              <div>
                <label htmlFor='payedto' className='block text-gray-300 font-medium mb-1'>Payed To:</label>
                <input
                  type='text'
                  id='payedto'
                  value={payer}
                  onChange={(e)=>setPayer(e.target.value)}
                  placeholder='Name of the person or entity.'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                />
                <p className='text-xs text-gray-500 mt-1'>Name of the person or entity.</p>
              </div>
              <div>
                <label htmlFor='fromWallet' className='block text-gray-300 font-medium mb-1'>From wallet</label>
                <select
                  id='fromWallet'
                  value={fromWallet}
                  onChange={(e)=>setFromWallet(e.target.value)}
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                >
                  <option>Primary</option>
                  <option>Savings</option>
                </select>
                <p className='text-xs text-gray-500 mt-1'>Choose wallet.</p>
              </div>

              {/* Row 3 */}
              <div className='col-span-1'> {/* Make Date span one column */}
                <label htmlFor='date' className='block text-gray-300 font-medium mb-1'>Date</label>
                <input
                  type='datetime-local'
                  id='date'
                  value={dateTime}
                  onChange={(e)=>setDateTime(e.target.value)}
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF] date-input-icon'
                />
                <p className='text-xs text-gray-500 mt-1'>Select a date.</p>
              </div>
              <div className='col-span-1'> {/* Make Note span one column */}
                <label htmlFor='note' className='block text-gray-300 font-medium mb-1'>Note</label>
                <input
                  type='text'
                  id='note'
                  value={note}
                  onChange={(e)=>setNote(e.target.value)}
                  placeholder='Add a note.'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                />
                <p className='text-xs text-gray-500 mt-1'>Add a note.</p>
              </div>

              <div className='col-span-2 mt-4'>
                <button
                  type='submit'
                  className='w-full px-4 py-3 bg-[#A33AFF] text-white rounded-md font-bold hover:bg-[#8e2edb] focus:outline-none focus:ring-2 focus:ring-[#A33AFF] focus:ring-opacity-50'
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;