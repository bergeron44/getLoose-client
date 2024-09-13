import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDateQuestions } from '../store/actions/questionsActions';
import TinderCard from 'react-tinder-card';
import { Box, Typography, Button, LinearProgress, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { styled } from '@mui/system';
import './DateGame.css';

// Shuffle function for mixing questions
const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

// Styled component for the card with pink, black, and red stripes
const StyledCard = styled(Box)(({ theme }) => ({
    width: '90vw',
    height: '90vh',
    maxHeight: 'calc(100vh - 40px)',
    background: 'linear-gradient(45deg, pink, black, red)',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    color: '#fff',
    overflow: 'auto', // Handle overflow for content
    transition: 'transform 0.2s ease-in-out',
}));

const SwipeButtons = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    width: '80%',
    maxWidth: '300px',
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
}));

const DateGame = () => {
    const dispatch = useDispatch();
    const dateQuestions = useSelector(state => state.questions.dateQuestions);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPunishment, setShowPunishment] = useState(false);

    useEffect(() => {
        dispatch(fetchDateQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (dateQuestions.length) {
            const shuffledQuestions = shuffleArray(dateQuestions);
            setShuffledQuestions(shuffledQuestions);
        }
    }, [dateQuestions]);

    const swiped = (direction, question) => {
        if (direction === 'left') {
            setShowPunishment(true);
        } else {
            setShuffledQuestions(prevQuestions => prevQuestions.filter(q => q !== question));
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePunishmentDone = () => {
        setShowPunishment(false);
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handleRetry = () => {
        dispatch(fetchDateQuestions()); // Re-fetch questions to reshuffle
        setCurrentIndex(0);
        setShuffledQuestions([]);
        setShowPunishment(false);
    };

    const progress = dateQuestions.length ? (currentIndex / dateQuestions.length) * 100 : 0;

    return (
        <Box className="dategame-container">
            <Box className="progress-container">
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            {shuffledQuestions.length > 0 && currentIndex < shuffledQuestions.length ? (
                <Box className="card-container">
                    {showPunishment ? (
                        <StyledCard>
                            <Typography variant="h2" sx={{ marginBottom: '20px', fontWeight: 'bold', fontFamily: 'Cursive', color: 'red' }}>
                                Loser
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Arial', color: '#fff' }}>
                                    {shuffledQuestions[currentIndex].punishment}
                                </Typography>
                            </Box>
                            <Button className="button" variant="contained" onClick={handlePunishmentDone}>
                                🍺 🍺 🍺 עשיתי 🍺 🍺 🍺
                            </Button>
                        </StyledCard>
                    ) : (
                        <TinderCard
                            key={shuffledQuestions[currentIndex].question}
                            onSwipe={(dir) => swiped(dir, shuffledQuestions[currentIndex].question)}
                            preventSwipe={['up', 'down']}
                            className="swipe"
                            swipeThreshold={2} 
                        >
                            <StyledCard>
                                <Typography className="typography-category">
                                    {shuffledQuestions[currentIndex].category}
                                </Typography>
                                <br />
                                <Typography className="typography-question">
                                    {shuffledQuestions[currentIndex].question}
                                </Typography>
                            </StyledCard>
                        </TinderCard>
                    )}
                    {!showPunishment && (
                        <SwipeButtons className="swipe-buttons">
                            <Typography sx={{ marginBottom: '10px' }}>👈 $ swipe $ 👉 </Typography>
                            <Box>
                                <IconButton color="error" onClick={() => swiped('left', shuffledQuestions[currentIndex].question)}>
                                    <ThumbDown fontSize="large" />
                                </IconButton>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <IconButton color="success" onClick={() => swiped('right', shuffledQuestions[currentIndex].question)}>
                                    <ThumbUp fontSize="large" />
                                </IconButton>
                            </Box>
                        </SwipeButtons>
                    )}
                </Box>
            ) : (
                <Box className="no-questions-container">
                    <Typography variant="h4">
                        נגמרו השאלות גם ככה אתם בטח שיכורים
                    </Typography>
                    <Button className="button" variant="contained" onClick={handleRetry}>
                        Retry
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default DateGame;
