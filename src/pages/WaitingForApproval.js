import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentGameId } from '../store/actions/liveGameActions';
import { useNavigate } from 'react-router-dom';
import LogoPage from './LogoPage';
import { Typography, Box, CircularProgress } from '@mui/material';

const WaitingForApproval = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const liveGameId = useSelector(state => state.liveGame.currentGameId);
    const waiterApprove = useSelector(state => state.liveGame.waiterApprove);
    const gameType = useSelector(state => state.liveGame.gameType); // Get the game type from Redux

    useEffect(() => {
        console.log('WaitingForApproval component mounted');
        const interval = setInterval(() => {
            if (liveGameId && !waiterApprove) {
                console.log('Polling for waiter approval...');
                dispatch(setCurrentGameId(liveGameId));
            }
        }, 3000);

        // Navigate to the game page if waiter approval is true
        if (waiterApprove) {
            console.log('Waiter approval received, navigating to game page');
            navigate(gameType === 'Date' ? '/DateGame' : '/FriendsGame'); // Navigate based on game type
        }

        return () => {
            clearInterval(interval);
            console.log('WaitingForApproval component unmounted');
        };
    }, [dispatch, liveGameId, waiterApprove, navigate, gameType]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f0f0f0', // Light grey background for better contrast
                padding: 2,
            }}
        >
            <Typography variant="h2" sx={{ fontFamily: 'Graffiti', marginBottom: 4 }}>
                Waiting for the waiter to approve you
            </Typography>
            {!waiterApprove && <CircularProgress sx={{ marginTop: 2 }} />} {/* Show loader if approval status is not determined */}
            <LogoPage />
        </Box>
    );
};

export default WaitingForApproval;
