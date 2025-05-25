import React, { useState } from 'react';
import { AiOutlineSearch, AiFillStar, AiOutlineHome, AiOutlineWallet } from 'react-icons/ai';
import { BsPeopleFill, BsGearFill } from 'react-icons/bs';
// import { FaBitcoin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp, MdClose } from 'react-icons/md';
import ConnectWallet from './connectwallet';
import { FaBitcoin, FaWallet } from 'react-icons/fa';


const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [cryptoOpen, setCryptoOpen] = useState(false);

  const togglePayments = () => {
    setPaymentsOpen(!paymentsOpen);
  };

  const toggleCrypto = () => {
    setCryptoOpen(!cryptoOpen);
  };

  return (
    <div
      style={{
        backgroundColor: '#081028',
        color: '#CBD5E0',
        width: '201px', // Slightly smaller width
        height: '100vh',
        padding: '15px 0', // Slightly smaller padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        zIndex: 20,
        fontSize: '12px', // Base font size for the sidebar
      }}
    >
      {/* Close Button at top right */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        color: '#A0AEC0',
        fontSize: '18px',
      }} onClick={onClose}>
        {/* <MdClose /> */}
      </div>

      <div style={{ padding: '0 15px', marginBottom: '20px', width: '100%' }}>
        <h2 style={{ color: '#E2E8F0', marginBottom: '8px', fontSize: '19px' }}>ExpenseUS</h2>
        <div
          style={{
            backgroundColor: '#2D3748',
            borderRadius: '6px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AiOutlineSearch style={{ marginRight: '8px', color: '#A0AEC0', fontSize: '14px' }} />
          <input
            type="text"
            placeholder="Search for..."
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#A0AEC0',
              fontSize: '12px',
              outline: 'none',
              width: '100%',
            }}
          />
        </div>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0, width: '100%' }}>
        <li style={sidebarItemStyle} onClick={() => navigate('/')}>
          <AiFillStar style={sidebarIconStyle} /> Dashboard
        </li>
        <li style={sidebarItemStyle} onClick={togglePayments}>
          <AiOutlineHome style={sidebarIconStyle} /> Payments
          <div style={{ marginLeft: 'auto' }}>
            {paymentsOpen ? <MdArrowDropUp style={arrowIconStyle} /> : <MdArrowDropDown style={arrowIconStyle} />}
          </div>
        </li>
        {paymentsOpen && (
          <ul style={submenuStyle}>
            <li style={sublistItemStyle}>Split Bills</li>
            {/* <li style={sublistItemStyle}>Income Manager</li> */}
          </ul>
        )}
        <li style={sidebarItemStyle} onClick={toggleCrypto}>
          <FaBitcoin style={sidebarIconStyle} /> Crypto
          <div style={{ marginLeft: 'auto' }}>
            {cryptoOpen ? <MdArrowDropUp style={arrowIconStyle} /> : <MdArrowDropDown style={arrowIconStyle} />}
          </div>
        </li>
        {cryptoOpen && (
          <ul style={submenuStyle}>
            <li style={sublistItemStyle}>Wallets</li>
            <li style={sublistItemStyle}>Market Alerts</li>
          </ul>
        )}
        <li style={sidebarItemStyle} onClick={() => navigate('/transactions')}>
          <AiFillStar style={sidebarIconStyle} /> Income Manager
        </li>
        <li style={sidebarItemStyle}>
          <BsPeopleFill style={sidebarIconStyle} /> Children Users
          <div style={{ marginLeft: 'auto' }}>
            <MdArrowDropDown style={arrowIconStyle} />
          </div>
        </li>
        <li style={sidebarItemStyle} onClick={() => navigate('/personalwallet')}>
          <FaWallet style={sidebarIconStyle} /> Personal Wallet
        </li>

      </ul>
      <br />

      <div style={{ marginTop: 'auto', padding: '0', width: '100%' }}>
        <hr style={{ borderColor: '#4A5568', marginBottom: '15px' }} />
        <div style={sidebarItemStyle}>
          <BsGearFill style={sidebarIconStyle} /> Settings
          <div style={{ marginLeft: 'auto' }}>
            <MdArrowDropDown style={arrowIconStyle} />
          </div>
        </div>
        <div style={sidebarItemStyle}>
          <AiOutlineWallet style={sidebarIconStyle} /> Privacy and Policy
          <div style={{ marginLeft: 'auto' }}>
            <MdArrowDropDown style={arrowIconStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 15px', marginBottom: '15px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#63B3ED',
              marginRight: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#E2E8F0',
              fontSize: '12px',
            }}
          >
            B
          </div>
          <div>
            <p style={{ color: '#E2E8F0', fontSize: '12px', marginBottom: '1px' }}>Bablu Boxer</p>
            <p style={{ color: '#A0AEC0', fontSize: '10px', margin: 0 }}>Account settings</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <MdArrowDropDown style={arrowIconStyle} />
          </div>
        </div>
        <ConnectWallet >
          Connect Wallet
        </ConnectWallet>
      </div>
    </div>
  );
};

const sidebarItemStyle = {
  padding: '8px 15px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#2D3748',
  },
  width: '100%',
  justifyContent: 'flex-start',
  fontSize: '12px',
};

const sidebarIconStyle = {
  marginRight: '10px',
  fontSize: '14px',
  color: '#A0AEC0',
};

const arrowIconStyle = {
  fontSize: '14px',
  color: '#A0AEC0',
};

const submenuStyle = {
  listStyleType: 'none',
  paddingLeft: '30px',
  margin: 0,
  width: '100%',
};

const sublistItemStyle = {
  padding: '6px 0',
  fontSize: '12px',
  color: '#A0AEC0',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: '#E2E8F0',
  },
  width: '100%',
  textAlign: 'left',
};

export default Sidebar;