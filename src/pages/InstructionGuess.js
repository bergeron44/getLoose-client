import React from 'react';
import {  useNavigate } from 'react-router-dom'; // If using React Router for navigation
import './InstructionGuess.css'; // Import custom CSS

const InstructionGuess = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleStartPlaying = () => {
      navigate('/GuessWhatIAm'); // Replace '/game' with the path to your game page
    };

    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1 className="landing-title">🍺 חוקי המשחק 🍺</h1>
                <p className="landing-subtitle">סובב את הטלפון ל 10 שניות </p>
                <p className="landing-subtitle">שאל/י את המשתתפים 10 שאלות של כן ולא </p>
                <p className="landing-subtitle">אחרי 10 שאלות תכתוב ניחוש </p>
                <p className="landing-subtitle"> טעית אחרי 2 ניחושים (לוזר) תוריד שוט</p>
                <p className="landing-subtitle">🍺 בהצלחה 🍺</p>
                <button className="start-button" onClick={handleStartPlaying}>Start Playing</button>
            </div>
        </div>
    );
};

export default InstructionGuess;
