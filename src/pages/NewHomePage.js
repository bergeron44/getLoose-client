import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './NewHomePage.css'; // Import the CSS file
import BackToGame from '../components/BackToGame';
import { useDispatch, useSelector } from 'react-redux';
import { setGameType } from '../store/actions/liveGameActions';

const images = [
  {
    url: '/images/p24.webp',
    title: ' Do Or Drink',
    link: '/HomePageForFriends',
    gameType: 'Friends',
  },
  {
    url: '/images/p26.jpg',
    title: 'Tell Me Your Secrets',
    link: '/HomePageForDates',
    gameType: 'Date',
  },
  {
    url: '/images/guessp2.webp',
    title: 'Guess What I Am',
    link: '/InstructionGuess',
    gameType: 'GuessWhatIAm',
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
  '& .caption-newHomePage': {
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
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const currentBar = useSelector(state => state.bars.currentBar);

  const handleClick = (link,gameType) => {
    console.log(currentBar.barName)
    console.log(gameType)
    if((currentBar.barName==='BENGI'||currentBar.barName==='Mileva'||currentBar.barName==='BarBaSaba') && link!=='/InstructionGuess')
      {
        dispatch(setGameType(gameType));
        link='/InstructionStupid';
      }
    else if(currentBar.barName==='SassonBar' && link!=='/InstructionGuess')
        {
          dispatch(setGameType(gameType));
          link='/InstructionStupid';
        }
    navigate(link);
  };

  return (
    <Box className="new-home-page">
      <Box className="header-newHomePage">
        <Typography variant="h2" className="title-newHomePage">
          - - -Game's 
        </Typography>
        <BackToGame className="back-button" />
      </Box>
      <Box className="button-container-newHomePage">
        {images.map((image) => (
          <StyledButton
            key={image.title}
            style={{ backgroundImage: `url(${image.url})` }}
            onClick={() => handleClick(image.link,image.gameType)}
          >
            <Typography className="caption">{image.title}</Typography>
          </StyledButton>
        ))}
      </Box>
    </Box>
  );
}
