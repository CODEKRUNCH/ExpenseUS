import { useState, useEffect } from "react";
import './Cryptovault.css'
import CryptoCharts from "../Components/CryptoGraph";

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
        <>
            <div className="bg-black min-h-screen">
            <CryptoCharts />
                {isOwner && (
                    <div className="flex flex-col items-center mt-2 ml-[40%] border w-[20%] bg-[#0B1739] border-green-200 p-2 rounded-md">
                        <p className="text-sm text-green-300 font-semibold">✓ You are the contract owner</p>
                    </div>
                )}
                <div>
                    <button
                        onClick={walletAddress ? disconnectWallet : connectWallet}
                        className="ml-[1160px] mt-4 w-50 text-white rounded-md py-2 px-4 hover:cursor-pointer bg-[#0B1739] hover:bg-gray-950 font-semibold text-sm transition-colors"
                    >
                        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
                    </button>
                    <div className="p-6 max-w-3xl mx-auto rounded-lg px-4 py-4"><h1 className="flex flex-col items-center mb-16 mt-2 px-4 font-bold text-amber-50 text-5xl">Dashboard</h1>
                        <div className="mb-12">

                        </div>

                        {walletAddress && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-5 border">
                                    <div className="bg-[#0B1739] p-9 flex flex-col items-center rounded-md border border-gray-800">
                                        <p className="text-sm text-white">Wallet Balance:</p>
                                        <p className="text-lg text-white font-semibold">{balance} ETH</p>
                                    </div>
                                    <div className="bg-[#0B1739] p-9 flex flex-col items-center rounded-md border border-gray-800">
                                        <p className="text-sm text-white ">Contract Balance:</p>
                                        <p className="text-lg font-semibold text-white">{contractBalance} ETH</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center pt-4">
                                    <h3 className="px-4 py-3 w-60 flex flex-col items-center rounded-md text-lg text-white font-bold mb-9 border border-gray-400">Deposit & Withdraw</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                        <div className="p-4 rounded-md bg-[#0B1739] border-gray-800">
                                            <h4 className="font-medium text-white mb-2">Deposit to Contract</h4>
                                            <div className="space-y-2">
                                                <input
                                                    type="number"
                                                    step="0.001"
                                                    value={depositAmount}
                                                    onChange={(e) => setDepositAmount(e.target.value)}
                                                    placeholder="0.1"
                                                    className="w-full px-3 py-2 border border-gray-700 bg-[#1c1c1c] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm text-gray-400"
                                                />
                                                <button
                                                    onClick={depositToContract}
                                                    disabled={isLoading || !depositAmount}
                                                    className="w-full bg-gray-800 hover:bg-[#0B1739] disabled:bg-gray-800 text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors cursor-pointer mt-2"
                                                >
                                                    {isLoading ? "Depositing..." : "Deposit ETH"}
                                                </button>
                                            </div>
                                        </div>

                                        <div className=" p-4 rounded-md border border-gray-800 bg-[#0B1739]">
                                            <h4 className="font-medium text-white mb-2">
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
                                                    className="w-full px-3 py-2 border bg-[#1c1c1c] text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 text-sm disabled:bg-gray-100"
                                                />
                                                <button
                                                    onClick={withdrawFromContract}
                                                    disabled={isLoading || !withdrawAmount || !isOwner}
                                                    className="w-full bg-gray-700 disabled:bg-gray-800 cursor-pointer text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors mt-2"
                                                >
                                                    {isLoading ? "Withdrawing..." : "Withdraw ETH"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h3 className="px-4 py-3 w-40 flex flex-col items-center border border-gray-400 rounded-md text-lg font-bold mb-3 text-white">Send Ether</h3>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-140 px-4 py-4 rounded-md bg-[#0B1739]">
                                        <div className="border-white pt-2">

                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-1 ">
                                                        Recipient Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={recipientAddress}
                                                        onChange={(e) => setRecipientAddress(e.target.value)}
                                                        placeholder="0x..."
                                                        className="w-full px-3 py-2 border border-gray-600 bg-[#1c1c1c] rounded-md focus:outline-none focus:text-white focus:border-white text-white text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-white mb-1">
                                                        Amount (ETH)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.001"
                                                        value={sendAmount}
                                                        onChange={(e) => setSendAmount(e.target.value)}
                                                        placeholder="0.1"
                                                        className="w-full px-3 py-2 border border-gray-600 bg-[#1c1c1c] text-white rounded-md focus:bg-[#1c1c1c] text-sm"
                                                    />
                                                </div>

                                                <button
                                                    onClick={sendTransaction}
                                                    disabled={isLoading || !recipientAddress || !sendAmount}
                                                    className="mt-3 px-4 py-2 w-full border border-gray-700 disabled:bg-gray-800 text-white rounded-md font-semibold text-sm transition-colors cursor-pointer"
                                                >
                                                    {isLoading ? "Sending..." : "Send Transaction"}
                                                </button>
                                            </div>
                                        </div>
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
                </div>
            </div>
        </>
    );
}


export default ConnectWallet;