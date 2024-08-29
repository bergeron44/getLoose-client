import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLiveGames } from '../store/actions/liveGameActions';
import { 
  setGameType, 
  setWaiterApprove, 
  setBar, 
  setTableName, 
  setTableNumber, 
  setPackage, 
  setPlayersNames 
} from '../actions/currentGameActions';

const BackToGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const liveGames = useSelector(state => state.liveGames);

  const getDeviceIp = async () => {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  };

  const handleBackToGame = async () => {
    dispatch(fetchLiveGames());
    const deviceIp = await getDeviceIp();

    const matchingGame = liveGames.find(game =>
      game.playersNames.includes(deviceIp)
    );

    if (matchingGame) {
      // Update all the relevant properties in the store
      dispatch(setGameType(matchingGame.gameType));
      dispatch(setWaiterApprove(matchingGame.waiterApprove));
      dispatch(setBar(matchingGame.bar));
      dispatch(setTableName(matchingGame.tableName));
      dispatch(setTableNumber(matchingGame.tableNumber));
      dispatch(setPackage(matchingGame.package));
      dispatch(setPlayersNames(matchingGame.playersNames));

      // Redirect to the game page with the game ID
      navigate(`/game/${matchingGame.id}`);
    } else {
      alert('You are not registered for any game.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={handleBackToGame}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#007BFF',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}
      >
        Come Back to the Game
      </button>
    </div>
  );
};

export default BackToGame;
