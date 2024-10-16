import React, { useEffect, useState } from 'react'
import Header from '../../components/customer/Header'
import Slider from '../../components/customer/home/Slider'
import { Box, Paper, Typography } from '@mui/material'
import ListCategory from '../../components/customer/home/ListCategory'
import ImageCategory from '../../components/customer/home/ImageCategory'
import PopularProduct from '../../components/customer/home/PopularProduct'
import ProductPopup from '../../components/customer/home/ProductPopup'
import SeasonSale from '../../components/customer/home/SeasonSale'
import { Button } from '@headlessui/react'
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Footer from '../../components/customer/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]
export default function ProductList() {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra vị trí cuộn để hiện/ẩn nút
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  useEffect(() => {
    // Lắng nghe sự kiện cuộn của trang
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup sự kiện cuộn khi component bị huỷ
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const navigate =useNavigate()
  const handleOpenCart =()=>{
    navigate("/cart")
  }

  const [category, setCategory] = useState([]);

  const getCategories = async () => {
      try {
          const response = await axios.get('http://localhost:3001/categories');
          setCategory(response.data);
          console.log(response.data)
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div  className="bg-customBackground">
    <Box  sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          boxShadow: 2,
          zIndex: 5, // Ensure Header has lower z-index
        }}>
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
        <Box style={{
            display: 'flex',
            // margin: 30,
        }}>
            <Box style={{
                margin: 10,
                width: "80%"
            }}>
                <Slider></Slider>
            </Box>
            <Box style={{
                margin: 10
            }}>
                <img
                src="https://images.unsplash.com/photo-1549388604-817d15aa0110"
                alt="Ảnh"
                loading="lazy"
                className="h-[300px]"
                />
                <Box style={{
                  backgroundColor: '#6FCFB8',
                  marginTop: 20,
                  height: 180,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center'
                }} className="flex justify-center items-center h-screen">
                  <Box>
                  <Typography variant="h4" gutterBottom>LAST CHANCE</Typography>
                  <Typography>UP TO 60%OFF</Typography>
                  </Box>
                </Box>
            </Box>
        </Box>
        </Box>
        
      </Box>
     
      <Box style={{
          display: 'flex',
          justifyContent: 'center'  ,
          margin: 10,
          borderRadius: 2
        }}>
          <Box style={{
            width: '70%',
            // margin: 30,
            display: 'flex',
            justifyContent: 'center',
            height: 50,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 2
          }} className="shadow-xl">
            <Typography>CATEGORY</Typography>
          </Box>
        </Box>
      <Box style={{
          display: 'flex',
          justifyContent: 'center'     
        }}>
          <Box style={{
            width: '70%',
            // margin: 30,
            display: 'flex',
          }}>
            <Box style={{
                margin: 10,
                width: '30%'
              }} >
              <ListCategory category={category}></ListCategory>
            </Box>
            <Box sx={{margin: 1}}>
              <ImageCategory category ={category}></ImageCategory>
            </Box>
          </Box>
        </Box>

        <Box style={{
          display: 'flex',
          justifyContent: 'center'     
        }}>
          <Box style={{
            width: '70%',
            // margin: 10,
            // display: 'flex',
          }}>
           <Box sx={{
            margin: 1
           }}>
           <PopularProduct title={"Popular product"}></PopularProduct>
           </Box>
           <Box  sx={{
            marginTop: 2,
            marginLeft:1,
            marginRight: 1,
           }}>
              <PopularProduct title={"Season product"}></PopularProduct>
           </Box>
          </Box>
        </Box>

        {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          style={{
            position: 'fixed',
            bottom: '110px',
            right: '40px',
            padding: '15px',
            borderRadius: '50%',
            backgroundColor: '#6FCFB8',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000, // Đảm bảo nút nổi trên các phần tử khác
          }}
        >
          <KeyboardControlKeyIcon></KeyboardControlKeyIcon>
        </Button>
      )}


  
          <Button
          onClick={handleOpenCart}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            padding: '15px',
            borderRadius: '50%',
            backgroundColor: '#6FCFB8',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000, // Đảm bảo nút nổi trên các phần tử khác
          }}
        >
          <ShoppingCartIcon></ShoppingCartIcon>
        </Button>
        
        <Box sx={{marginTop: 4}}>
          <Footer></Footer>
        </Box>
    </div>
  )
}
