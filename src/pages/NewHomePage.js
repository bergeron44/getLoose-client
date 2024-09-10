import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './NewHomePage.css'; // Import the CSS file

const images = [
  {
    url: '/images/p24.webp',
    title: ' Do Or Drink',
    link: '/HomePageForFriends',
  },
  {
    url: '/images/p26.jpg',
    title: 'Tell Me Your Secrets',
    link: '/HomePageForDates',
  },
  {
    url: '/images/guessp2.webp',
    title: 'Guess What I Am',
    link: '/GuessWhatIAm',
  },
];

// Styled container for each image button
const StyledButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100vw', // Full width of the viewport
  height: '33vh', // Height of a third of the viewport
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  marginBottom: theme.spacing(1), // Space between buttons
  transform: 'translateY(5%)', // Move image down by 10% of its height
  '&:last-child': {
    marginBottom: 0,
  },
  '& .caption': {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1.5rem',
    textShadow: '0px 2px 4px rgba(0,0,0,0.7)',
    width: '80%', // Responsive width for the caption
  },
}));

// Main Component
export default function NewHomePage() {
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <Box className="new-home-page">
      <Typography variant="h2" align="center" className="title">
        המשחקים
      </Typography>
      <Box className="button-container">
        {images.map((image) => (
          <StyledButton
            key={image.title}
            style={{ backgroundImage: `url(${image.url})` }}
            onClick={() => handleClick(image.link)}
          >
            <Typography className="caption">{image.title}</Typography>
          </StyledButton>
        ))}
      </Box>
    </Box>
  );
}
