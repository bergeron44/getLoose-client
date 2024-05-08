import React,{useState} from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CardTwo from '../components/UI/CardTwo';
import { deleteGame, endGame } from '../store/actions/theGame';

const PrizePage = () => {
     const dispatch=useDispatch();
     const[randomNum,setRandomNum]=useState(0)
     useEffect(()=>{
      setRandomNum(Math.floor(Math.random()*prizes.length))
    },[prizes])
    const gameId = useSelector(state => state.theGameReducer.gameId)
    const gameCompany = useSelector(state => state.theGameReducer.gameLocation)
    const prizes=gameCompany.prizes
    const endGameHandler=()=>{
      //end game function
      dispatch(endGame(gameId)) 
      dispatch(deleteGame(gameId)) 
      //end game function
    }
  return (
    <CardTwo>
    <p>
        <h1>your prize is:</h1>

       <h1>{prizes[randomNum]} </h1>
    </p>
    <button onClick={endGameHandler}>סיים משחק</button>
    </CardTwo>
    
  )
}

export default PrizePage