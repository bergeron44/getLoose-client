import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentGameId } from '../store/actions/liveGameActions';
import { useNavigate } from 'react-router-dom';
import LogoPage from './LogoPage';
import { Typography, Box } from '@mui/material';

const WaitingForApproval = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const liveGameId = useSelector(state => state.liveGame.currentGameId); // Get the current game ID from Redux
    const waiterApprove = useSelector(state => state.liveGame.waiterApprove);

    useEffect(() => {
        const interval = setInterval(() => {
            if (liveGameId && !waiterApprove) {
                dispatch(setCurrentGameId(liveGameId));
            }
        }, 3000);

        // Navigate to the game page if waiter approval is true
        if (waiterApprove) {
            navigate('/game-page');
        }

        return () => clearInterval(interval);
    }, [dispatch, liveGameId, waiterApprove, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center'
            }}
        >
            <Typography variant="h2" sx={{ fontFamily: 'Graffiti', marginBottom: 4 }}>
                Waiting for the waiter to approve you
            </Typography>
            <LogoPage />
        </Box>
    );
};

export default WaitingForApproval;
