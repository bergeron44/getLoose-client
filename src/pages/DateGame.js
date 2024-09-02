import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDateQuestions } from '../store/actions/questionsActions';
import TinderCard from 'react-tinder-card';
import { Box, Typography, IconButton, LinearProgress, Button } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { styled } from '@mui/system';
import './DateGame.css';

// Styled component for the card with pink, black, and red stripes
const StyledCard = styled(Box)(({ theme }) => ({
    width: '100%', // Cover the entire screen
    height: 'calc(100vh - 100px)', // Leave space for the logo
    background: 'linear-gradient(45deg, pink, black, red)', // Striped background
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'transform 0.6s ease-in-out',
    textAlign: 'center',
    color: '#fff', // White text color for better contrast
}));

const SwipeButtons = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    width: '300px',
}));

const DateGame = () => {
    const dispatch = useDispatch();
    const dateQuestions = useSelector(state => state.questions.dateQuestions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeHistory, setSwipeHistory] = useState([]);
    const [showPunishment, setShowPunishment] = useState(false);

    useEffect(() => {
        dispatch(fetchDateQuestions());
    }, [dispatch]);

    const swiped = (direction, question) => {
        if (direction === 'left') {
            setShowPunishment(true);
        } else {
            setSwipeHistory([...swipeHistory, { question, direction }]);
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePunishmentDone = () => {
        setShowPunishment(false);
        setSwipeHistory([...swipeHistory, { question: dateQuestions[currentIndex].question, direction: 'left' }]);
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handleRetry = () => {
        setCurrentIndex(0);
        setSwipeHistory([]);
        setShowPunishment(false);
    };

    const progress = dateQuestions.length ? (currentIndex / dateQuestions.length) * 100 : 0;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box sx={{ position: 'absolute', top: 0, width: '100%', textAlign: 'center', padding: '20px' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Arial', color: '#000' }}>
                    {/* Replace with your logo */}
                    Get Loose
                </Typography>
            </Box>
            {dateQuestions.length > 0 && currentIndex < dateQuestions.length ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%', height: 'calc(100vh - 100px)' }}>
                    {showPunishment ? (
                        <StyledCard>
                            <Typography variant="h2" sx={{ marginBottom: '20px', fontWeight: 'bold', fontFamily: 'Cursive', color: 'red' }}>
                                Loser
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Arial', color: '#fff' }}>
                                    {dateQuestions[currentIndex].punishment}
                                </Typography>
                            </Box>
                            <Button variant="contained" color="primary" onClick={handlePunishmentDone} sx={{ mt: 4, backgroundColor: '#ff5722', color: '#fff' }}>
                                I Have Done It
                            </Button>
                        </StyledCard>
                    ) : (
                        <TinderCard
                            key={dateQuestions[currentIndex].question}
                            onSwipe={(dir) => swiped(dir, dateQuestions[currentIndex].question)}
                            preventSwipe={['up', 'down']}
                            className="swipe"
                        >
                            <StyledCard>
                                <Typography variant="h5" sx={{ color:'yellow', fontWeight: 'bold', fontFamily: 'Arial' }}>
                                    {dateQuestions[currentIndex].category}
                                </Typography><br/>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>
                                    {dateQuestions[currentIndex].question} 
                                </Typography>
                            </StyledCard>
                        </TinderCard>
                    )}
                    {!showPunishment && (
                        <SwipeButtons>
                            <IconButton color="error" onClick={() => swiped('left', dateQuestions[currentIndex].question)}>
                                <ThumbDown fontSize="large" />
                            </IconButton>
                            <IconButton color="success" onClick={() => swiped('right', dateQuestions[currentIndex].question)}>
                                <ThumbUp fontSize="large" />
                            </IconButton>
                        </SwipeButtons>
                    )}
                </Box>
            ) : (
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        No more questions!
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleRetry}>
                        Retry
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default DateGame;
