import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';

export default function IconButtons() {
    const navigate=useNavigate()
    const clickHandler=()=>{
     navigate('/')
    }
  return (
         <button onClick={clickHandler}>
        <IconButton aria-label="Home"  size="large">
        <HomeIcon fontSize="inherit"/>
        </IconButton>
        </button>
  );
}