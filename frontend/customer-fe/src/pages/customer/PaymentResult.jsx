import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Lấy query params từ URL
    const query = new URLSearchParams(location.search);
    const resultCode = query.get('resultCode');
    const orderId = query.get('orderId');
    const message = query.get('message');

    // Kiểm tra kết quả thanh toán từ MoMo
    if (resultCode === '0') {
      setPaymentStatus('Thành công');
    } else {
      setPaymentStatus('Thất bại');
    }

    setOrderId(orderId);
    setMessage(message);
  }, [location.search]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kết quả thanh toán MoMo</h1>
      <div>
        <p>Trạng thái: {paymentStatus}</p>
        <p>Mã đơn hàng: {orderId}</p>
        <p>Thông báo: {message}</p>
      </div>
    </div>
  );
};

export default PaymentResult;
