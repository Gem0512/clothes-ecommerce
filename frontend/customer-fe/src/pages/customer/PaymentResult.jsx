import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/customer/Header';
import { Box, Button, Typography } from '@mui/material';
import Footer from '../../components/customer/Footer';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Để điều hướng khi nhấn nút
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

  // Xử lý khi nhấn "Quay lại màn hình chính"
  const handleBackToHome = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

  // Xử lý khi nhấn "Tiếp tục mua hàng"
  const handleContinueShopping = () => {
    navigate('/cart'); // Điều hướng đến trang mua hàng
  };

  const { t, i18n } = useTranslation();
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box style={{ position: 'sticky', top: 0, backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 50 }}>
        <Header />
      </Box>

      {/* Nội dung chính */}
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '600px',
        margin: '20px auto',
        height: 570
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>{t('payment_result')}</h1>
          <div style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
            <p><strong>{t('status')}</strong> {paymentStatus}</p>
            <p><strong>{t('code_order')}</strong> {orderId}</p>
            <p><strong>{t('noti')}</strong> {message}</p>
          </div>

          {/* Buttons */}
         
        </div>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', width: "40%" }}>
      <Button 
        variant="outlined" 
        style={{
          color: "#6FCFB8", 
          padding: '10px 20px', 
          textTransform: 'none', 
          borderColor: "#6FCFB8" // Thêm viền cùng màu với chữ
        }} 
        onClick={handleBackToHome}>
        
        <KeyboardReturnIcon />
        <Typography sx={{ paddingLeft: 1, color: "#6FCFB8" }}>
        {t('return')}
        </Typography>
      </Button>

        <Button 
          variant="contained" 
          style={{ backgroundColor: '#6FCFB8', color: '#fff', padding: '10px 20px', textTransform: 'none' }} 
          onClick={handleContinueShopping}>
          <ShoppingCartIcon></ShoppingCartIcon>
          <Typography sx={{paddingLeft:1}}> {t('continue_order')}</Typography>
          
        </Button>
      </div>

      </Box>

      {/* Footer */}
      <Box style={{ marginTop: '40px' }}>
        <Footer />
      </Box>
    </div>
  );
};

export default PaymentResult;
