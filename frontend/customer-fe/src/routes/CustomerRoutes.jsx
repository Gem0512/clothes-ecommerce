import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from '../pages/customer/ProductList';
import CategoryProduct from '../pages/customer/CategoryProduct';
import Cart from '../pages/customer/Cart';
import ProductDetail from '../pages/customer/ProductDetail';
import Profile from '../pages/customer/Profile';
import Checkout from '../pages/customer/Checkout';
import Payment from '../pages/customer/Payment';
import PaymentResult from '../pages/customer/PaymentResult';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/category-list" element={<CategoryProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-result" element={<PaymentResult />} />
      {/* Thêm các route dành cho khách hàng tại đây */}
    </Routes>
  );
};

export default CustomerRoutes;
