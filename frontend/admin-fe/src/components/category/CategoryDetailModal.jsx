import React from 'react';

const CategoryDetailModal = ({ category, onClose }) => {
  console.log('>>>', category);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-screen overflow-y-auto flex">
        {/* Hiển thị ảnh sản phẩm */}
        <div className="flex-shrink-0 w-1/2 pr-4">
          <img
            src={category.image}
            alt={category.name}
            className="w-full max-h-[700px] object-cover rounded-lg"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <p>
            <strong>Description:</strong> {category.description}
          </p>
          {/* <p><strong>Price:</strong> ${category.price}</p>
          <p><strong>Rating:</strong> {category.rating} / 5</p> */}
          {/* 
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Sizes:</h3>
            <ul className="list-disc ml-5">
              {category && category.sizes.map((size) => (
                <li key={size.name} className={size.inStock ? 'text-green-500' : 'text-red-500'}>
                  {size.name} - {size.inStock ? 'In Stock' : 'Out of Stock'}
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div className="mt-4">
            <h3 className="text-lg font-semibold">Colors:</h3>
            <div className="flex space-x-2">
              {category && category.colors.map((color) => (
                <span
                  key={color.name}
                  className={`${color.class} w-6 h-6 rounded-full border`}
                  title={color.name}
                ></span>
              ))}
            </div>
          </div> */}

          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailModal;
