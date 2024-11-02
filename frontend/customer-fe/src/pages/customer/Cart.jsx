import React, { useEffect, useState } from 'react'
import Header from '../../components/customer/Header'
import Slider from '../../components/customer/home/Slider'
import { Box, Breadcrumbs, Button, Checkbox, Divider, IconButton, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import ListCategory from '../../components/customer/home/ListCategory'
import ImageCategory from '../../components/customer/home/ImageCategory'
import PopularProduct from '../../components/customer/home/PopularProduct'
import ProductPopup from '../../components/customer/home/ProductPopup'
import SeasonSale from '../../components/customer/home/SeasonSale'
import { Link, useNavigate } from 'react-router-dom'
import AppsIcon from '@mui/icons-material/Apps';
import TocIcon from '@mui/icons-material/Toc';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ListProduct from '../../components/customer/category/ListProduct'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import QuickView from '../../components/customer/category/QuickView'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import './Cart.css'
import Footer from '../../components/customer/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useTranslation } from 'react-i18next'

export default function Cart() {
  const navigate = useNavigate()
    const handleClick=(event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
      }
      const [quantity, setQuantity] = useState(1)
      const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    const accessToken = localStorage.getItem('access_token'); // Lấy access_token từ localStorage
    let userId;

    // Giải mã token và lấy userId
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        userId = decoded.userId; // Thay đổi này tùy theo cấu trúc của token của bạn
      } catch (error) {
        console.error('Token is invalid:', error);
        setLoading(false);
        return; // Kết thúc hàm nếu token không hợp lệ
      }
    } else {
      console.error('No access token found');
      setLoading(false);
      return; // Kết thúc hàm nếu không tìm thấy access token
    }

    // Gửi yêu cầu lấy giỏ hàng
    try {
      const response = await axios.get(`http://localhost:3001/cart/${userId}`);
      setCartItems(response.data); // Lưu trữ giỏ hàng vào state
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart(); // Gọi hàm getCart khi component được mount
  }, []);

  const removeFromCart = async ( productId) => {
    console.log("aaaa")
    const accessToken = localStorage.getItem('access_token'); // Lấy access_token từ localStorage
    let userId;

    // Giải mã token và lấy userId
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        userId = decoded.userId; 
      } catch (error) {
        console.error('Token is invalid:', error);
        setLoading(false);
        return;
      }
    } else {
      console.error('No access token found');
      setLoading(false);
      return; 
    }
  
    try {
      const response = await axios.delete(`http://localhost:3001/cart/remove/${userId}/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      });
      
      console.log('Item removed from cart:', response.data);
      getCart()
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [selectedTotal, setSelectedTotal] = useState(0);
  // Xử lý khi click vào checkbox
  const handleCheckboxChange = (product) => {
    // Tính toán tổng trước khi cập nhật trạng thái
    let newTotal = selectedTotal;
  
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        // Nếu sản phẩm đã có trong danh sách, xóa nó và giảm tổng tiền
        newTotal -= product.price*product.quantity;
        return prevSelectedProducts.filter((p) => p !== product);
      } else {
        // Nếu sản phẩm chưa có, thêm nó và cộng tổng tiền
        newTotal += product.price*product.quantity;
        return [...prevSelectedProducts, product];
      }
    });
  
    // Sau khi xử lý danh sách selectedProducts, cập nhật selectedTotal
    setSelectedTotal(newTotal);
    console.log(selectedProducts)

  };
  

  const { t, i18n } = useTranslation();

  return (
    <div  className="bg-customBackground" style={{ }}>
    <Box className="sticky top-0 bg-white shadow-lg z-50">
      <Header></Header>
    </Box>
    <Box style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
      }}>
        <Box style={{
            width: '70%',
        }}>
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
              {t('cart_title')}
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                {t('items')}
              </Link>
              {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
            </Breadcrumbs>
          </div>
            <Box sx={{
                fontWeight: 'bold',
                marginTop: 5,
                marginBottom: 2
            }}>
                <Typography  variant="h4">{t('cart')}</Typography>
            </Box>
            
            <Box sx={{display: 'flex', justifyContent: 'center', height: 'auto', marginBottom: 2}}>
                <Box sx={{width: '60%', marginRight: '5%'}}>
                <Divider />
                <Box className="overflow-y-auto h-[700px] custom-scrollbar" sx={{padding: 2}}>
                {cartItems && cartItems?.items?.map((product) => (
                    <Box key={product.id} sx={{
                      display: 'flex',
                      marginTop: 2,
                      backgroundColor: 'white',
                      padding: 2,
                      borderRadius: 1
                    }}>
                        {/* Checkbox để chọn sản phẩm */}
                      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                        <Checkbox
                          type="checkbox"
                          checked={selectedProducts.includes(product)}
                          onChange={() => handleCheckboxChange(product)}
                        />
                      </Box>
                      {/* Hình ảnh sản phẩm */}
                      <img
                        alt={product.image}
                        src={product.image}
                        className="group-hover:scale-105"
                        style={{ height: 300, width: 200, borderRadius: 1 }}
                      />

                      <Box sx={{ width: '100%', margin: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 2 }}>
                          <Box>
                            <Typography>{product.name}</Typography>
                            <Typography sx={{ color: '#ccc' }}>
                              {typeof product.color === 'string' ? JSON.parse(product.color).name : product.color.name } | 
                              {typeof product.size === 'string' ? JSON.parse(product.size).name : product.size.name}
                            </Typography>

                            <Typography>{product.price}</Typography>
                          </Box>

                          {/* Input cho số lượng */}
                          <div className="">
                            <input
                              type="number"
                              id="quantity"
                              value={product.quantity}
                              min="1"
                              onChange={(e) => setQuantity(Number(e.target.value))}
                              style={{ width: '70px' }}
                              className="block rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </div>

                          {/* Nút xoá sản phẩm */}
                          <Box>
                            <IconButton onClick={() => { removeFromCart(product.productId) }}>
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Box>



                        {/* Tình trạng sản phẩm */}
                        <Box sx={{ marginTop: 22 }}>
                          <DoneIcon sx={{ color: '#6FCFB8', marginRight: 1 }} size='small' />
                          {t('in_stock')}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                </Box>
                <Box sx={{width: '35%', backgroundColor:"white", borderRadius: 2, height: 300, padding : 4, }} className="shadow-xl">
                    <Typography sx={{ fontWeight: 'bold', fontSize: 22, marginBottom: 2}}>{t('oder_summary')}</Typography>
                    <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2}}>
                        <Typography>{t('all_product')}</Typography>
                        <Typography>{cartItems?.totalPrice}</Typography>
                    </Box>
                    <Divider></Divider>
                    {/* <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2}}>
                        <Typography>Shipping estimat</Typography>
                        <Typography>$5.00</Typography>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2}}>
                        <Typography>Tax estimate</Typography>
                        <Typography>$8.32</Typography>
                    </Box> */}
                    <Divider></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2, marginBottom: 3}}>
                        <Typography sx={{ fontSize: 18}}>{t('selected_products')}</Typography>
                        <Typography  sx={{ fontSize: 18}}>{selectedTotal}</Typography>
                    </Box>
                    <Button sx={{width: '100%'}} variant="contained" 
                    onClick={()=>{
                      navigate('/checkout', {
                        state: {
                          selectedProducts,
                          selectedTotal,
                        },
                      });}}
                      disabled={selectedTotal === 0} 
                      >{t('check_out')}</Button>
                    
                </Box>
            </Box>
            <Divider></Divider>
            <Box sx={{marginTop: 2, borderRadius: 2}} className="shadow-xl">
                <PopularProduct title={"You may also like…"}></PopularProduct>
            </Box>
            
        </Box>
        
    </Box>
    <Box sx={{marginTop: 4}}>
      <Footer></Footer>
    </Box>
    </div>
  )
}
