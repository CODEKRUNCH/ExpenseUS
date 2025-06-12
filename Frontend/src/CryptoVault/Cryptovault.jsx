import { useState, useEffect } from "react";
import "./Cryptovault.css"
import Sidebar from "../components/sideBar";
import PieChartComponent from "../Components/CryptoPieChart";
import EthChart from "../Components/Crypto Asset Graphs/Ethereum";
import BtcChart from "../Components/Crypto Asset Graphs/Bitcoin";
import LtcChart from "../Components/Crypto Asset Graphs/Litecoin";

function ConnectWallet() {
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [contractBalance, setContractBalance] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(Date.now());

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
            setIsRefreshing(true);
            try {
                const balanceHex = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [walletAddress, 'latest']
                });
                const balanceWei = parseInt(balanceHex, 16);
                const balanceEth = balanceWei / Math.pow(10, 18);
                setBalance(balanceEth.toFixed(4));

                await getContractBalance();
                setLastRefresh(Date.now());
            } catch (error) {
                console.error("Error refreshing balances:", error);
            } finally {
                setIsRefreshing(false);
            }
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Alternative approach: Check if already connected and clear first
                const existingAccounts = await window.ethereum.request({
                    method: "eth_accounts"
                });

                if (existingAccounts.length > 0) {
                    // If already connected, force a fresh permission request
                    await window.ethereum.request({
                        method: 'wallet_requestPermissions',
                        params: [{ eth_accounts: {} }]
                    });
                }

                // Request accounts (this will show popup for new connections)
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });

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
                // Handle user rejection
                if (err.code === 4001) {
                    alert("Please approve the connection request to use the wallet features.");
                }
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

    const depositToContract = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet first");
            return;
        }

        if (!depositAmount) {
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

            setTimeout(async () => {
                await refreshBalances();
            }, 3000);

        } catch (err) {
            console.error("Deposit Error:", err);
            alert("Deposit failed: " + err.message);
        }
        setIsLoading(false);
    };

    const withdrawFromContract = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet first");
            return;
        }

        if (!withdrawAmount) {
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

            setTimeout(async () => {
                await refreshBalances();
            }, 3000);
        } catch (err) {
            console.error("Withdraw Error:", err);
            alert("Withdrawal failed: " + err.message);
        }
        setIsLoading(false);
    };

    // Auto-refresh balances every 10 seconds
    useEffect(() => {
        let intervalId;

        if (walletAddress) {
            refreshBalances();
            intervalId = setInterval(() => {
                refreshBalances();
            }, 10000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [walletAddress]);

    // Listen for account changes
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

    const eth = "190$";

    return (
        <>
            <div className="bg-gray-950 min-h-full border border-gray-950">
                {/* <Sidebar /> */}

                {isOwner && walletAddress && (
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
                    <div className="p-6 max-w-5xl ml-55 rounded-lg px-4 py-4 border ">
                        <h1 className="mb-16 px-4 font-bold text-amber-50 text-3xl">Dashboard</h1>
                        <div className="mb-12">

                        </div>

                        <div className="space-y-6">
                            {walletAddress && (
                                <div className="flex justify-center items-center mb-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                                        <span>
                                            {isRefreshing ? 'Updating...' : `Last updated: ${new Date(lastRefresh).toLocaleTimeString()}`}
                                        </span>
                                        {isRefreshing && (
                                            <div>
                                                <div className="w-4 h-4 border-2 border-gray-400 rounded-full animate-spin"></div>
                                            </div>)}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-between gap-3">

                                <div className="bg-[#0B1739] border border-gray-800 rounded-md p-15">
                                    <div className="flex flex-col items-center gap-8">

                                        {/* Wallet Balance Section */}
                                        <div className="flex flex-col items-center text-center">

                                            {isRefreshing && (
                                                <div className="mb-2"></div>
                                            )}
                                            <img src="/images/wallet.png" className="w-12 h-12 mb-4" />
                                            <p className="text-sm text-gray-400 mb-1">Wallet Balance</p>
                                            <p className="text-2xl text-white font-bold">
                                                {walletAddress ? `${balance} ETH` : "Updating..."}
                                            </p>
                                        </div>

                                        {/* Contract Balance Section */}
                                        <div className="flex flex-col items-center text-center">
                                            <p className="text-sm text-gray-400 mb-1">Contract Balance</p>
                                            <p className="text-md text-gray-300 font-semibold">
                                                {contractBalance ? `${contractBalance} ETH` : "Updating..."}
                                            </p>
                                            {!walletAddress && (
                                                <p className="text-xs text-gray-400 mt-1"></p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-170 h-70 ">
                                    <div className="grid grid-cols-7 gap-3 w-198">

                                        <div className="rounded-lg col-span-2 row-span-12 bg-[#0B1739] border border-gray-800">            {/*Ethereum*/}
                                            <div className="flex justify-between">
                                                <div>
                                                    <img src="/images/ethereum.png" class="h-13 w-13 ml-1 mt-3 " />
                                                    <p className="text-[11px] ml-4 text-gray-400 mt-4">ETH</p>
                                                    <p className="text-[15px] text-white ml-4">Ethereum</p>
                                                </div>
                                                <div className="flex flex-end ml-4">
                                                    <EthChart />
                                                    <p className="relative font-bold text-[20px] top-23 right-24 text-white">0.22006</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg col-span-2 row-span-12 bg-[#0B1739] border border-gray-800">   {/*Bitcoin*/}
                                            <div className="flex justify-between gap-8">
                                                <div>
                                                    <img src="/images/bitcoin.png" class="h-11 w-11 ml-4 mt-3 " />
                                                    <p className="text-[12px] ml-4 text-gray-400 mt-6">BTC</p>
                                                    <p className="relative text-[15px] text-white ml-4">Bitcoin</p>
                                                </div>
                                                <div className="flex justify-end ">
                                                    <BtcChart />
                                                    <p className="relative font-extrabold text-[20px] top-23 right-23 text-white">0.06091</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-lg col-span-2 row-span-12 bg-[#0B1739] border border-gray-800">     {/*Litecoin*/}
                                            <div className="flex justify-between gap-8">
                                                <div>
                                                    <img src="/images/litecoin.png" class="h-11 w-11 ml-4 mt-3 " />
                                                    <p className="text-[12px] ml-4 text-gray-400 mt-6">LTC</p>
                                                    <p className="text-[15px] text-white ml-4">Litecoin</p>
                                                </div>
                                                <div className="flex justify-end ">
                                                    <LtcChart />
                                                    <p className="relative font-extrabold text-[20px] top-23 right-25 text-white">900.100</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-lg col-span-3 row-span-16 bg-[#0B1739] border border-gray-800 text-white text-center">
                                        </div>      {/*Analytics*/}
                                        <div className="rounded-lg col-span-3 row-span-16 bg-[#0B1739] "></div>      {/*Transactions*/}
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-col items-center mt-19 pt-4">
                                <h3 className="px-4 py-3 w-60 flex flex-col items-center rounded-md text-lg text-white font-bold mb-9 border border-gray-400">Deposit & Withdraw</h3>
                                <div className="grid grid-cols-3 md:grid-cols-2 gap-5 mb-4 border ">
                                    <div className="p-4 rounded-md border bg-[#0B1739] border-gray-800">
                                        <p className="flex flex-col items-center px-4 py-9 text-2xl text-white">Deposit</p>
                                        <div className="space-y-2">
                                            <input
                                                type="number"
                                                step="0.001"
                                                value={depositAmount}
                                                onChange={(e) => setDepositAmount(e.target.value)}
                                                placeholder="0.1"
                                                disabled={!walletAddress}
                                                className="w-full px-3 py-2 border border-gray-700 bg-[#1c1c1c] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm text-gray-400 disabled:opacity-50"
                                            />
                                            <button
                                                onClick={depositToContract}
                                                disabled={isLoading || !depositAmount || !walletAddress}
                                                className="w-full bg-gray-800 hover:bg-[#0B1739] disabled:bg-gray-800 text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors cursor-pointer mt-2 disabled:opacity-50"
                                            >
                                                {isLoading ? "Depositing..." : walletAddress ? "Deposit ETH" : "Connect Wallet to Deposit"}
                                            </button>
                                        </div>
                                    </div>


                                    <div className="p-4 rounded-md border border-gray-800 bg-[#0B1739]">
                                        <p className="flex flex-col items-center px-4 py-9 text-2xl text-white">
                                            Withdraw {!isOwner && "(Owner)"}
                                        </p>
                                        <div className="space-y-2">
                                            <input
                                                type="number"
                                                step="0.001"
                                                value={withdrawAmount}
                                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                                placeholder="0.1"
                                                disabled={!isOwner || !walletAddress}
                                                className="w-full px-3 py-2 border bg-[#1c1c1c] text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 text-sm disabled:bg-gray-700 disabled:opacity-50"
                                            />
                                            <button
                                                onClick={withdrawFromContract}
                                                disabled={isLoading || !withdrawAmount || !isOwner || !walletAddress}
                                                className="w-full bg-gray-700 disabled:bg-gray-800 cursor-pointer text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors mt-2 disabled:opacity-50"
                                            >
                                                {isLoading ? "Withdrawing..." :
                                                    !walletAddress ? "Connect Wallet to Withdraw" :
                                                        !isOwner ? "Owner Only" : "Withdraw ETH"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

export default ConnectWallet;