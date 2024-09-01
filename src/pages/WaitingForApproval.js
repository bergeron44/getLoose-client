import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '../components/AnimatedLogo'
import { Typography, Box, CircularProgress } from '@mui/material';

const WaitingForApproval = () => {
    const navigate = useNavigate();

    // Pull values from the Redux store
    const currentGameId = useSelector(state => state.liveGames.currentGameId);
    const waiterApprove = useSelector(state => state.liveGames.waiterApprove);
    const gameType = useSelector(state => state.liveGames.gameType);

    // Polling for waiter approval
    useEffect(() => {
        if (currentGameId) {
            const interval = setInterval(() => {
                // Log polling status
                console.log('Polling for waiter approval...');
                // Normally you would dispatch an action here if needed
            }, 3000);

            return () => {
                clearInterval(interval);
                console.log('Polling interval cleared');
            };
        }
    }, [currentGameId, waiterApprove]);

    // Navigate to game page on approval
    useEffect(() => {
        if (waiterApprove) {
            console.log('Waiter approval received, navigating to game page');
            navigate(gameType === 'Date' ? '/DateGame' : '/FriendsGame');
        }
    }, [waiterApprove, navigate, gameType]);

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
            {/* Ensure LogoPage is properly defined and exported */}
            <AnimatedLogo />
        </Box>
    );
};

export default WaitingForApproval;
