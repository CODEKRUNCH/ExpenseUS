import { useState, useEffect } from "react";
import CryptoNewsBot from "../Components/CryptoNewsBot";

function TransferFunds() {
    const [walletAddress, setWalletAddress] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");
    const [sendAmount, setSendAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [txHash, setTxHash] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setWalletAddress(accounts[0]);
            } catch (err) {
                console.log("Connection Error:", err);
            }
        } else {
            alert("Please Install MetaMask!");
        }
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
        } catch (err) {
            console.error("Transaction Error:", err);
            alert("Transaction failed: " + err.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setWalletAddress(accounts.length > 0 ? accounts[0] : "");
            });
        }
        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 p-6">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-white mb-6">Transfer ETH</h1>
                
                <button
                    onClick={connectWallet}
                    className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
                </button>

                <div className="bg-gray-800 p-4 rounded space-y-4">
                    <div>
                        <label className="block text-white text-sm mb-2">Recipient Address</label>
                        <input
                            type="text"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            placeholder="0x..."
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-white text-sm mb-2">Amount (ETH)</label>
                        <input
                            type="number"
                            step="0.001"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            placeholder="0.1"
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
                        />
                    </div>
                    <button
                        onClick={sendTransaction}
                        disabled={isLoading || !recipientAddress || !sendAmount || !walletAddress}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Sending..." : "Send Transaction"}
                    </button>
                </div>

                {txHash && (
                    <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        <p className="text-sm">Transaction successful!</p>
                        <p className="text-xs break-all">TX: {txHash}</p>
                    </div>
                )}
            </div>
        <div className="bg-white">
            <CryptoNewsBot />
        </div>
        </div>
    );
}

export default TransferFunds;