import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameType } from '../store/actions/liveGameActions';
import './HomePageForFrindes.css'; // Import the CSS file

const HomePageForFriends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentBar = useSelector((state) => state.bars.currentBar);

  const handleChooseFriendsClick = () => {
    console.log('Choose Friends button clicked');
    console.log('Starting a new Friends game!');
    dispatch(setGameType("Friends"));
    navigate('/ChooseFrindes');
  };
  const handleBackHomeClick = () => {
    console.log('back Home');
    console.log(currentBar);
    dispatch(setGameType(""));
    const stringWithoutSpaces = currentBar.barName.replace(/\s+/g, '');
    navigate(`/${stringWithoutSpaces}`);
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
      <div onClick={handleBackHomeClick} className="card">
        <img src="/images/p5.jpeg" alt="Page 2" className="card-image" />
        <div className="card-caption">בא לי משחק אחר </div>
      </div>
    </div>
  );
};

export default HomePageForFriends;
