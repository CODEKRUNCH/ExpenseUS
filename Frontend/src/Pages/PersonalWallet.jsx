import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import StripeContainer from '../stripe/StripeContainer';

const PersonalWallet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [balance, setBalance] = useState(5000);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [amount, setAmount] = useState('');

  const handlePaymentSuccess = (amountInCents) => {
    setBalance((prev) => prev + amountInCents);
    setPaymentStatus('completed');
    setAmount('');
    setTimeout(() => setPaymentStatus('idle'), 3000);
  };

  return (
    <div className="flex text-white bg-[#080F25] min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div
      className={`flex-1 px-4 md:px-10 py-6 transition-all duration-300 ${
  isSidebarOpen ? 'ml-0 md:ml-[201px]' : 'ml-0'
}`}
      >
        <h2 className="text-3xl font-bold mb-6"> Personal Wallet</h2>

        <div className="bg-[#0B1739] p-6 rounded-lg shadow-md max-w-md mb-6">
          <h3 className="text-xl font-semibold">Current Balance</h3>
          <p className="text-green-400 text-3xl mt-2 font-mono">${(balance / 100).toFixed(2)}</p>
        </div>

        <div className="max-w-md">
          <h3 className="text-lg font-semibold mb-2">Add Funds</h3>

          <input
            type="number"
            placeholder="Enter amount in USD"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded bg-[#1C1C1C] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {paymentStatus === 'processing' && (
            <div className="text-sm text-yellow-400 mb-2">Processing payment, please wait...</div>
          )}
          {paymentStatus === 'completed' && (
            <div className="text-sm text-green-400 mb-2">Transaction complete!</div>
          )}

          <StripeContainer
            onPaymentSuccess={handlePaymentSuccess}
            setPaymentStatus={setPaymentStatus}
            amount={parseFloat(amount)}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalWallet;
