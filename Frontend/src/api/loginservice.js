import api from "./axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"; // if you defined them

const loginUser = async (email, password) => {
    
    try {
        const response = await api.post('/login/', {
            "email": email,
            "password": password,
        
        });
          localStorage.clear();
        const { tokens, user } = response.data;
        const {access,refresh}=tokens;
        // Store tokens using consistent keys
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);

        return user;
    }
    catch (error) {
        console.error("Login failed", error?.response?.data || error.message);
        throw error?.response?.data || { message: "Login failed" };
    }
};

export default loginUser;
