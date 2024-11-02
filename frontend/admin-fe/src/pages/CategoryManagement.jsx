import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDetailModal from '../components/category/CategoryDetailModal';
import CategoryFormModal from '../components/category/CategoryFormModal';
import ConfirmationModal from '../components/category/ConfirmationModal';
import ProductFormModal from '../components/products/ProductFormModal';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const CategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [categorys, setCategorys] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục đã chọn
  const columns = [
    { field: '_id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div className="space-x-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCategory(params.row);
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
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCategory(params.row);
              setIsAddingProduct(true);
            }}
          >
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
          </Button>
        </div>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  // Lấy danh sách sản phẩm từ API
  const fetchCategorys = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategorys(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchCategorys();
  }, []);

  // Thêm sản phẩm
  const addCategory = async (category) => {
    const token = localStorage.getItem('access_token');

    // Thêm category mới vào state
    setCategorys([...categorys, { ...category, id: categorys.length + 1 }]);

    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('image', category.image);

    try {
      const response = await fetch('http://localhost:3001/categories', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCategorys();
      const result = await response.json();
      console.log('Category saved:', result);
    } catch (error) {
      console.error('Error saving Category:', error);
    }
  };

  // Chỉnh sửa sản phẩm
  const editCategory = (updatedCategory) => {
    setCategorys(
      categorys.map((Category) =>
        Category.id === updatedCategory.id ? updatedCategory : Category
      )
    );
  };

  // Xóa sản phẩm
  const deleteCategory = async (categoryId) => {
    const token = localStorage.getItem('access_token');
    setCategorys(categorys.filter((category) => category.id !== categoryId));
    setIsDeleting(null);
    try {
      const response = await fetch(
        `http://localhost:3001/categories/${categoryId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCategorys();
      const result = await response.json();
      console.log('Category deleted:', result);
    } catch (error) {
      console.error('Error deleting Category:', error);
    }
  };

  const addProduct = async (product) => {
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
      console.log('Product saved:', result);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      <Box sx={{display: 'flex', justifyContent:'flex-end', marginBottom: 2}}>
      <Button
        onClick={() => setIsAdding(true)}
        variant="contained"
      >
        Add Category
      </Button>
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={categorys}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          onRowClick={(params) => {
            setSelectedCategory(params.row);
            setIsViewingDetail(true);
          }}
        />
      </Paper>

      {isViewingDetail && selectedCategory && (
        <CategoryDetailModal
          category={selectedCategory}
          onClose={() => setIsViewingDetail(false)}
        />
      )}

      {isEditing && selectedCategory && (
        <CategoryFormModal
          category={selectedCategory}
          onSave={editCategory}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isAdding && (
        <CategoryFormModal
          onSave={addCategory}
          onClose={() => setIsAdding(false)}
        />
      )}

      {isAddingProduct && (
        <ProductFormModal
          selectedCategory={selectedCategory}
          onSave={addProduct}
          onClose={() => setIsAddingProduct(false)}
        />
      )}

      {isDeleting && (
        <ConfirmationModal
          message="Are you sure you want to delete this Category?"
          onConfirm={() => deleteCategory(isDeleting)}
          onCancel={() => setIsDeleting(null)}
        />
      )}
    </div>
  );
};

export default CategoryManagement;
