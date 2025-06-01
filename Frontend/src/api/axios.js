import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // Adjust your base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach token (except for login/register)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        // Endpoints to exclude from token
        const skipTokenEndpoints = ['/login/', '/register/', '/password-reset/','/token/refresh/'];

        // Check if the URL matches any skip endpoints
        if (token && !skipTokenEndpoints.some(endpoint => config.url.endsWith(endpoint))) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration or unauthorized errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            if (refreshToken) {
                try {
                    // Attempt to refresh token
                    const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
                    const { access } = res.data;

                    localStorage.setItem(ACCESS_TOKEN, access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                    // Optionally logout the user here
                    localStorage.clear();
                    window.location.href = '/login';  // Redirect to login
                }
            } else {
                localStorage.clear();
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
