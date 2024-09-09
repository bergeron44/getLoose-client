import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsQuestions } from '../store/actions/questionsActions';
import TinderCard from 'react-tinder-card';
import { Box, Typography, IconButton, LinearProgress, Button } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { styled } from '@mui/system';
import Close from '../components/Close'; // Import Close component
import './FrindesGame.css'; // Import the CSS file

const StyledCard = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'calc(100vh - 100px)',
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
}));

const SwipeButtons = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    width: '300px',
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
}));

const SwipeEmoji = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '3rem',
    color: '#fff',
}));

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const FrindesGame = () => {
    const dispatch = useDispatch();
    const frindesQuestions = useSelector(state => state.questions.gameQuestions);
    const GameId  = useSelector(state => state.liveGames.currentGameId);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [swipeHistory, setSwipeHistory] = useState([]);
    const [showPunishment, setShowPunishment] = useState(false);

    useEffect(() => {
        dispatch(fetchFriendsQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (frindesQuestions.length > 0) {
            setShuffledQuestions(shuffleArray([...frindesQuestions]));
        }
    }, [frindesQuestions]);

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
        setSwipeHistory([...swipeHistory, { question: shuffledQuestions[currentIndex].question, direction: 'left' }]);
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handleRetry = () => {
        setCurrentIndex(0);
        setSwipeHistory([]);
        setShowPunishment(false);
    };

    const progress = shuffledQuestions.length ? (currentIndex / shuffledQuestions.length) * 100 : 0;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2', padding: '10px', position: 'relative' }}>
            <Close gameId={GameId} /> {/* Pass the actual game ID */}
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            {shuffledQuestions.length > 0 && currentIndex < shuffledQuestions.length ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%', height: 'calc(100vh - 100px)' }}>
                    {showPunishment ? (
                        <StyledCard>
                            <Typography variant="h2" sx={{ marginBottom: '20px', fontWeight: 'bold', fontFamily: 'Cursive', color: 'red' }}>
                                Loser
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Arial', color: '#fff' }}>
                                    {shuffledQuestions[currentIndex].punishment}
                                </Typography>
                            </Box>
                            <Button variant="contained" color="primary" onClick={handlePunishmentDone} sx={{ mt: 4, backgroundColor: '#ff5722', color: '#fff' }}>
                                I Have Done It
                            </Button>
                        </StyledCard>
                    ) : (
                        <TinderCard
                            key={shuffledQuestions[currentIndex].question}
                            onSwipe={(dir) => swiped(dir, shuffledQuestions[currentIndex].question)}
                            preventSwipe={['up', 'down']}
                            className="swipe"
                            swipeThreshold={0.1}
                        >
                            <StyledCard>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>
                                    {shuffledQuestions[currentIndex].question}
                                </Typography>
                            </StyledCard>
                        </TinderCard>
                    )}
                    <SwipeEmoji>👈  👉</SwipeEmoji>
                    {!showPunishment && (
                        <SwipeButtons>
                            <IconButton color="error" onClick={() => swiped('left', shuffledQuestions[currentIndex].question)}>
                                <ThumbDown fontSize="large" />
                            </IconButton>
                            <IconButton color="success" onClick={() => swiped('right', shuffledQuestions[currentIndex].question)}>
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

export default FrindesGame;
