import React, { useEffect, useState } from 'react';
import ProductDetailModal from '../components/products/ProductDetailModal';
import ConfirmationModal from '../components/products/ConfirmationModal';
import ProductFormModal from '../components/products/ProductFormModal';
import axios from 'axios';

const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [isAdding, setIsAdding] = useState(false);  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Danh mục
  const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục đã chọn

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
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh mục:', error);
    }
  };

  // Lấy danh sách sản phẩm theo danh mục
  const fetchProductsByCategory = async (categoryID) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/category/${categoryID}`);
      setProducts(response.data); // Cập nhật danh sách sản phẩm dựa theo danh mục
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy sản phẩm theo danh mục:', error);
    }
  };

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
    setProducts([...products, { ...product, id: products.length + 1 }]);
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

  // Chỉnh sửa sản phẩm
  const editProduct = (updatedProduct) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
  };

  // Xóa sản phẩm
  const deleteProduct = async (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    setIsDeleting(null);
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'DELETE',
      });

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
      <div className="mb-4">
        <label htmlFor="category-select" className="block mb-2">Filter by Category:</label>
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

      <button
        onClick={() => setIsAdding(true)} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add New Product
      </button>

      <table className="table-auto w-full text-left bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedProduct(product);
                setIsViewingDetail(true);
              }}
            >
              <td className="px-4 py-2">{product._id}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.rating} / 5</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                    setIsEditing(true);
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleting(product._id);
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default ProductManagement;
