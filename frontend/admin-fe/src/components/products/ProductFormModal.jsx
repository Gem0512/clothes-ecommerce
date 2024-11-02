import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import axios from 'axios';
import Box from '@mui/material/Box';


const ProductFormModal = ({ selectedCategory, product, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    product || {
      name: '',
      description: '',
      image: '',
      sizes: [],
      colors: [],
      price: '',
      rating: '',
      categoryID: selectedCategory ? selectedCategory._id : '',
    }
  );

  const [imagePreview, setImagePreview] = useState(
    product ? product.image : ''
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    name: '',
    class: '',
    selectedClass: '',
  });

  const availableSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const [categories, setCategories] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục đã chọn

  // Lấy danh sách sản phẩm từ API
  const fetchCategorys = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchCategorys();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSizeChange = (e) => {
    const sizeName = e.target.value;
    const isInStock = e.target.checked;

    if (sizeName) {
      const updatedSizes = formData.sizes.filter(
        (sizes) => sizes.name !== sizeName
      );
      updatedSizes.push({ name: sizeName, inStock: isInStock });
      setFormData({ ...formData, sizes: updatedSizes });
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor({ ...selectedColor, class: color.hex });
  };

  const handleAddColor = () => {
    if (selectedColor.name && selectedColor.class) {
      const newColor = {
        name: selectedColor.name,
        class: selectedColor.class,
        selectedClass: 'ring-gray-400',
      };
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor],
      }));
      setSelectedColor({ name: '', class: '', selectedClass: '' });
      setShowColorPicker(false);
      console.log(newColor);
    }
  };

  const handleRemoveColor = (colorName) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color.name !== colorName),
    }));
  };

  const handleSave = () => {
    onSave(formData);
    console.log(formData);
    onClose();
  };

  return (
    <Box className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-9999">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column 1 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Column 2 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sizes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableSizes.map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.sizes.some((s) => s.name === size)}
                    onChange={handleSizeChange}
                    className="mr-2 accent-blue-500 hover:cursor-pointer" // Thay đổi ở đây
                  />
                  <span className="text-gray-700 font-medium">{size}</span>
                  <input
                    type="checkbox"
                    checked={
                      formData.sizes.find((s) => s.name === size)?.inStock ||
                      false
                    }
                    onChange={(e) =>
                      handleSizeChange({
                        target: { value: size, checked: e.target.checked },
                      })
                    }
                    className="ml-2 accent-blue-500 hover:cursor-pointer" // Thay đổi ở đây
                  />
                  <span className="ml-1">In Stock</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Colors
            </label>
            <div className="flex flex-wrap">
              {formData.colors.map((color) => (
                <div key={color.name} className="flex items-center mr-2 mb-2">
                  <div
                    className={`${color.class} w-8 h-8 border rounded-full`}
                    style={{ backgroundColor: color.class }}
                  ></div>
                  <span className="ml-2">{color.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color.name)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Color Name"
                value={selectedColor.name}
                onChange={(e) =>
                  setSelectedColor({ ...selectedColor, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {selectedColor.class ? (
                  <div
                    style={{ backgroundColor: selectedColor.class }}
                    className="h-8 w-full rounded-md"
                  ></div>
                ) : (
                  'Choose a color'
                )}
              </button>
              {showColorPicker && (
                <div className="absolute z-10">
                  <SketchPicker
                    color={selectedColor.class}
                    onChangeComplete={handleColorSelect}
                  />
                  <button
                    onClick={handleAddColor}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Color
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </Box>
  );
};

export default ProductFormModal;
