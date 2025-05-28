// services/authService.js
import api from './axios';

export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await api.post('/register/', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        });
        return response.data; // { message: "User created successfully" }
    } catch (error) {
        console.error("Registration failed", error.response.data);
        throw error.response.data;
    }
};