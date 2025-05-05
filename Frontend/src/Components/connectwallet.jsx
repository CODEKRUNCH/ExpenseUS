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
            } 
            catch (err) {
                console.log("Connection Error:", err);
            }
        } 
        else {
            alert("Please Install Metamask!");
        }
    };

    return (
        <button onClick={connectWallet} 
        className="rounded-md ml-5 w-40 h-8 hover:cursor-pointer bg-purple-500 font-semibold text-[14px]"
        disabled= {!!walletAddress}>
      
      {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
        </button>
    );
}  

export default ConnectWallet;