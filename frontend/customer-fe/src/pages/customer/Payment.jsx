import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [orderInfo, setOrderInfo] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    try {
      const orderId = new Date().getTime().toString(); // Tạo orderId ngẫu nhiên
      const response = await axios.post('https://7cb8-113-190-28-208.ngrok-free.app/momo/create-payment', {
        amount,
        orderId,
        orderInfo,
      });
      
      // Kiểm tra phản hồi từ API NestJS và lấy URL thanh toán
      if (response.data && response.data.payUrl) {
        setPaymentUrl(response.data.payUrl);
        window.location.href = response.data.payUrl; // Chuyển hướng đến MoMo để thanh toán
      }
    } catch (error) {
        console.error('MoMo API error:', error.response?.data || error.message);
        throw new Error(error.response?.data || error.message);
      }
      
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Thanh toán MoMo</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>Nhập số tiền: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Số tiền"
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Thông tin đơn hàng: </label>
        <input
          type="text"
          value={orderInfo}
          onChange={(e) => setOrderInfo(e.target.value)}
          placeholder="Thông tin đơn hàng"
        />
      </div>
      <button onClick={handlePayment} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Thanh toán với MoMo
      </button>

      {paymentUrl && (
        <div>
          <h3>Đang chuyển hướng đến MoMo để thanh toán...</h3>
        </div>
      )}
    </div>
  );
};

export default Payment;
