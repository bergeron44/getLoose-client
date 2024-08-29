import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGameType } from '../store/actions/liveGameActions';

const HomePageForFriends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleChooseFriendsClick = () => {
    // Dispatch the action to set the game type to "Friends"
    dispatch(setGameType("Friends"));
    // Navigate to the corresponding page
    navigate('/ChooseFrindes');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Link to="/LogoPage" style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p6.jpeg" alt="Page 1" style={imgStyle} />
          <div style={captionStyle}>הוראות</div>
        </div>
      </Link>
      <div onClick={handleChooseFriendsClick} style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p4.jpeg" alt="Page 2" style={imgStyle} />
          <div style={captionStyle}>התחל משחק</div>
        </div>
      </div>
      <Link to="/page3" style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <img src="/images/p5.jpeg" alt="Page 3" style={imgStyle} />
          <div style={captionStyle}>חזור לבית</div>
        </div>
      </Link>
    </div>
  );
};

export default HomePageForFriends;
