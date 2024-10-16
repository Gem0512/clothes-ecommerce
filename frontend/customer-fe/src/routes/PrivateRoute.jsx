import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Giả sử có hàm kiểm tra authentication
const isAuthenticated = () => {
  // Kiểm tra token hoặc logic xác thực
  return true; // Thay đổi cho phù hợp với thực tế
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
