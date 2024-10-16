import React, { useState } from 'react';

export default function ProductPopup() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = {
    shirt: {
      name: 'Fashionable Shirt',
      price: '$50',
      img: 'https://images.unsplash.com/photo-1550642160-0b8c5d4e6f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hbGV8ZW58fHwxNjc5NDcwMzA0&ixlib=rb-1.2.1&q=80&w=400',
    },
    pants: {
      name: 'Stylish Jeans',
      price: '$70',
      img: 'https://images.unsplash.com/photo-1530869467712-b508539fe559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHNhbHxlbnwwfHx8fDE2Nzk0NzAyMzI&ixlib=rb-1.2.1&q=80&w=400',
    },
  };

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div className="relative">
      {/* Hình ảnh người mặc đồ */}
      <img
        src="https://images.unsplash.com/photo-1594359133322-c07d1b4e3481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hbGUifGVufDB8fHx8MTY3OTQ3MDIwNg&ixlib=rb-1.2.1&q=80&w=800"
        alt="Person wearing clothes"
        className="w-full h-auto"
      />

      {/* Vùng tương tác cho áo */}
      <div
        onMouseEnter={() => handleMouseEnter(products.shirt)}
        onMouseLeave={handleMouseLeave}
        className="absolute top-20 left-1/4 w-40 h-48 bg-transparent cursor-pointer border-2 border-transparent"
        style={{ top: '25%', left: '20%' }} // Tùy chỉnh vị trí cho vùng áo
      ></div>

      {/* Vùng tương tác cho quần */}
      <div
        onMouseEnter={() => handleMouseEnter(products.pants)}
        onMouseLeave={handleMouseLeave}
        className="absolute top-64 left-1/4 w-40 h-48 bg-transparent cursor-pointer border-2 border-transparent"
        style={{ top: '60%', left: '20%' }} // Tùy chỉnh vị trí cho vùng quần
      ></div>

      {/* Popup sản phẩm */}
      {hoveredProduct && (
        <div className="absolute bg-white p-4 shadow-lg border rounded-lg top-16 left-64 z-10">
          <img src={hoveredProduct.img} alt={hoveredProduct.name} className="w-24 h-24 object-cover" />
          <h3 className="text-lg font-bold">{hoveredProduct.name}</h3>
          <p className="text-sm">{hoveredProduct.price}</p>
        </div>
      )}
    </div>
  );
}
