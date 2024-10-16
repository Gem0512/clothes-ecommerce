import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './i18n';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route chung cho trang login */}
        <Route path="/login" element={<Login />} />

        {/* Route dành cho admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Route dành cho khách hàng */}
        <Route path="/*" element={<CustomerRoutes />} />

        {/* Route không tồn tại */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
