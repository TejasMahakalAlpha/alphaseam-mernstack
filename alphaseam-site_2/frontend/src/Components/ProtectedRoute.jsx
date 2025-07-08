// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdmin'); // or use any auth logic
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
