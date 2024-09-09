import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameType } from '../store/actions/liveGameActions';
import './HomePageForDates.css';

const HomePageForDates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentGameType = useSelector((state) => state.liveGames.gameType); // Directly access the gameType from the store
  const currentBar = useSelector((state) => state.bars.currentBar);

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

  const handleBackHomeClick = () => {
    console.log('back Home');
    const barName = currentBar?.barName || 'Admin'; // Use a default value if currentBar or barName is undefined
    const stringWithoutSpaces = barName.replace(/\s+/g, '');
    navigate(`/${stringWithoutSpaces}`);
    dispatch(setGameType(""));
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
      <div onClick={handleBackHomeClick} className="card">
        <img src="/images/p5.jpeg" alt="Page 2" className="card-image" />
        <div className="card-caption">בא לי משחק אחר </div>
      </div>
    </div>
  );
};

export default HomePageForDates;
