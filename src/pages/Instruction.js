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
    "הוראות למשחק הדייטים",
    "הכניסו שם ובחרו את הרעל שלכם",
    "חכו שהמלצר יביא לכם את השתייה ויאשר אותכם",
    "החליקו ימינה אם עניתם ",
    "החליקו שמאלה אם לא רוצים לענות ותקבלו עונש"
  ];

  const friendsInstructions = [
    "הוראות למשחק השתייה לאמיצים בלבד",
    "בחרו מה הרעל שלכם והכניסו את שמכם",
    "חכו שהמלצר יאשר אותכם ויביא לכם את השתייה",
    "על הכרטיסיות מופיעות משימות לביצוע",
    "החליקו ימינה לביצוע המשימה או שמאלה אם אתם מפחדים",
    "אם החלקתם ימינה העבירו את הטלפון לחבר, אחרת בצעו את העונש שמופיע על הכרטיס"
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
        <h1 className="graffiti-caption">Push Don't Be Shy</h1>
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
