import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setBar, setPlayersNames } from '../store/actions/liveGameActions';
import { setCurrentBar } from '../store/actions/barsActions';

const images = [
  {
    url: '/images/pick1.jpeg',
    title: 'Friends',
    link: '/HomePageForFriends',
  },
  {
    url: '/images/pick3.jpeg',
    title: 'Date',
    link: '/HomePageForDates',
  },
];

const TriangleButton = styled(ButtonBase)(({ theme, triangle }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  clipPath: triangle,
  overflow: 'hidden',
  '&:hover, &.Mui-focusVisible': {
    zIndex: 2,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const Caption = styled(Typography)(({ theme, position }) => ({
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  opacity: 0.7,
  borderRadius: 1,
  padding: theme.spacing(1),
  ...(position === 'bottom' && { bottom: '10%' }),
  ...(position === 'top' && { top: '10%' }),
}));

export default function TrianglePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access the stored bar and live game data from the Redux store
  const currentBar = useSelector((state) => state.bars.currentBar);
  const currentGame = useSelector((state) => state.liveGames.currentGame);

  useEffect(() => {
    const checkAndUpdateStore = () => {
      console.log('Current Bar:', currentBar);
      console.log('Current Game:', currentGame);

      if (currentBar && currentGame && currentGame.playersNames && currentGame.playersNames.length > 0) {
        console.log('Data already available in the store, no need to update.');
        setLoading(false);
        return;
      }

      console.log('Data missing, updating the store with predefined data...');

      // Predefined data to insert if missing
      const predefinedData = {
        gameType: 'Friends',
        waiterApprove: false,
        bar: '66cf321675e291f22adfed02',
        tableName: 'Table 7',
        tableNumber: 7,
        package: '66cc4d2be575206e74e1a22a',
        playersNames: ['87.70.43.130'],
        _id: '66d2e87b133fc3dba6b7ee10',
        __v: 0
      };

      // Update the store with predefined data
      dispatch(setBar(predefinedData.bar));
      dispatch(setCurrentBar({
        barName: 'Predefined Bar',
        _id: predefinedData.bar
      }));
      dispatch(setPlayersNames(predefinedData.playersNames));

      console.log('Store updated with predefined data:', predefinedData);

      // Set loading to false after updating the store
      setLoading(false);
    };

    checkAndUpdateStore();
  }, [dispatch, currentBar, currentGame]);

  const handleClick = (link) => {
    console.log('Navigating to:', link);
    navigate(link);
  };

  if (loading) {
    console.log('Loading...');
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    console.error('Error occurred:', error);
    return <Typography variant="h6" color="error" align="center">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <TriangleButton
          key={image.title}
          triangle={index === 0 ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)'}
          style={{ backgroundImage: `url(${image.url})` }}
          onClick={() => handleClick(image.link)}
          sx={{
            top: index === 0 ? 0 : '50%',
            left: index === 0 ? 0 : '50%',
            transform: index === 0 ? 'none' : 'translate(-50%, -50%)',
            width: '90%', // Adjust the width percentage
            height: '90%', // Adjust the height percentage
          }}
        >
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <ImageSrc />
          <Caption
            variant="h4"
            component="span"
            position={index === 0 ? 'top' : 'bottom'}
          >
            {image.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Caption>
        </TriangleButton>
      ))}
    </Box>
  );
}
