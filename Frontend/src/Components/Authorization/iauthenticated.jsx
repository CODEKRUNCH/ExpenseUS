// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../api/axios";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../api/constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        // Token expired, refresh
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        const res = await api.post("/token/refresh/", { refresh: refreshToken });
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        // Token valid
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Auth check error:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
