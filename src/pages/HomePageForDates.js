import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePageForDates.module.css';

const images = [
  { url: '/images/pick1.jpeg', title: 'Page 1', link: '/page1' },
  { url: '/images/pick2.jpeg', title: 'Page 2', link: '/page2' },
  { url: '/images/pick3.jpeg', title: 'Page 3', link: '/page3' },
  { url: '/images/pick4.jpeg', title: 'Page 4', link: '/page4' },
  // Add more images and links as needed
];

const MenuGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <div
          key={index}
          className="gallery-item"
          onClick={() => navigate(image.link)}
        >
          <img src={image.url} alt={image.title} />
          <div className="gallery-title">{image.title}</div>
        </div>
      ))}
    </div>
  );
};

export default MenuGallery;
