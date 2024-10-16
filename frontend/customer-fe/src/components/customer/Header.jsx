'use client'

import { useEffect, useState } from 'react'
import "../../index.css"
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { Badge, Box, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next'
import ReactSelect from 'react-select'
import "./Header.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#F9FAFC'
  }),
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(5);
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState([]);

  const handleClickCategory = (categoryId) => {
    navigate(`/category-list?categoryId=${categoryId}`);
    window.scrollTo(0, 0); 
  };
  
  const handleClickHome = () => {
    navigate('/');
  };

  const handleChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
  };

  const options = [
    {
      value: 'en',
      label: (
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="English" style={{ width: '20px' }} />
        </div>
      ),
    },
    {
      value: 'vi',
      label: (
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Tiếng Việt" style={{ width: '20px' }} />
        </div>
      ),
    },
  ];

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
      setCartCount(response.data.items.length)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart(); // Gọi hàm getCart khi component được mount
  }, []);

  return (
    <header className="bg-customBackground" style={{ borderBottom: '1px solid #ccc' }}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo and Home Link */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5" onClick={handleClickHome}>
            <span className="sr-only">Your Company</span>
            <img src="https://theme644-clothes-free.myshopify.com/cdn/shop/files/logo_100x30_crop_center.png?v=1614290115" alt="Logo" style={{ width: '100px' }} />
          </a>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        {/* Desktop Navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-20">
          <a href="#" className="text-sm font-semibold leading-6 home" onClick={handleClickHome}>
            HOME
          </a>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 category">
              CATEGORY
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {category && category.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    onClick={() => handleClickCategory(item._id)}
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      {/* Render image or default icon */}
                      <img src={item.image || 'default-icon-url'} alt={item.name} className="h-11 w-11" />
                    </div>
                    <div className="flex-auto" >
                      <a href={item.href || '#'} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <a href="#" className="text-sm font-semibold leading-6 sale">
            SALE
          </a>
        </PopoverGroup>
        {/* Right Side Icons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReactSelect
              options={options}
              defaultValue={options.find(option => option.value === i18n.language)}
              onChange={handleChange}
              isSearchable={false}
              styles={customStyles}
            />
          </div>
          <IconButton aria-label="cart" color="primary" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartCount} color="secondary" overlap="circular">
              <ShoppingCartIcon sx={{ color: '#6FCFB8', fontSize: 25 }} />
            </Badge>
          </IconButton>
          <Box sx={{ marginLeft: 2 }}>
            <a href="#" onClick={() => navigate('/profile')}>
              <AccountCircleIcon fontSize="large" />
            </a>
          </Box>
        </div>
      </nav>
      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5" onClick={handleClickHome}>
              <span className="sr-only">Your Company</span>
              <img src="https://theme644-clothes-free.myshopify.com/cdn/shop/files/logo_100x30_crop_center.png?v=1614290115" alt="Logo" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          {/* Mobile Menu Links */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                  onClick={handleClickHome}
                >
                  HOME
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                  onClick={handleClickCategory}
                >
                  CATEGORY
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                >
                  SALE
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                >
                  LOG OUT
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
