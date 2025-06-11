import api from "./axios";

export const BudgetRetrieve = async () => {
  try {
    const response = await api.get("/budgetlist/");
    // If the response contains a "results" array (e.g., when paginated), use it; otherwise, use the raw response.data.
    const data = response.data.results ? response.data.results : response.data;
    return data;
  } catch (error) {
    console.log("Error Fetching Transactions", error);
    throw error;
  }
};
