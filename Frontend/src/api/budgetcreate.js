// services/authService.js
import api from './axios';

export const CreateBudget = async (Name,Amount,walletype,Category,Period) => {
    try {
        const response = await api.post('/budgetcreate/', {
            name: Name,
            amount:Amount,
            category: Category,
            wallet_type:walletype,
            period: Period,
        });
        return response.data; // { message: "User created successfully" }
    } catch (error) {
        console.error("Budget Creation failed", error.response.data);
        throw error.response.data;
    }
};