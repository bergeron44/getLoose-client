import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameType } from '../store/actions/liveGameActions';

const HomePageForDates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentGameType = useSelector((state) => state.liveGames.gameType); // Directly access the gameType from the store

  const cardStyle = {
    width: '300px',
    height: '200px',
    margin: '20px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    textDecoration: 'none',
    position: 'relative',
    cursor: 'pointer',
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

  const handleChooseDateClick = () => {
    console.log('Choose Date button clicked');
    if (currentGameType === 'Date') {
      alert('Starting a new Date game!');
      
    } else {
      dispatch(setGameType('Date'));
      alert('Current game type is not Date. i fix it');
    }
    navigate('/ChooseDate');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Link to="/LogoPage" style={cardStyle} onClick={() => console.log('Navigating to LogoPage')}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p1.jpg" alt="Page 1" style={imgStyle} />
          <div style={captionStyle}>הוראות</div>
        </div>
      </Link>
      <div onClick={handleChooseDateClick} style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p2.jpeg" alt="Page 2" style={imgStyle} />
          <div style={captionStyle}>התחל משחק</div>
        </div>
      </div>
      <Link to="/page3" style={cardStyle} onClick={() => console.log('Navigating to page3')}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p3.jpeg" alt="Page 3" style={imgStyle} />
          <div style={captionStyle}>חזור לבית</div>
        </div>
      </Link>
    </div>
  );
};

export default HomePageForDates;
