import React, { useState } from 'react';
import '../App.css'; // Import the updated CSS file

const images = [
  {
    url: '/images/pick1.jpeg',
    title: 'Image 1',
  },
  {
    url: '/images/pick2.jpeg',
    title: 'Image 2',
  },
  {
    url: '/images/pick3.jpeg',
    title: 'Image 3',
  },
  {
    url: '/images/pick4.jpeg',
    title: 'Image 4',
  },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="gallery-container">
      <div className="gallery">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            style={{
              transform: `rotate(${(360 / images.length) * index}deg) translateZ(300px)`,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
          >
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
      <button className="gallery-button prev" onClick={handlePrev}>Prev</button>
      <button className="gallery-button next" onClick={handleNext}>Next</button>
    </div>
  );
};

export default Gallery;
