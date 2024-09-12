import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Close.css'; // Ensure you have a CSS file for styling

const Close = ({ gameId }) => {
  const navigate = useNavigate(); // Use navigate from react-router-dom

  const handleClose = async () => {
    try {
      // Delete the game from the database
      const p=await axios.delete(`https://getloose-server.onrender.com/api/livegame/${gameId}`);
      console.log(p);
      // alert("נשמח לעזרתכם לדרג את חלק מהשאלות שלנו")
      // Navigate to the /TestFeedback page
      navigate('/TestFeedback');
    } catch (error) {
      console.error('Failed to close the game:', error);
      navigate('/TestFeedback');
    }
  };

  return (
    <button className="close-button" onClick={handleClose} aria-label="Close Game">
      🚪
    </button>
  );
};

export default Close;
