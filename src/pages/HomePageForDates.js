import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameType } from '../store/actions/liveGameActions';
import './HomePageForDates.css';

const HomePageForDates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentGameType = useSelector((state) => state.liveGames.gameType); // Directly access the gameType from the store

  const handleChooseDateClick = () => {
    console.log('Choose Date button clicked');
    if (currentGameType === 'Date') {
      console.log('Starting a new Date game!');
    } else {
      dispatch(setGameType('Date'));
      console.log('Current game type is not Date. Switching to Date.');
    }
    navigate('/ChooseDate');
  };

  return (
    <div className="card-container">
      <Link to="/Instruction" className="card instruction-button" onClick={() => console.log('Navigating to Instruction')}>
        <div>
          <img src="/images/p1.jpg" alt="Instruction" />
          <div className="card-caption">הוראות</div>
        </div>
      </Link>
      <div className="card choose-date-button" onClick={handleChooseDateClick}>
        <div>
          <img src="/images/p2.jpeg" alt="Page 2" />
          <div className="card-caption">התחל משחק</div>
        </div>
      </div>
      <Link to="/" className="card home-button" onClick={() => console.log('Navigating to home Page')}>
        <div>
          <img src="/images/p3.jpeg" alt="homePage" />
          <div className="card-caption">חזור לבית</div>
        </div>
      </Link>
    </div>
  );
};

export default HomePageForDates;
