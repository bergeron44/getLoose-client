import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAllCategoryName } from '../store/actions/categories';

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
  width: '50%',
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

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <TriangleButton
          key={image.title}
          triangle={index === 0 ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)'}
          style={{ backgroundImage: `url(${image.url})` }}
          onClick={() => {
            dispatch(setAllCategoryName());
            navigate(image.link);
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