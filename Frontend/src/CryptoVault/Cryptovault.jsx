import { useState, useEffect } from "react";
import './CryptoVault.css';

function ConnectWallet() {
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [contractBalance, setContractBalance] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");
    const [sendAmount, setSendAmount] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [isOwner, setIsOwner] = useState(false);

    // Contract details
    const CONTRACT_ADDRESS = "0x88f4ff31d510871b76240a6d94de630e7b465903";
    const CONTRACT_ABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ];

    const encodeMethodCall = (methodName, params = []) => {
        const selectors = {
            'getBalance': '0x12065fe0',
            'owner': '0x8da5cb5b',
            'deposit': '0xd0e30db0',
            'withdraw': '0x2e1a7d4d'
        };
        
        if (methodName === 'withdraw' && params.length > 0) {
            const amountHex = params[0].toString(16).padStart(64, '0');
            return selectors[methodName] + amountHex;
        }
        
        return selectors[methodName];
    };

    const getContractBalance = async () => {
        try {
            const data = encodeMethodCall('getBalance');
            const result = await window.ethereum.request({
                method: 'eth_call',
                params: [{
                    to: CONTRACT_ADDRESS,
                    data: data
                }, 'latest']
            });
            
            const balanceWei = parseInt(result, 16);
            const balanceEth = balanceWei / Math.pow(10, 18);
            setContractBalance(balanceEth.toFixed(4));
        } catch (err) {
            console.log("Error getting contract balance:", err);
        }
    };

    const checkOwnership = async (address) => {
        try {
            const data = encodeMethodCall('owner');
            const result = await window.ethereum.request({
                method: 'eth_call',
                params: [{
                    to: CONTRACT_ADDRESS,
                    data: data
                }, 'latest']
            });
            
            const ownerAddress = '0x' + result.slice(-40);
            setIsOwner(ownerAddress.toLowerCase() === address.toLowerCase());
        } catch (err) {
            console.log("Error checking ownership:", err);
        }
    };

    const updateContractInfo = async (address) => {
        try {
            await getContractBalance();
            await checkOwnership(address);
        } catch (err) {
            console.log("Contract info error:", err);
        }
    };

    const refreshBalances = async () => {
        if (walletAddress) {
            const balanceHex = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [walletAddress, 'latest']
            });
            const balanceWei = parseInt(balanceHex, 16);
            const balanceEth = balanceWei / Math.pow(10, 18);
            setBalance(balanceEth.toFixed(4));
            
            await getContractBalance();
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setWalletAddress(accounts[0]);
                
                const balanceHex = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [accounts[0], 'latest']
                });
                
                const balanceWei = parseInt(balanceHex, 16);
                const balanceEth = balanceWei / Math.pow(10, 18);
                setBalance(balanceEth.toFixed(4));

                await updateContractInfo(accounts[0]);
            } 
            catch (err) {
                console.log("Connection Error:", err);
            }
        } 
        else {
            alert("Please Install MetaMask!");
        }
    };

    const disconnectWallet = () => {
        setWalletAddress("");
        setBalance("");
        setContractBalance("");
        setTxHash("");
        setIsOwner(false);
    };

    const sendTransaction = async () => {
        if (!walletAddress || !recipientAddress || !sendAmount) {
            alert("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const amountWei = (parseFloat(sendAmount) * Math.pow(10, 18)).toString(16);
            
            const txParams = {
                from: walletAddress,
                to: recipientAddress,
                value: '0x' + amountWei,
                gas: '0x5208',
            };

            const result = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [txParams],
            });
            
            setTxHash(result);
            await refreshBalances();
            setRecipientAddress("");
            setSendAmount("");
            
        } catch (err) {
            console.error("Transaction Error:", err);
            alert("Transaction failed: " + err.message);
        }
        setIsLoading(false);
    };

    const depositToContract = async () => {
        if (!walletAddress || !depositAmount) {
            alert("Please enter deposit amount");
            return;
        }

        setIsLoading(true);
        try {
            const amountWei = (parseFloat(depositAmount) * Math.pow(10, 18)).toString(16);
            const data = encodeMethodCall('deposit');
            
            const txParams = {
                from: walletAddress,
                to: CONTRACT_ADDRESS,
                value: '0x' + amountWei,
                data: data,
                gas: '0x7530',
            };

            const result = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [txParams],
            });
            
            setTxHash(result);
            setDepositAmount("");
            await refreshBalances();
            
        } catch (err) {
            console.error("Deposit Error:", err);
            alert("Deposit failed: " + err.message);
        }
        setIsLoading(false);
    };

