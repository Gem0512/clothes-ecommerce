import React, { useEffect, useState } from 'react'
import Header from '../../components/customer/Header'
import Slider from '../../components/customer/home/Slider'
import { Box, Breadcrumbs, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import ListCategory from '../../components/customer/home/ListCategory'
import ImageCategory from '../../components/customer/home/ImageCategory'
import PopularProduct from '../../components/customer/home/PopularProduct'
import ProductPopup from '../../components/customer/home/ProductPopup'
import SeasonSale from '../../components/customer/home/SeasonSale'
import { Link, useLocation, useParams } from 'react-router-dom'
import AppsIcon from '@mui/icons-material/Apps';
import TocIcon from '@mui/icons-material/Toc';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ListProduct from '../../components/customer/category/ListProduct'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import QuickView from '../../components/customer/category/QuickView'
import Footer from '../../components/customer/Footer'
import axios from "axios"
import { useTranslation } from 'react-i18next'
const optionShow =[
  {
    id: 0,
    count: 4
  },
  {
    id: 1,
    count: 8
  },
  {
    id: 2,
    count: 12
  }
]
const people = [
  {
    id: 1,
    name: 'Giá tăng dần',
    value: 'asc',
    avatar:
      '',
  },
  {
    id: 2,
    name: 'Giá giảm dần',
    value: 'desc',
    avatar:''
  }
]
export default function CategoryProduct() {

  const [selected, setSelected] = useState(people[0])
  const [selectedShow, setSelectedShow] = useState(optionShow[0])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('categoryId');

  
  console.log(selected); 
  const handleClick=(event) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const [view, setView] = React.useState('list');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const colors = ['red', 'blue', 'green', 'yellow'];
  const sizes = ['S', 'M', 'L', 'XL'];

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

  const [categorySelected, setCategorySelected] = useState([]);

  const getCategorySelected = async () => {
      try {
          const response = await axios.get(`http://localhost:3001/categories/${categoryId}`);
          setCategorySelected(response.data);
          console.log(response.data)
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };

  useEffect(() => {
    getCategorySelected();
  }, [categoryId]);

  useEffect(() => {
    getCategories();
  }, []);

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
      try {
          const response = await axios.get(`http://localhost:3001/products/category/${categoryId}?sortOrder=${selected.value}`);
          setProducts(response.data);
          console.log(response.data)
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId, selected]);
  const { t, i18n } = useTranslation();

  return (
    <div  className="bg-customBackground" style={{
      minHeight: '1000px'
    }}>
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
              {t('category')}
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                {categorySelected && categorySelected.name}
              </Link>
              <Typography sx={{ color: 'text.primary' }}>{t('products')}</Typography>
            </Breadcrumbs>
          </div>
        </Box>
    </Box>
    <Box style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
      }}>
        <Box style={{
            width: '70%',
        }}>
          <Box sx={{
            display: 'flex',
            width: '100%'
          }}>
            <Box sx={{width: '20%', marginRight: '1%'}}>
                <Box sx={{borderRadius: 2}}>
                <ListCategory category={category}></ListCategory>
                </Box>
                <div className="flex flex-col">
                  {/* Select Color */}
                  <div style={{ backgroundColor: 'white',marginTop: 10, borderRadius: 10, padding: 15}} className="shadow-xl">
                    <label className="block mb-2 text-sm font-medium text-gray-700">{t('select_color')}</label>
                    <div className="flex gap-2">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${selectedColor === color ? 'border-black' : 'border-gray-300'} hover:shadow-md`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Select Size */}
                  <div style={{ backgroundColor: 'white',marginTop: 10, borderRadius: 10, padding: 15}} className="shadow-xl">
                    <label className="block mb-2 text-sm font-medium text-gray-700">{t('select_size')}</label>
                    <div className="flex gap-2">
                      {sizes.map((size, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer border-2 transition-all ${selectedSize === size ? 'border-black' : 'border-gray-300'} hover:shadow-md hover:bg-gray-100`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </Box>
            <Box sx={{width: '79%'}}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
             <Typography 
              sx={{
                fontWeight: 'bold', 
                fontSize: 20, 
                marginBottom: 5, 
                textTransform: 'uppercase' 
              }}
            >
              {categorySelected && categorySelected.name}
            </Typography>

              </Box>
              <Box sx={{display: 'flex', height: 60, alignItems: 'center', justifyContent: 'space-between', padding:2, backgroundColor: 'white', borderRadius: 2}} className="shadow-xl">
                <Box sx={{display:'flex', alignItems: 'center',}}>
                <ToggleButtonGroup
                // orientation="vertical"
                value={view}
                // exclusive
                sx={{
                  height: 35,
                  marginRight: 2,
                  border: 'none', // Xóa border của ToggleButtonGroup
                  '& .MuiToggleButtonGroup-grouped': {
                    border: 'none', // Xóa border giữa các nút
                    padding: '5px', // Tuỳ chọn thêm padding nếu cần
                  },
                }}
                onChange={handleChange}
              >
                <ToggleButton value="list" aria-label="list">
                  <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="module" aria-label="module">
                  <ViewModuleIcon />
                </ToggleButton>
              </ToggleButtonGroup>
                  <Listbox value={selected} onChange={setSelected}>
                  <Label className="block text-sm font-medium leading-6 text-gray-900 mr-1">Sort by: </Label>
                    <div className="relative">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span className="ml-3 block truncate">{selected.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {people.map((person) => (
                          <ListboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              <img alt="" src={person.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                {person.name}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{marginRight: 2}}>10 items</Typography>
                  <Listbox value={selectedShow} onChange={setSelectedShow}>
                  <Label className="block text-sm font-medium leading-6 text-gray-900 mr-1">Show: </Label>
                    <div className="relative">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          {/* <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                          <span className="block truncate">{selectedShow.count}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {optionShow.map((person) => (
                          <ListboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              {/* <img alt="" src={person.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                              <span className=" block font-normal group-data-[selected]:font-semibold">
                                {person.count}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </Box>
              </Box>

              <Box className="shadow-xl">
                 <ListProduct
                 productsPerPage ={selectedShow.count}
                 products={products}
                 ></ListProduct>
              </Box>
              <QuickView></QuickView>
            </Box>
          </Box>
        </Box>
    </Box>
    <Box sx={{marginTop: 4}}>
      <Footer></Footer>
    </Box>
    </div>
  )
}
