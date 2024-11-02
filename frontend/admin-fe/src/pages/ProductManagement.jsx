import React, { useEffect, useState } from 'react';
import ProductDetailModal from '../components/products/ProductDetailModal';
import ConfirmationModal from '../components/products/ConfirmationModal';
import ProductFormModal from '../components/products/ProductFormModal';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Notification from '../components/notification/Notification'
const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Danh mục
  const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục đã chọn
  const columns = [
    { field: '_id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'rating', headerName: 'Rating', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="space-x-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(params.row);
              setIsEditing(true);
            }}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleting(params.row._id);
            }}
            sx={{ color: 'red' }}
          >
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };


  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const notifySuccess = (mes) => {
    setMessage(mes);
    setSeverity('success');
    setOpen(true);
  };

  const notifyError = (mes) => {
    setMessage(mes);
    setSeverity('error');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  };

  // Lấy danh sách danh mục từ API (hoặc hardcoded)
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories'); // API lấy danh mục
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh mục:', error);
    }
  };

  // Lấy danh sách sản phẩm theo danh mục
  const fetchProductsByCategory = async (categoryID) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/products/category/${categoryID}`
      );
      setProducts(response.data); // Cập nhật danh sách sản phẩm dựa theo danh mục
      console.log(response.data);
    } catch (error) {
      setProducts();
      console.error('Có lỗi xảy ra khi lấy sản phẩm theo danh mục:', error);
    }
  };

  useEffect(() => {
    console.log(products);
  }, [products]);
  // Gọi API khi component được mount
  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Lấy danh sách danh mục
  }, []);

  // Gọi API khi thay đổi danh mục
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    } else {
      fetchProducts(); // Nếu không chọn danh mục, lấy tất cả sản phẩm
    }
  }, [selectedCategory]);

  // Thêm sản phẩm
  const addProduct = async (product) => {
    // setProducts([...products, { ...product, id: products.length + 1 }]);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('sizes', JSON.stringify(product.sizes));
    formData.append('colors', JSON.stringify(product.colors));
    formData.append('price', product.price);
    formData.append('rating', product.rating);
    formData.append('categoryID', product.categoryID);

    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');

      }

      const result = await response.json();
      notifySuccess('Add product success');
      console.log('Product saved:', result);
    } catch (error) {
      console.error('Error saving product:', error);
      notifyError('An error occurred while adding the product.')
    }
  };

  // Chỉnh sửa sản phẩm
  const editProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Xóa sản phẩm
  const deleteProduct = async (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    setIsDeleting(null);
    try {
      const response = await fetch(
        `http://localhost:3001/products/${productId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchProducts();
      fetchCategories();
      const result = await response.json();
      console.log('Product deleted:', result);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Dropdown lọc danh mục */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="mb-4">
          {/* <label htmlFor="category-select" className="block mb-2">Filter by Category:</label> */}
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Box>
          <Button
            onClick={() => setIsAdding(true)}
            variant="contained"
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          onRowClick={(params) => {
            setSelectedProduct(params.row);
            setIsViewingDetail(true);
          }}
        />
      </Paper>

      {isViewingDetail && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setIsViewingDetail(false)}
        />
      )}

      {isEditing && selectedProduct && (
        <ProductFormModal
          product={selectedProduct}
          onSave={editProduct}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isAdding && (
        <ProductFormModal
          onSave={addProduct}
          onClose={() => setIsAdding(false)}
        />
      )}

      {isDeleting && (
        <ConfirmationModal
          message="Are you sure you want to delete this product?"
          onConfirm={() => deleteProduct(isDeleting)}
          onCancel={() => setIsDeleting(null)}
        />
      )}
      <Notification 
        open={open} 
        handleClose={handleClose} 
        message={message} 
        severity={severity} 
      />
    </div>
  );
};

export default ProductManagement;
