import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDateQuestions } from '../store/actions/questionsActions';
import TinderCard from 'react-tinder-card';
import { Box, Typography, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { styled } from '@mui/system';
import './DateGame.css';

const Card = styled(Box)(({ theme }) => ({
    width: '300px',
    height: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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

    useEffect(() => {
        dispatch(fetchDateQuestions());
    }, [dispatch]);

    const swiped = (direction, question) => {
        console.log(`Swiped ${direction} on: ${question}`);
        setCurrentIndex(currentIndex + 1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
            {currentIndex < dateQuestions.length ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <TinderCard
                        onSwipe={(dir) => swiped(dir, dateQuestions[currentIndex].content)}
                        preventSwipe={['up', 'down']}
                        className="swipe"
                    >
                        <Card>
                            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial' }}>
                                {dateQuestions[currentIndex].content}
                            </Typography>
                        </Card>
                    </TinderCard>
                    <SwipeButtons>
                        <IconButton color="error" onClick={() => swiped('left', dateQuestions[currentIndex].content)}>
                            <ThumbDown fontSize="large" />
                        </IconButton>
                        <IconButton color="success" onClick={() => swiped('right', dateQuestions[currentIndex].content)}>
                            <ThumbUp fontSize="large" />
                        </IconButton>
                    </SwipeButtons>
                </Box>
            ) : (
                <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
                    No more questions!
                </Typography>
            )}
        </Box>
    );
};

export default DateGame;
