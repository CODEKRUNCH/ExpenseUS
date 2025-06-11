import api from "./axios";

export const BudgetDelete = async (id) => {
  try {
    const response = await api.delete(`/budgetdelete/${id}/`);
    // If the response contains a "results" array (e.g., when paginated), use it; otherwise, use the raw response.data.
    return response.data || { message: "Deleted successfully" };
  } catch (error) {
    console.log("Error Fetching Transactions", error);
    throw error;
  }
};
