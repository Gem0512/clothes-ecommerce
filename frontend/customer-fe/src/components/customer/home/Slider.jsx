import React, { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      text: 'Content for Slide 1',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      text: 'Content for Slide 2',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
      text: 'Content for Slide 3',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-[500px] relative"
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
            {/* Moving Content */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
              <h2 className="text-white text-3xl font-bold">{slide.text}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        <NavigateNextIcon />
      </button>
    </div>
  );
};

export default Slider;
