import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import DashboardLayoutBasic from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import CategoryManagement from './pages/CategoryManagement';
import OrderManagement from './pages/OrderManagement';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <ReactNotifications />
      <DashboardLayoutBasic>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/products"
            element={<PrivateRoute element={<ProductManagement />} />}
          />
          <Route
            path="/categories"
            element={<PrivateRoute element={<CategoryManagement />} />}
          />
          <Route
            path="/orders"
            element={<PrivateRoute element={<OrderManagement />} />}
          />
          <Route
            path="/users"
            element={<PrivateRoute element={<UserManagement />} />}
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayoutBasic>
    </Router>
  );
}

export default App;
