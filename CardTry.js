import React from 'react';
import classes from './Card.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import IconButtons from './IconButton';

const h = window.innerHeight;

const CardTry = (props) => {
  const navigate = useNavigate();

  const instructionHandle = () => {
    navigate('/gameInstructins');
  };

  return (
    <Card
      align="center"
      sx={{
        minWidth: 275,
        width: '100%',
        height: '100vh',
        backgroundColor: 'black',
        border: '2px solid black',
        backgroundSize: '100% 100%', // Set backgroundSize to '100% 100%'
        backgroundImage:
          'url(https://www.turnock.co.uk/wp-content/uploads/2020/10/Pubs-Beer-Gardens-1-1.jpg)',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CardContent sx={{ height: '100%' }}>
        <Typography sx={{ fontSize: 14, width: '70%' }} color="white" gutterBottom>
          {props.children}
          <br />
          <img
            width="100%"
            src="https://th.bing.com/th/id/R.940aed1937543cea3803a7961d82cd3f?rik=lGhDQIx8%2bWqecQ&riu=http%3a%2f%2fwww.pewresearch.org%2fwp-content%2fuploads%2f2019%2f03%2fFT.19.03.05_drinkingReligiosity_featured.jpg&ehk=3BdiG9dAaDPAdYcQDPEOz9w%2byHnt%2fZxqEld2NWpMX9E%3d&risl=&pid=ImgRaw&r=0"
          />
        </Typography>
        <br />
        <Typography variant="h5" component="div">
          <Button size="large" variant="contained" onClick={instructionHandle}>
            עמוד הוראות
          </Button>
        </Typography>
        <br />
        <br />
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <IconButtons />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardTry;