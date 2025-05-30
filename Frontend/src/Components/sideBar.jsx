import React, { useState } from 'react';
import { AiOutlineSearch, AiFillStar, AiOutlineHome, AiOutlineWallet } from 'react-icons/ai';
import { BsPeopleFill, BsGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import ConnectWallet from './connectwallet';
import { FaBitcoin, FaWallet } from 'react-icons/fa';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [cryptoOpen, setCryptoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(''); // <- New state for tracking active section
  
  const togglePayments = () => setPaymentsOpen(!paymentsOpen);
  const toggleCrypto = () => setCryptoOpen(!cryptoOpen);

  const handleSectionClick=(section,path=null)=>{
    setActiveSection(section)
    if (path) navigate(path)
  }

  const activeClass = 'bg-[#1A202C]';

  return (
    <div className="fixed top-0 left-0 h-screen w-[201px] bg-[#081028] text-[#CBD5E0] flex flex-col px-0 py-4 overflow-y-auto scrollbar-hide z-20 text-xs">
      {/* Close Button */}
      <div
        className="absolute top-2.5 right-2.5 text-[#A0AEC0] text-lg cursor-pointer"
        onClick={onClose}
      >
        {/* <MdClose /> */}
      </div>

      <div className="px-4 mb-5 w-full">
        <h2 className="text-[#E2E8F0] mb-2 text-lg font-semibold">ExpenseUS</h2>
        <div className="bg-[#2D3748] rounded-md p-1.5 flex items-center">
          <AiOutlineSearch className="mr-2 text-[#A0AEC0] text-sm" />
          <input
            type="text"
            placeholder="Search for..."
            className="bg-transparent border-none outline-none text-[#A0AEC0] text-xs w-full"
          />
        </div>
      </div>

      <ul className="list-none p-0 m-0 w-full">
        <li
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs"
          onClick={()=> handleSectionClick('dashboard', '/')}
        >
          <AiFillStar className="mr-2 text-[#A0AEC0] text-sm" />
          Dashboard
        </li>
        <li
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs"
          onClick={togglePayments}
        >
          <AiOutlineHome className="mr-2 text-[#A0AEC0] text-sm" />
          Payments
          <div className="ml-auto">
            {paymentsOpen ? (
              <MdArrowDropUp className="text-[#A0AEC0] text-sm" />
            ) : (
              <MdArrowDropDown className="text-[#A0AEC0] text-sm" />
            )}
          </div>
        </li>
        {paymentsOpen && (
          <ul className="list-none pl-7 mt-1 w-full">
            <li
              className="py-2 px-4 text-[#CBD5E0] cursor-pointer hover:bg-[#2D3748] w-full flex items-center text-xs"
             onClick={()=>handleSectionClick('splitbill','/splitbill')}
            >
              Split Bills
            </li>
          </ul>

        )}

        <li
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs"
          onClick={toggleCrypto}
        >
          <FaBitcoin className="mr-2 text-[#A0AEC0] text-sm" />
          Crypto
          <div className="ml-auto">
            {cryptoOpen ? (
              <MdArrowDropUp className="text-[#A0AEC0] text-sm" />
            ) : (
              <MdArrowDropDown className="text-[#A0AEC0] text-sm" />
            )}
          </div>
        </li>
        {cryptoOpen && (
          <ul className="list-none pl-7 mt-1 w-full">
            <li
              className="py-2 px-4 text-[#CBD5E0] cursor-pointer hover:bg-[#2D3748] w-full flex items-center text-xs"
              onClick={()=>handleSectionClick('cryptovault','/cryptovault')}           >
              Wallets
            </li>
            <li
              className="py-2 px-4 text-[#CBD5E0] cursor-pointer hover:bg-[#2D3748] w-full flex items-center text-xs"
              onClick={()=>handleSectionClick('','/')}            >
              Market Alerts
            </li>
          </ul>
        )}

        <li
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs"
          onClick={() => handleSectionClick('transactions','/transactions')}
        >
          <AiFillStar className="mr-2 text-[#A0AEC0] text-sm" />
          Transaction Records
        </li>

        <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs">
          <BsPeopleFill className="mr-2 text-[#A0AEC0] text-sm" />
          Children Users
          <div className="ml-auto">
            <MdArrowDropDown className="text-[#A0AEC0] text-sm" />
          </div>
        </li>

        <li
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs"
          onClick={() => handleSectionClick('personalwallet','/personalwallet')}
        >
          <FaWallet className="mr-2 text-[#A0AEC0] text-sm" />
          Personal Wallet
        </li>
      </ul>

      <div className="mt-auto px-0 w-full">
        <hr className="border-[#4A5568] mb-4" />

        <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs">
          <BsGearFill className="mr-2 text-[#A0AEC0] text-sm" />
          Settings
          <div className="ml-auto">
            <MdArrowDropDown className="text-[#A0AEC0] text-sm" />
          </div>
        </div>

        <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2D3748] w-full text-xs">
          <AiOutlineWallet className="mr-2 text-[#A0AEC0] text-sm" />
          Privacy and Policy
          <div className="ml-auto">
            <MdArrowDropDown className="text-[#A0AEC0] text-sm" />
          </div>
        </div>

        <div className="flex items-center px-4 py-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-blue-400 mr-2 flex justify-center items-center text-[#E2E8F0] text-xs">
            B
          </div>
          <div>
            <p className="text-[#E2E8F0] text-xs mb-[2px]">Bablu Boxer</p>
            <p className="text-[#A0AEC0] text-[10px] m-0">Account settings</p>
          </div>
          <div className="ml-auto">
            <MdArrowDropDown className="text-[#A0AEC0] text-sm" />
          </div>
        </div>

        <ConnectWallet>Connect Wallet</ConnectWallet>
      </div>
    </div>
  );
};

export default Sidebar;
