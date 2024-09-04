import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setBar, setGameType, setPlayersNames } from '../store/actions/liveGameActions';
import { setCurrentBar } from '../store/actions/barsActions';
import './FirstPageDateOrFrinde.css'; // Import the CSS file

const BASE_URL = 'http://localhost:3001';

const images = [
  {
    url: '/images/p24.webp',
    title: 'Friends',
    link: '/HomePageForFriends',
  },
  {
    url: '/images/p25.webp',
    title: 'Date',
    link: '/HomePageForDates',
  },
];

const TriangleButton = styled(ButtonBase)(({ triangle }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  clipPath: triangle,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageSrc = styled('span')(({ position }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  transform: position === 'upper'
    ? 'translate(-30%, -30%)'  // Move image slightly left and up for upper triangle
    : 'translate(30%, 30%)',   // Move image slightly right and down for lower triangle
}));

export default function TrianglePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentBar = useSelector((state) => state.liveGames.bar);
  const currentPlayer = useSelector((state) => state.liveGames.playersNames);

  useEffect(() => {
    const checkAndUpdateStore = () => {
      console.log('Current Bar:', currentBar);
      console.log('Current Game:', currentPlayer);

      if (currentBar !== "" && currentPlayer.length > 0) {
        console.log('Data already available in the store, no need to update.');
        setLoading(false);
        return;
      }

      console.log('Data missing, updating the store with predefined data...');

      const predefinedData = {
        gameType: 'Friends',
        waiterApprove: false,
        bar: '66cf321675e291f22adfed02',
        tableName: 'Table default',
        tableNumber: 666,
        package: '66cc4d2be575206e74e1a22a',
        playersNames: ['87.70.43.130'],
        _id: '66d2e87b133fc3dba6b7ee10',
        __v: 0,
      };

      dispatch(setBar(predefinedData.bar));
      dispatch(setCurrentBar({
        barName: 'Predefined Bar',
        _id: predefinedData.bar,
      }));
      dispatch(setPlayersNames(predefinedData.playersNames));

      console.log('Store updated with predefined data:', predefinedData);
      setLoading(false);
    };

    checkAndUpdateStore();
  }, [dispatch, currentBar, currentPlayer]);

  const handleClick = async (link, title) => {
    console.log('Navigating to:', link);
    alert(currentBar);
    let barName = currentBar;

    try {
      var response = await fetch(`${BASE_URL}/api/bar/${barName}`);
      if (!response.ok) {
        response = await fetch(`${BASE_URL}/api/bar/id/${barName}`);
        if (!response.ok)
          {
            throw new Error('Bar not found');
          }    
      }

      const barData = await response.json();
      const { _id, barName: name, location, capacity, barPackages, qrUrl } = barData;

      dispatch(setBar(_id));
      dispatch(setCurrentBar({
        _id,
        barName: name,
        location,
        capacity,
        barPackages,
        qrUrl,
      }));

      console.log('Store updated with bar data:', barData);
    } catch (error) {
      console.error('Failed to fetch bar data:', error);
      setError(error.message);
    }

    if (link === '/HomePageForFriends') {
      dispatch(setGameType("Friends"));
    } else {
      dispatch(setGameType("Date"));
    }

    navigate(link);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">Error: {error}</Typography>;
  }

  return (
    <Box className="triangle-page-container">
      {images.map((image, index) => (
        <TriangleButton
          key={image.title}
          triangle={index === 0 ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)'}
          style={{ backgroundImage: `url(${image.url})` }}
          onClick={() => handleClick(image.link, image.title)}
          className={`triangle-button ${index === 1 ? 'bottom-triangle' : ''}`} // Apply bottom-triangle class for the second triangle
        >
          <span className="image-backdrop" />
          <ImageSrc position={index === 0 ? 'upper' : 'lower'} />
          <span className={`caption ${index === 0 ? 'caption-top' : 'caption-bottom'}`}>
            {image.title}
            <span className="image-marked" />
          </span>
        </TriangleButton>
      ))}
    </Box>
  );
}
