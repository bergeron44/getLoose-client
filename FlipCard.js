import React, { useState, useEffect } from 'react';
import './FlipCard.css';
import RightComp from './RightComp';
import WrongComp from './WrongComp';

const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);
  const [currentPage, setCurrentPage] = useState('front');

  const handleButtonClick = (page) => {
    setFlipped(true);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (flipped) {
      const flipBackTimeout = setTimeout(() => {
        setFlipped(false);
        setCurrentPage('front');
      }, 3000); // 5 seconds in milliseconds

      return () => clearTimeout(flipBackTimeout);
    }
  }, [flipped]);

  return (
    <div>
      <div className="card-container">
        <div className={`card ${flipped ? 'flipped' : ''}`}>
          <div className="card-face card-front">
            <p>לך לצחצח שיינים עם הקשית</p>
            <button onClick={() => handleButtonClick('back1')}>פחדן</button>
            <button onClick={() => handleButtonClick('back2')}>אמיץ</button>
          </div>
          <div className={`card-face card-back ${currentPage}`}>
            {currentPage === 'back1' && <RightComp/>}
            {currentPage === 'back2' && <WrongComp/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;