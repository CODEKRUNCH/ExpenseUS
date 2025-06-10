import api from "./axios";
export const TransactionRetrieve=async()=>
{
 try{
    const response = await api.get('/transactionlist/')
         const data = response.data.results ? response.data.results : response.data;

         const formattedData = data.map(txn => ({
            ...txn,
            DateandTimePayed: txn.DateandTimePayed.split('T')[0]
         }));
    return formattedData
 }
 catch(error)
 {
    console.log("Error Fetching Transactions",error)
    throw error;
 }
}