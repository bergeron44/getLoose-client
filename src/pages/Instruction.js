import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Instruction.css';

const Instruction = () => {
  const navigate = useNavigate();
  
  // Fetch the game type from the Redux store
  const gameType = useSelector((state) => state.liveGames.gameType);

  // Define instructions for different game types
  const dateInstructions = [
    "🥰הוראות למשחק הדייטים🥰",
    "😉בחרו מה בא לכם לשתות😉",
    "🤓חכו שהמלצר יביא לכם את השתייה ויאשר אותכם🤓",
    "💪 החליקו ימינה אם בא לכם לשתף  💪",
    "👻 פחדנים? החליקו שמאלה אם לא רוצים לענות ותקבלו עונש 👻 "
  ];

  const friendsInstructions = [
    "🍺 Do Or Drink 🍺",
    "😉בחרו מה בא לכם לשתות😉",
    "🤓חכו שהמלצר יביא לכם את השתייה ויאשר אותכם🤓",
    "💪 בצעו את המשימה והחליקו ימינה    💪",
    "😈 החליקו שמאלה וקבלו עונש 😈",
  ];

  // Determine which instruction list to use based on the game type
  const instructions = gameType === 'Date' ? dateInstructions : friendsInstructions;

  // State to keep track of the current instruction
  const [currentInstruction, setCurrentInstruction] = useState(0);

  // Handle the bubble click
  const handleBubbleClick = () => {
    if (currentInstruction < instructions.length - 1) {
      // Move to the next instruction
      setCurrentInstruction(currentInstruction + 1);
    } else {
      console.log(gameType);
      // Redirect to a different page depending on the game type
      if (gameType === 'Date') {
        navigate('/HomePageForDates'); // Replace with the route for the Date game ending
      } else {
        navigate('/HomePageForFriends'); // Replace with the route for the Friends game ending
      }
    }
  };

  return (
    <div className="instruction-container">
      <div className="instruction-card">
        <h1 className="graffiti-caption">תלחץ<br/> אל תתבייאש 😉</h1>
        <div className="bubble" onClick={handleBubbleClick}>
          {instructions[currentInstruction]}
        </div>
        <div className="emoji-container">
          <span role="img" aria-label="click-button">👆</span>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
