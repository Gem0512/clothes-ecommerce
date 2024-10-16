import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Sidebar đã tạo từ trước

import ProductManagement from "./pages/ProductManagement";
import CategoryManagement from "./pages/CategoryManagement";
import OrderManagement from "./pages/OrderManagement";
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";

// Component Layout chứa Sidebar và nội dung các trang chính
function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {location.pathname !== "/login" && <Sidebar />}
      <div className="flex-1 p-6 bg-white overflow-auto">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Route login tách biệt, không có Sidebar */}
        <Route path="/login" element={<Login />} />

        {/* Các route cần Sidebar */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute element={<Layout>
              <Dashboard />
            </Layout>} />
            
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute element={<Layout>
              <ProductManagement />
            </Layout>} />
            
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute element={<Layout>
              <CategoryManagement />
            </Layout>} />
            
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <OrderManagement />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute element={
            <Layout>
              <UserManagement />
            </Layout>} />
            
          }
        />


        {/* Chuyển hướng từ root "/" sang dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
