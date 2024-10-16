import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import PrivateRoute from './PrivateRoute';  // Route chỉ dành cho admin đã login

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      {/* Uncomment and update the following routes if needed */}
      {/* <Route path="/products" element={<PrivateRoute element={ManageProducts} />} />
      <Route path="/orders" element={<PrivateRoute element={ManageOrders} />} /> */}
      {/* Thêm các route admin khác tại đây */}
    </Routes>
  );
};

export default AdminRoutes;
