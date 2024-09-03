import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateLiveGame } from '../store/actions/liveGameActions'; // Import your update action
import './WaitingForApproval.css'; // Import the CSS file for styling
import AnimatedLogo from '../components/AnimatedLogo';

const WaitingForApproval = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:3001';

    // Pull values from the Redux store
    const currentGameId = useSelector(state => state.liveGames.currentGameId);
    const waiterApprove = useSelector(state => state.liveGames.waiterApprove);
    const gameType = useSelector(state => state.liveGames.gameType);

    // Polling for waiter approval
    useEffect(() => {
        if (currentGameId) {
            const interval = setInterval(async () => {
                try {
                    const response = await fetch(`${BASE_URL}/api/livegame/id/${currentGameId}`);
                    const data = await response.json();

                    if (data.waiterApprove) {
                        // If approval is true, update the store and navigate
                        dispatch(updateLiveGame(currentGameId, { waiterApprove: true }));
                        navigate(gameType === 'Date' ? '/DateGame' : '/FrindesGame');
                        clearInterval(interval); // Stop polling once approved
                    }
                } catch (error) {
                    console.error('Error fetching waiter approval status:', error);
                }
            }, 3000);

            return () => {
                clearInterval(interval);
                console.log('Polling interval cleared');
            };
        }
    }, [currentGameId, waiterApprove, gameType, dispatch, navigate]);

    return (
        <div className="waiting-container">
            <h2 className="waiting-title">
                Waiting for the waiter to approve you
            </h2>
            {/* AnimatedLogo component */}
            <div className="parent-container">
              <AnimatedLogo />
           </div>
            
        </div>
    );
};

export default WaitingForApproval;
