import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setBar, setPlayersNames } from '../store/actions/liveGameActions'; // Ensure this is correct
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

  useEffect(() => {
    const fetchQRCodeURL = async () => {
      const query = new URLSearchParams(window.location.search);
      const qrUrl = query.get('qrUrl');

      if (qrUrl) {
        try {
          // Fetch bar details based on QR URL
          const response = await fetch(`/api/bars/by-qr-url?url=${encodeURIComponent(qrUrl)}`);
          if (!response.ok) throw new Error('Failed to fetch bar details');
          const bar = await response.json();

          if (bar && bar.barName) {
            dispatch(setBar(bar.barName));
            dispatch(setCurrentBar(bar));
            // Get the IP address of the device
            const ipResponse = await fetch('/api/ip');
            if (!ipResponse.ok) throw new Error('Failed to fetch IP address');
            const { ipAddress } = await ipResponse.json();

            if (bar._id && ipAddress) {
              // Update live game with IP address
              const updateResponse = await fetch('/api/live-games/update-ip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ barId: bar._id, ipAddress }),
              });
              if (!updateResponse.ok) throw new Error('Failed to update live game IP');

              // Set playersNames in the store to the device IP address
              dispatch(setPlayersNames(ipAddress));
            }
          } else {
            console.error('Bar not found for the given QR URL');
          }
        } catch (error) {
          setError(error.message);
          console.error('Error fetching bar by QR URL:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQRCodeURL();
  }, [dispatch]);

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {loading && <Typography variant="h6" align="center">Loading...</Typography>}
      {error && <Typography variant="h6" color="error" align="center">Error: {error}</Typography>}
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
