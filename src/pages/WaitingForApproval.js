import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '../components/AnimatedLogo';
import { Typography, Box, CircularProgress } from '@mui/material';
import { updateLiveGame } from '../store/actions/liveGameActions'; // Import your update action

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
                        navigate(gameType === 'Date' ? '/DateGame' : '/FriendsGame');
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                padding: 2,
            }}
        >
            <Typography variant="h2" sx={{ fontFamily: 'Graffiti', marginBottom: 4 }}>
                Waiting for the waiter to approve you
            </Typography>
            {/* Display a loading spinner while waiting for approval */}
            {!waiterApprove && <CircularProgress sx={{ marginTop: 2 }} />}
            {/* Ensure AnimatedLogo is properly defined and exported */}
            <AnimatedLogo />
        </Box>
    );
};

export default WaitingForApproval;
