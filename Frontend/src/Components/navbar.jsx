import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#3e38ff] h-17 flex rounded-b-xl p-3 fixed right-0 left-0">
      <div className="h-1 bh-white w-full m-4 rounded flex items-center justify-between p-1.5">
        <div className="flex items-center">
          <div className="size-9 bg-blue-500 rounded-full mr-1"/>
          <span className="text-white font-semibold">Your Logo</span>
        </div>
        <nav className="space-x-13">
          <a href="" className="text-white hover:text-indigo-600">Home</a>
          <a href="" className="text-white hover:text-indigo-600">Services</a>
          <a href="" className="text-white hover:text-indigo-600">Pojects</a>
          <a href="" className="text-white hover:text-indigo-600">About</a>
          <a href="" className="text-white hover:text-indigo-600">Team</a>
        </nav>
         <div style={{
                display:'flex',
                justifyContent: 'right',        
            }}>  
            <ConnectWallet/>
            </div>
       </div>
      </div>

  )
}

export default Navbar;