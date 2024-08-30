import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { Typography, Box, Snackbar, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FriendsGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions of type 'Friends' from the database
    axios.get('/api/questions', { params: { type: 'Friends' } })
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setMessage('Congratulations! You have swiped right.');
      setShowMessage(true);
      setTimeout(() => {
        setMessage('');
        setShowMessage(false);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 2000); // Display the message for 2 seconds
    } else if (direction === 'left') {
      navigate('/loser');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: 2 }}>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>Friends Game</Typography>

      {questions.length > 0 && (
        <Box sx={{ position: 'relative', width: '90%', maxWidth: 600 }}>
          {questions.slice(currentIndex, currentIndex + 1).map((question, index) => (
            <TinderCard
              key={index}
              onSwipe={handleSwipe}
              preventSwipe={['up', 'down']}
              sx={{ position: 'absolute', width: '100%' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
                <Typography variant="h5" align="center">{question.content}</Typography>
              </Box>
            </TinderCard>
          ))}
        </Box>
      )}

      <Snackbar
        open={showMessage}
        autoHideDuration={2000}
        onClose={() => setShowMessage(false)}
        message={message}
        action={
          <Button color="inherit" onClick={() => setShowMessage(false)}>Close</Button>
        }
      />
    </Box>
  );
};

export default FriendsGame;
