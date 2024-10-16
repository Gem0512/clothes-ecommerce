import React, { useState } from 'react';

const CategoryFormModal = ({ category, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    category || {
      name: '',
      description: '',
      image: '',
    }
  );
  const [imagePreview, setImagePreview] = useState(category ? category.image : '');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };


  const handleSave = () => {
    onSave(formData);
    console.log(formData)
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{category ? 'Edit category' : 'Add New category'}</h2>

        <div className="">
          {/* Column 1 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Column 2 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />
            )}
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
    </div>
  );
};

export default CategoryFormModal;
