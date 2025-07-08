import React from 'react';
import { Navigate } from 'react-router-dom';

// This function checks for token in localStorage
const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

// ProtectedRoute component wraps around admin pages
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
