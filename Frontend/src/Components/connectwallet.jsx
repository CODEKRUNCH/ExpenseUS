import { useState } from "react";
import Web3 from "web3";

function ConnectWallet () {
    const [walletAddress, setWalletAddress] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                // requestion accounts
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
                setWalletAddress(accounts[0]);
            } catch (err) {
                console.log("Connection Error:", err);
            }
        } else {
            alert("Please Install Metamask!");
        }
    };

    return (
        <button onClick={connectWallet} 
        className="bg-blue-600  rounded-lg border border-gray-600 font-lightbold text-white p-2 m-[-16px] hover:bg-blue-500 hover:cursor-pointer "
        disabled= {!!walletAddress}>
      
      {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
        </button>
    );
}  

export default ConnectWallet;