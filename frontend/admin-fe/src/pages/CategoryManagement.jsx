import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDetailModal from '../components/category/CategoryDetailModal';
import CategoryFormModal from '../components/category/CategoryFormModal';
import ConfirmationModal from '../components/category/ConfirmationModal';
import ProductFormModal from '../components/products/ProductFormModal';

const CategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [isAdding, setIsAdding] = useState(false);  
  const [isAddingProduct, setIsAddingProduct] = useState(false);  
  const [categorys, setCategorys] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục đã chọn

  // Lấy danh sách sản phẩm từ API
  const fetchCategorys = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategorys(response.data);
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
          'Authorization': `Bearer ${token}` // Thêm token vào headers
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCategorys()
      const result = await response.json();
      console.log('Category saved:', result);
    } catch (error) {
      console.error('Error saving Category:', error);
    }
  };
  

  // Chỉnh sửa sản phẩm
  const editCategory = (updatedCategory) => {
    setCategorys(categorys.map((Category) => (Category.id === updatedCategory.id ? updatedCategory : Category)));
  };

  // Xóa sản phẩm
  const deleteCategory = async (categoryId) => {
    const token = localStorage.getItem('access_token');
    setCategorys(categorys.filter((category) => category.id !== categoryId));
    setIsDeleting(null);
    try {
      const response = await fetch(`http://localhost:3001/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Thêm token vào headers
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCategorys()
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

      <button
        onClick={() => setIsAdding(true)} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add New Category
      </button>

      <table className="table-auto w-full text-left bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categorys.map((category) => (
            <tr
              key={category._id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedCategory(category);
                setIsViewingDetail(true);
              }}
            >
              <td className="px-4 py-2">{category._id}</td>
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">${category.description}</td>
              <td className="px-6 py-2 flex justify-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category);
                    setIsEditing(true);
                  }}
                  className="flex items-center justify-center px-3 py-1.5 bg-blue-500 text-white text-base rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  <span className="mr-2">✏️</span> Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleting(category._id);
                  }}
                  className="flex items-center justify-center px-3 py-1.5 bg-red-500 text-white text-base rounded-lg hover:bg-red-600 transition duration-200"
                >
                  <span className="mr-2">🗑️</span> Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category);
                    setIsAddingProduct(true);
                  }}
                  className="flex items-center justify-center px-3 py-1.5 bg-green-500 text-white text-base rounded-lg hover:bg-green-600 transition duration-200"
                >
                  <span className="mr-2">➕</span> Product
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

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