const withdrawFromContract = async () => {
    if (!walletAddress || !withdrawAmount) {
        alert("Please enter a valid withdraw amount.");
        return;
    }

    if (!isOwner) {
        alert("Only the contract owner can withdraw.");
        return;
    }

    setIsLoading(true);
    try {
        const amountWei = BigInt(parseFloat(withdrawAmount) * Math.pow(10, 18)).toString(16);
        const data = encodeMethodCall('withdraw', [amountWei]);

        const txParams = {
            from: walletAddress,
            to: CONTRACT_ADDRESS,
            data: data,
            gas: '0x100000', // Increased gas limit
        };

        const result = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [txParams],
        });

        setTxHash(result);
        setWithdrawAmount("");
        await refreshBalances();
    } catch (err) {
        console.error("Withdraw Error:", err);
        alert("Withdrawal failed: " + err.message);
    }
    setIsLoading(false);
};


    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else {
                    setWalletAddress(accounts[0]);
                    window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [accounts[0], 'latest']
                    }).then(balanceHex => {
                        const balanceWei = parseInt(balanceHex, 16);
                        const balanceEth = balanceWei / Math.pow(10, 18);
                        setBalance(balanceEth.toFixed(4));
                    });
                    updateContractInfo(accounts[0]);
                }
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="mb-4">
                <button 
                    onClick={walletAddress ? disconnectWallet : connectWallet} 
                    className="w-full text-white rounded-md py-2 px-4 hover:cursor-pointer bg-purple-500 hover:bg-purple-600 font-semibold text-sm transition-colors"
                >
                    {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
                </button>
            </div>

            {walletAddress && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-600">Wallet Balance:</p>
                            <p className="text-lg font-semibold">{balance} ETH</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm text-blue-600">Contract Balance:</p>
                            <p className="text-lg font-semibold text-blue-800">{contractBalance} ETH</p>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="bg-green-50 border border-green-200 p-2 rounded-md">
                            <p className="text-sm text-green-800 font-semibold">✓ You are the contract owner</p>
                        </div>
                    )}

                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold mb-3">Smart Contract Actions</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border border-blue-200 p-4 rounded-md">
                                <h4 className="font-medium text-blue-800 mb-2">Deposit to Contract</h4>
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        step="0.001"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                        placeholder="0.1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <button
                                        onClick={depositToContract}
                                        disabled={isLoading || !depositAmount}
                                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors"
                                    >
                                        {isLoading ? "Depositing..." : "Deposit ETH"}
                                    </button>
                                </div>
                            </div>

                            <div className="border border-orange-200 p-4 rounded-md">
                                <h4 className="font-medium text-orange-800 mb-2">
                                    Withdraw from Contract {!isOwner && "(Owner Only)"}
                                </h4>
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        step="0.001"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="0.1"
                                        disabled={!isOwner}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm disabled:bg-gray-100"
                                    />
                                    <button
                                        onClick={withdrawFromContract}
                                        disabled={isLoading || !withdrawAmount || !isOwner}
                                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors"
                                    >
                                        {isLoading ? "Withdrawing..." : "Withdraw ETH"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold mb-3">Send ETH</h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Recipient Address
                                </label>
                                <input
                                    type="text"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                    placeholder="0x..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount (ETH)
                                </label>
                                <input
                                    type="number"
                                    step="0.001"
                                    value={sendAmount}
                                    onChange={(e) => setSendAmount(e.target.value)}
                                    placeholder="0.1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                />
                            </div>
                            
                            <button
                                onClick={sendTransaction}
                                disabled={isLoading || !recipientAddress || !sendAmount}
                                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors"
                            >
                                {isLoading ? "Sending..." : "Send Transaction"}
                            </button>
                        </div>
                    </div>

                    {txHash && (
                        <div className="bg-green-50 border border-green-200 p-3 rounded-md">
                            <p className="text-sm text-green-800">
                                Transaction successful!
                            </p>
                            <p className="text-xs text-green-600 break-all">
                                TX: {txHash}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ConnectWallet;