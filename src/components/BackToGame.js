import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLiveGames, setCurrentGameId } from '../store/actions/liveGameActions';
import { 
  setGameType, 
  setWaiterApprove, 
  setBar, 
  setTableName, 
  setTableNumber, 
  setPackage, 
  setPlayersNames 
} from '../store/actions/liveGameActions';

const BackToGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AllliveGames = useSelector(state => state.liveGames.liveGames);
  const [Fill, setFillLiveGame] = useState(false);

  useEffect(() => {
    if(!Fill)
      {
        dispatch(fetchLiveGames());
        setFillLiveGame(true);
      }
    
    
  },[AllliveGames]);

  const getDeviceIp = async () => {
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    console.log(data);
    return data.ip;
  };

  const handleBackToGame = async () => {
    
    const deviceIp = await getDeviceIp();
    console.log(deviceIp);
    console.log(AllliveGames);
    const matchingGame = AllliveGames.find(game =>
      game.playersNames.includes(deviceIp)
    );
    console.log(matchingGame);

    if (matchingGame) {
      // Update all the relevant properties in the store
      dispatch(setCurrentGameId(matchingGame._id));
      dispatch(setGameType(matchingGame.gameType));
      dispatch(setWaiterApprove(matchingGame.waiterApprove));
      dispatch(setBar(matchingGame.bar));
      dispatch(setTableName(matchingGame.tableName));
      dispatch(setTableNumber(matchingGame.tableNumber));
      dispatch(setPackage(matchingGame.package));
      dispatch(setPlayersNames(matchingGame.playersNames));

      // Redirect to the game page with the game ID
      if(matchingGame.waiterApprove)
        {
          if(matchingGame.gameType==='Date')
            {
              navigate(`/DateGame`);
            }
          else
          {
            navigate(`/FrindesGame`);
          }
        }
      alert('מחכה לאישור של מלצר');
      navigate(`/WaitingForApproval`);
   
      //פה צריך להתאים לאיפה נירצה להחזיר אותו בהתאם למשחק שלו
    } else {
      alert('אתם לא רשומים למשחק');
      navigate(`/NewHomePage`);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={handleBackToGame}
        style={{
          padding: '8px 8px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: 'black',
          border: 'none',
          borderRadius: '1px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}
      >
        חזור למשחק
      </button>
    </div>
  );
};

export default BackToGame;
