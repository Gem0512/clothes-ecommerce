import { Avatar, Box, Button, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import QuickView from './QuickView';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ColorDot({ color }) {
  return (
    <Box
      sx={{
        width: 15,
        height: 15,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'inline-block',
        marginRight: 0.5
      }}
    />
  );
}

const colors = ['#ccc', 'black', '#0000FF'];

export default function ListProduct({ productsPerPage, products }) {
  const [open, setOpen] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]); // Lưu trạng thái sản phẩm đã yêu thích
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const [productDetail, setProductDetail] =useState();

  const handleOpen = (product) => {
    setOpen(true);
    setProductDetail(product);
    console.log(product)
  };
  const handleClose = () => setOpen(false);

  const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));

  const handleSelectPage = (event) => {
    const selectedPage = parseInt(event.target.value);
    setCurrentPage(selectedPage);
  };

  // Hàm xử lý yêu thích
  const toggleFavorite = (productId) => {
    setFavoriteProducts((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId); // Bỏ yêu thích
      } else {
        return [...prevFavorites, productId]; // Thêm yêu thích
      }
    });
  };
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg mt-4 p-3">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-4">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="group relative bg-white border rounded-lg mt-5">
              <div onClick={() => { navigate(`/product/${product.id}`); }} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition ease-in-out duration-300">
                <img
                  src={product.image}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 flex justify-between pr-2 pl-2">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href} className="hover:underline">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <div>
                    {colors.map((color, index) => (
                      <ColorDot key={index} color={color} />
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
              <div className="flex justify-between pr-2 pl-2 mt-4">
                <Button
                  variant="text"
                  sx={{
                    border: 'none',
                    bgcolor: 'white',
                    padding: 0,
                    color: '#ccc',
                    '&:hover': {
                      color: '#6FCFB8',
                    },
                    textTransform: 'none',
                  }}
                  onClick={handleOpen}
                >
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                  Add Product
                </Button>
                <Box sx={{ display: 'flex' }}>
                  <IconButton
                    sx={{
                      color: favoriteProducts.includes(product.id) ? '#FF8C9E' : 'gray',
                      '&:hover': {
                        color: favoriteProducts.includes(product.id) ? '#FF8C9E' : 'darkgray',
                      },
                    }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favoriteProducts.includes(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <IconButton onClick={()=>{handleOpen(product)}} sx={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
                    <ZoomInIcon></ZoomInIcon>
                  </IconButton>
                </Box>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-teal-500 hover:text-white rounded-md disabled:opacity-50 transition ease-in-out duration-300"
          >
            Previous
          </button>
          <select
            value={currentPage}
            onChange={handleSelectPage}
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Page {index + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-teal-500 hover:text-white rounded-md disabled:opacity-50 transition ease-in-out duration-300"
          >
            Next
          </button>
        </div>
      </div>
      {
        productDetail && <QuickView openView={open} onCloseView={handleClose} productDetail={productDetail}></QuickView>
      }
      {/* <ToastContainer /> */}
    </div>
  );
}
