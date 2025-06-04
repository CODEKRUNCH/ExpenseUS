import { useState, useEffect } from "react";
import "./Cryptovault.css"
import Sidebar from "../components/sideBar";
import EthChart from "../Components/Crypto Asset Graphs/Ethereum";

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
        if (!walletAddress) {
            alert("Please connect your wallet first");
            return;
        }

        if (!recipientAddress || !sendAmount) {
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
            setRecipientAddress("");
            setSendAmount("");

            setTimeout(async () => {
                await refreshBalances();
            }, 3000);

        } catch (err) {
            console.error("Transaction Error:", err);
            alert("Transaction failed: " + err.message);
        }
        setIsLoading(false);
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
                <Sidebar />

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



                            <div className="grid grid-flow-col grid-rows-3 gap-4 ">

                                {/*WALLET ADDRESS*/}
                                <div className="bg-[#0B1739] row-span-3 w-60 h-60 flex flex-col items-center rounded-md border border-gray-800">
                                    <div>
                                        <div className="flex flex-col items-center gap-8">

                                            <div className="flex flex-col items-center">
                                                {isRefreshing && (
                                                    <div className="absolute top-2 right-2">

                                                    </div>)}
                                                <div>
                                                    <img src="/images/wallet.png" className="w-12 h-12 mr-33 mt-5 " /></div>
                                                <p className="text-sm text-gray-400 mt-7 ml-[-112px]">Wallet Balance</p>
                                                <p className="text-[26px] text-white   ml-[-69px] font-semibold">
                                                    {walletAddress ? `${balance} ETH` : "-- ETH"}
                                                </p>
                                                {!walletAddress && (
                                                    <p className="text-xs text-gray-400 mt-1"></p>)}
                                            </div>

                                            <div>
                                                <div className="bg-[#0B1739] flex flex-col items-center rounded-md ">

                                                    <p className="text-sm text-gray-400 ml-[-101px]">Contract Balance</p>
                                                    <p className="text-[14px] text-gray-300 ml-[-130px] font-semibold">
                                                        {contractBalance ? `${contractBalance} ETH` : ""}
                                                    </p>
                                                    {!walletAddress && (
                                                        <p className="text-xs text-gray-400"></p>)}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/*CONTRACT BALANCE*/}

                                <div className="bg-gray-950 col-span-2 h-28 row-span-1 rounded-md w-[734px]">
                                    <div className="grid grid-flow-col grid-rows-3 gap-4">
                                        <div className="row-span-8 rounded-md text-white border border-gray-800 bg-[#0B1739] flex flex-col items-end-safe py-2 ">
                                            <EthChart />
                                            <div className="relative w-12">
                                                 <img src="/images/ethereum.png" className="absolute right-40 bottom-9 h-12 w-12" />
                                            <p className="text-gray-400 text-[11px] absolute right-[135px] top-[-83px]">ETH</p>
                                            <p className="text-gray-300 text-[13px] absolute right-25 top-[-70px]">Ethereum</p>
                                            <p className="text-gray-300 text-[17px] font-bold absolute right-33 top-[-21px]">0.59089$</p>
                                            </div>
                                        </div>
                                        <div className="row-span-8 rounded-md text-white border border-gray-800 bg-[#0B1739] flex flex-col items-center-safe">Hi</div>
                                        <div className="row-span-8 rounded-md text-white border border-gray-800 bg-[#0B1739] flex flex-col items-center-safe">Hi</div>
                                        <div className="row-span-8 rounded-md text-white border border-gray-800 bg-[#0B1739] flex flex-col items-center-safe">Hi</div>
                                    </div>

                                </div>


                                <div className="col-span-2 border w-[734px] items-center rounded-md bg-[#0B1739]">
                                    <div className="grid grid-cols-3">
                                    </div>
                                </div>


                                {/*This the s3rd grid*/}

                            </div>
                            <div className="flex flex-col items-center pt-4">
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

                            <div className="flex flex-col items-center">
                                <h3 className="px-4 py-3 w-40 flex flex-col items-center border border-gray-400 rounded-md text-lg font-bold mb-3 text-white">Send Ether</h3>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-140 px-4 py-4 rounded-md bg-[#0B1739]">
                                    <div className=" pt-2">
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
                                                    disabled={!walletAddress}
                                                    className="w-full px-3 py-2 border border-gray-600 bg-[#1c1c1c] rounded-md focus:outline-none focus:text-white focus: text-white text-sm disabled:opacity-50"
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
                                                    disabled={!walletAddress}
                                                    className="w-full px-3 py-2 border border-gray-600 bg-[#1c1c1c] text-white rounded-md focus:bg-[#1c1c1c] text-sm disabled:opacity-50"
                                                />
                                            </div>

                                            <button
                                                onClick={sendTransaction}
                                                disabled={isLoading || !recipientAddress || !sendAmount || !walletAddress}
                                                className="mt-3 px-4 py-2 w-full border border-gray-700 disabled:bg-gray-800 text-white rounded-md font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                {isLoading ? "Sending..." :
                                                    !walletAddress ? "Connect Wallet to Send" : "Send Transaction"}
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
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConnectWallet;