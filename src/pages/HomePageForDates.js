import React from 'react';
import { Link } from 'react-router-dom';

const HomePageForDates = () => {
  const cardStyle = {
    width: '300px',
    height: '200px',
    margin: '20px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    textDecoration: 'none',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const captionStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5px 10px',
    borderRadius: '5px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Link to="/page1" style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p1.jpg" alt="Page 1" style={imgStyle} />
          <div style={captionStyle}>הוראות</div>
        </div>
      </Link>
      <Link to="/page2" style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p2.jpeg" alt="Page 2" style={imgStyle} />
          <div style={captionStyle}>התחל משחק</div>
        </div>
      </Link>
      <Link to="/page3" style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p3.jpeg" alt="Page 3" style={imgStyle} />
          <div style={captionStyle}>חזור לבית</div>
        </div>
      </Link>
    </div>
  );
};

export default HomePageForDates;
