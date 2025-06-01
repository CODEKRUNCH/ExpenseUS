// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authorization/iauthenticated";
import Spinner from "./SpinnerLoader";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // Or a nicer loader/spinner
  }

  return isAuthenticated ? children : <Navigate to="/login/" replace />;
}

export default ProtectedRoute;
