import React from 'react'
import IconButton from './UI/IconButton'
import Carousel from './Carousel';
import './InstructinsPage.module.css';
import SwipeIcon from '@mui/icons-material/Swipe';


const InstructinsPage = () => {
  return (
    <div>
      <table className='table' ><h1>עמוד הוראות</h1></table><br/>
      <SwipeIcon/>
      <Carousel/>
   <br/>
    <IconButton/>
     
    </div>
    
  )
}

export default InstructinsPage


