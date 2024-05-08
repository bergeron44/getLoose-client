import React ,{useEffect}from 'react'
import Button from '../components/UI/Button'
import UserComp from '../components/UserComp'
import { createGame, setGameId, setGameQuestions } from '../store/actions/theGame'
import classes  from './LobbyPage.module.css'
import {useNavigate} from 'react-router'
import {useDispatch, useSelector} from 'react-redux';


const LobbyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameSize = useSelector(state => state.theGameReducer.gameSize)
  const category = useSelector(state => state.theGameReducer.categoryName)
  const gametable = useSelector(state => state.theGameReducer.gameTable)
  const gameQuestion = useSelector(state => state.theGameReducer.gameQuestions)
  const gameCompany = useSelector(state => state.theGameReducer.gameLocation)
  const gamePlayers = useSelector(state => state.tableReducer.tableUsers) 
  
  useEffect(()=>{
     if(gameSize && category){
       dispatch(setGameQuestions(gameSize,category))
     }
  },[gameSize, category])
//////////////////////
  //////example to check
  //////////////////////
    const userArr=[
    {userName:"ron berger",numOfPointForGame:0,numOfPointOverAll:999,thisGameCompany:"HOBIT",code:445566},
    {userName:"liat berger",numOfPointForGame:0,numOfPointOverAll:999,thisGameCompany:"HOBIT",code:445566},
    {userName:"haim berger",numOfPointForGame:0,numOfPointOverAll:800,thisGameCompany:"HOBIT",code:445566},
    {userName:"gil berger",numOfPointForGame:0,numOfPointOverAll:67,thisGameCompany:"HOBIT",code:445566},
    {userName:"dvir adaar",numOfPointForGame:0,numOfPointOverAll:1,thisGameCompany:"ADMOND",code:445566}]
  //////////////////////
  //////end example to check
  //////////////////////
  const startGameHandler =(event) =>{
     event.preventDefault();
    // console.log(gametable)
    // console.log(gameCompany)
    // console.log(gameQuestion)
    // console.log(gameSize)
    // console.log(gamePlayers)

    

    dispatch(createGame(gameSize,gameQuestion,gameCompany,gametable))//להביא לו את הערכים מהסטור
    
    navigate('/gameQuestion')
    //navigate('/gameQuestion')
  }
  return (
    <div>
        <table className={classes.table}>
            <thead className={classes.table}>
                <tr className={classes.table}>
                    <th className={classes.table}>שם השחקן</th> <th className={classes.table}> נקודות המשחק </th> <th className={classes.table}>נקודות בהכ מכל המשחקים</th> <th className={classes.table}>הבר</th> <th className={classes.table}>code</th>
                </tr>
            </thead>
            <tbody className={classes.table}>
              {/* <tr>{gameSize}</tr>
              <tr>{gametable}</tr>
              <tr>{gameQuestion}</tr>
              <tr>{gameSize}</tr>
              <tr>{gamePlayers}</tr>
              <tr>{category}</tr> */ 
              // alert(JSON.stringify(gameQuestion))
              
              }
        {gametable.allUsers?.map(user =>(<UserComp user={user}/>))}
         </tbody>
         </table>
         <Button onClick={startGameHandler}>להתחלת המשחק</Button>
        
        
    </div>
  )
}

export default LobbyPage