import api from "./axios";
export const TransactionRetrieve=async()=>
{
 try{
    const response = await api.get('/transactionlist/')
      const formattedData = response.data.map(txn => ({
      ...txn,
      DateandTimePayed: txn.DateandTimePayed.split('T')[0]  // keep only date part
    }));
    return formattedData
 }
 catch(error)
 {
    console.log("Error Fetching Transactions",error)
    throw error;
 }
}