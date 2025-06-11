import api from './axios';

export const createTransaction = async (
    amount,
    transactionType,
    category,
    paymentType,
    payedTo,
    fromWallet,
    dateAndTimePayed,
    note
) => {
    try {
        const response = await api.post('/transactioncreate/', {
            Amount: amount,
            TransactionType: transactionType,
            Category: category,
            PaymentType: paymentType,
            Payedto: payedTo,
            FromWalletName: fromWallet,
            DateandTimePayed: dateAndTimePayed, // ISO 8601 format: "YYYY-MM-DDTHH:MM:SSZ"
            Note:note,
        });
        return response.data; // e.g., { message: "Transaction created successfully" }
    } catch (error) {
        console.error("Transaction creation failed", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};