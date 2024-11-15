import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructionGuess.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateBar } from '../store/actions/barsActions';

const InstructionGuess = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const dispatch = useDispatch(); // Redux dispatch
    const gameType = useSelector((state) => state.liveGames.gameType); // Get game type from Redux
    const currentBar = useSelector(state => state.bars.currentBar); // Get the current bar data from Redux

    useEffect(() => {
        if (!currentBar) {
            console.error('Current bar data is not available');
        }
    }, [currentBar]); // Re-run this when currentBar changes

    const handleStartPlaying = async () => {
        if (!currentBar) {
            console.error('No current bar data found!');
            return;
        }

        try {
            // Determine the game type key based on the gameType from Redux
            const gameTypeKey = gameType === 'Date' ? 'datingGame' :
                                 gameType === 'Friends' ? 'friendsGame' :
                                 'partyGame';
    
            // Create the update payload to increment the game type count
            const updatePayload = {
                gameType: gameTypeKey,  // Pass the game type as part of the payload
                gameStats: {
                    [gameTypeKey]: (currentBar.gameStats[gameTypeKey] || 0) + 1,  // Increment the game count
                }
            };
    
            // Dispatch the updateBar function to update the game stats
            await dispatch(updateBar(currentBar._id, updatePayload));
        } catch (error) {
            console.error('Error updating game stats:', error);
        }

        // Navigate to the next page after starting the game
        navigate('/GuessWhatIAm');  // Update the route accordingly
    };

    return (
        <div className="landing-page">
            <div className="landing-content">
                <h2 className="landing-title">🍺חוקי המשחק🍺</h2>
                <p className="landing-subtitle"> המשחק 20 שאלות גירסת השתיה </p>
                <p className="landing-subtitle">סובב את הטלפון ל 10 שניות </p>
                <p className="landing-subtitle">שאל/י את המשתתפים 10 שאלות של כן ולא </p>
                <p className="landing-subtitle">אחרי 10 שאלות תכתוב ניחוש </p>
                <p className="landing-subtitle">  טעית?? תוריד שוט ותנסה עוד 10 שאלות</p>
                <p className="landing-subtitle">🍺 בהצלחה 🍺</p>
                <button className="start-button" onClick={handleStartPlaying}>Start Playing</button>
            </div>
        </div>
    );
};

export default InstructionGuess;
