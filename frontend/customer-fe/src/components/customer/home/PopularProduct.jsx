import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  }
  // Thêm nhiều sản phẩm nếu cần
];

export default function PopularProduct({ title }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // Vị trí sản phẩm đầu tiên hiển thị

  const handleNext = () => {
    if (currentIndex + 4 < products.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="bg-white shadow-xl" style={{ borderRadius: 10 }}>
      <div className="mx-auto max-w-2xl px-0 py-8 sm:px-4 sm:py-8 lg:max-w-7xl lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>

        <div className=" mt-6" style={{display: 'flex'}}>
          {/* Nút Prev */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50}} >
            {currentIndex > 0 && (
            <button onClick={handlePrev}>
              <ArrowBackIosIcon />
            </button>
            )}
          </div>

          {/* Hiển thị sản phẩm */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
            {products.slice(currentIndex, currentIndex + 4).map((product) => (
              <div
                key={product.id}
                className="group relative"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-96">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nút Next */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60}} >
            {currentIndex + 4 < products.length && (
            <button onClick={handleNext} sx={{padding: 0, width: 40}}>
              <ArrowForwardIosIcon />
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
