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

const BASE_URL = 'https://getloose-server.onrender.com';
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
    ? 'translate(-30%, -30%)'
    : 'translate(30%, 30%)',
}));

export default function TrianglePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentBar = useSelector((state) => state.liveGames.bar);
  const currentPlayer = useSelector((state) => state.liveGames.playersNames);

  useEffect(() => {
    const checkAndRedirect = () => {
      if (!currentBar || currentPlayer.length === 0) {
        console.log("im in");
        // Redirect if currentBar or currentPlayer is missing
        navigate('/NotInBar'); // Replace with the actual route for connection
        return;
      }

      setLoading(false); // Data is valid, no need to load further
    };

    checkAndRedirect();
  }, [currentBar, currentPlayer, navigate]);

  const handleClick = async (link, title) => {
    if (!currentBar) {
      alert('You are not connected to a specific bar.');
      navigate('/NotInBar'); // Redirect to connection page if no bar is connected
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/bar/${currentBar}`);
      if (!response.ok) {
        response = await fetch(`${BASE_URL}/api/bar/id/${currentBar}`);
        if (!response.ok) {
          throw new Error('Bar not found');
        }
      }

      const barData = await response.json();
      const { _id, barName, location, capacity, barPackages, qrUrl } = barData;

      dispatch(setBar(_id));
      dispatch(setCurrentBar({
        _id,
        barName,
        location,
        capacity,
        barPackages,
        qrUrl,
      }));

      if (link === '/HomePageForFriends') {
        dispatch(setGameType("Friends"));
      } else {
        dispatch(setGameType("Date"));
      }

      navigate(link);
    } catch (error) {
      console.error('Failed to fetch bar data:', error);
      setError(error.message);
    }
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
          className={`triangle-button ${index === 1 ? 'bottom-triangle' : ''}`}
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
