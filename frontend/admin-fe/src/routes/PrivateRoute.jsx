import React from 'react';
import { Navigate } from 'react-router-dom';

// Hàm kiểm tra authentication
const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    console.error('Token not found');
    return false;
  }
  // Kiểm tra token hoặc logic xác thực
  return true;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
