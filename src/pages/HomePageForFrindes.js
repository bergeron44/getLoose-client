import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGameType } from '../store/actions/liveGameActions';
import './HomePageForFrindes.css'; // Import the CSS file

const HomePageForFriends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChooseFriendsClick = () => {
    console.log('Choose Friends button clicked');
    alert('Starting a new Friends game!');
    dispatch(setGameType("Friends"));
    navigate('/ChooseFrindes');
  };

  return (
    <div className="home-page-container">
      <Link to="/Instruction" className="card-link" onClick={() => console.log('Navigating to Instruction')}>
        <div className="card">
          <img src="/images/p6.jpeg" alt="Instruction" className="card-image" />
          <div className="card-caption">הוראות</div>
        </div>
      </Link>
      <div onClick={handleChooseFriendsClick} className="card">
        <img src="/images/p4.jpeg" alt="Page 2" className="card-image" />
        <div className="card-caption">התחל משחק</div>
      </div>
      <Link to="/" className="card-link" onClick={() => console.log('Navigating to home Page')}>
        <div className="card">
          <img src="/images/p5.jpeg" alt="homePage" className="card-image" />
          <div className="card-caption">חזור לבית</div>
        </div>
      </Link>
    </div>
  );
};

export default HomePageForFriends;
