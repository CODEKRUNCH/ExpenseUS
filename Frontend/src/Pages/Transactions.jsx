import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sideBar'; // Assuming your sidebar component
import { AiOutlineMenu, AiOutlineDownload } from 'react-icons/ai'; // Unused, but keeping for consistency with your original code
import { LuPlus } from "react-icons/lu"; // Plus icon for "Add new" button
import { IoClose } from "react-icons/io5"; // Close icon for the modal

const Transactions = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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
  const transactions = [
    {
      id: 1,
      date: '2025-03-24',
      amount: '$5,000.00',
      paymentType: 'Cash',
      type: 'Expense',
      category: 'Food & Drinks',
    },
    {
      id: 2,
      date: '2025-02-01',
      amount: '$5,000.00',
      paymentType: 'Cash',
      type: 'Income',
      category: 'Others',
    },
    {
      id: 3,
      date: '2025-01-31',
      amount: '$5,000.00',
      paymentType: 'Cash',
      type: 'Income',
      category: 'Shopping',
    },
  ];

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

        {/* Transactions Table */}
        <div className='p-4 flex-grow'>
          <div className='bg-[#0B1739] rounded-lg p-4'>
            <table className='min-w-full table-auto'>
              <thead>
                <tr className='border-b border-gray-700 text-gray-400 text-sm'>
                  <th className='px-4 py-2 text-left w-10'>
                    <input type='checkbox' className='form-checkbox bg-gray-800 border-gray-600 rounded' />
                  </th>
                  <th className='px-4 py-2 text-left'>Date</th>
                  <th className='px-4 py-2 text-left'>Amount</th>
                  <th className='px-4 py-2 text-left'>Payment type</th>
                  <th className='px-4 py-2 text-left'>Type</th>
                  <th className='px-4 py-2 text-left'>Category</th>
                  <th className='px-4 py-2 text-left'></th> {/* For the three dots */}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className='border-b border-gray-800'>
                    <td className='px-4 py-3'>
                      <input type='checkbox' className='form-checkbox bg-gray-800 border-gray-600 rounded' />
                    </td>
                    <td className='px-4 py-3'>{transaction.date}</td>
                    <td className='px-4 py-3'>{transaction.amount}</td>
                    <td className='px-4 py-3'>{transaction.paymentType}</td>
                    <td className={`px-4 py-3 font-semibold ${transaction.type === 'Expense' ? 'text-red-500' : 'text-green-500'}`}>
                      {transaction.type}
                    </td>
                    <td className='px-4 py-3'>{transaction.category}</td>
                    <td className='px-4 py-3'>...</td> {/* Three dots */}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination/Selection Footer */}
            <div className='flex justify-between items-center mt-4 text-sm text-gray-400'>
              <span>0 of {transactions.length} row(s) selected.</span>
              <div className='flex items-center space-x-2'>
                <button className='px-2 py-1 bg-gray-800 rounded-md border border-gray-600'>&lt;</button>
                <span>1 of 1</span>
                <button className='px-2 py-1 bg-gray-800 rounded-md border border-gray-600'>&gt;</button>
                <select className='px-2 py-1 bg-gray-800 rounded-md border border-gray-600 focus:outline-none'>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Transaction Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
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

            <form className='grid grid-cols-2 gap-x-6 gap-y-4 text-sm'>
              {/* Row 1 */}
              <div>
                <label htmlFor='amount' className='block text-gray-300 font-medium mb-1'>Amount</label>
                <input
                  type='number'
                  id='amount'
                  placeholder='0'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                />
                <p className='text-xs text-gray-500 mt-1'>Transaction amount.</p>
              </div>
              <div>
                <label htmlFor='transactionType' className='block text-gray-300 font-medium mb-1'>Transaction type</label>
                <select
                  id='transactionType'
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
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                >
                  <option>Category</option>
                  <option>Food & Drinks</option>
                  <option>Shopping</option>
                  <option>Utilities</option>
                  <option>Transport</option>
                  <option>Others</option>
                </select>
                <p className='text-xs text-gray-500 mt-1'>Choose category.</p>
              </div>

              {/* Row 2 */}
              <div>
                <label htmlFor='paymentType' className='block text-gray-300 font-medium mb-1'>Payment type</label>
                <select
                  id='paymentType'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                >
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                </select>
                <p className='text-xs text-gray-500 mt-1'>Choose category.</p>
              </div>
              <div>
                <label htmlFor='payer' className='block text-gray-300 font-medium mb-1'>Payer</label>
                <input
                  type='text'
                  id='payer'
                  placeholder='Name of the person or entity.'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                />
                <p className='text-xs text-gray-500 mt-1'>Name of the person or entity.</p>
              </div>
              <div>
                <label htmlFor='fromWallet' className='block text-gray-300 font-medium mb-1'>From wallet</label>
                <select
                  id='fromWallet'
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF]'
                >
                  <option>From wallet</option>
                  <option>Main Wallet</option>
                  <option>Savings Account</option>
                </select>
                <p className='text-xs text-gray-500 mt-1'>Choose wallet.</p>
              </div>

              {/* Row 3 */}
              <div className='col-span-1'> {/* Make Date span one column */}
                <label htmlFor='date' className='block text-gray-300 font-medium mb-1'>Date</label>
                <input
                  type='date'
                  id='date'
                  defaultValue='2025-05-24' // Default to today's date
                  className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#A33AFF] date-input-icon'
                />
                <p className='text-xs text-gray-500 mt-1'>Select a date.</p>
              </div>
              <div className='col-span-1'> {/* Make Note span one column */}
                <label htmlFor='note' className='block text-gray-300 font-medium mb-1'>Note</label>
                <input
                  type='text'
                  id='note'
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