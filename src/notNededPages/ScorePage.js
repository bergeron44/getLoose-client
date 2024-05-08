import React, { useEffect } from 'react'
import UserComp from '../components/UserComp'
import Card from '../components/UI/Card'
import classes from './ScorePage.module.css'
import TimeComp from '../components/TimeComp'
import { useNavigate } from 'react-router'
import { addNumOfQuestion } from '../store/actions/theGame'
import {useDispatch, useSelector} from 'react-redux';



const ScorePage =()=> {
  const currentQuestionNum=useSelector(state => state.theGameReducer.questionNum)
  const gametable = useSelector(state => state.theGameReducer.gameTable)
const gamePlayers = useSelector(state => state.tableReducer.tableUsers)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  
//////////////////////
  //////example to check
  //////////////////////
  const users=[
    {userName:"ron berger",numOfPointForGame:0,numOfPointOverAll:999,thisGameCompany:"HOBIT",code:445566},
    {userName:"liat berger",numOfPointForGame:0,numOfPointOverAll:999,thisGameCompany:"HOBIT",code:445566},
    {userName:"haim berger",numOfPointForGame:0,numOfPointOverAll:800,thisGameCompany:"HOBIT",code:445566},
    {userName:"gil berger",numOfPointForGame:0,numOfPointOverAll:67,thisGameCompany:"HOBIT",code:445566},
    {userName:"dvir adaar",numOfPointForGame:0,numOfPointOverAll:1,thisGameCompany:"ADMOND",code:445566}]
  //////////////////////
  //////end example to check
  //////////////////////

  //real option
  // const users=gametable.allUsers;
  // const users=gamePlayers;

  const buttonHandle=()=>{
    dispatch(addNumOfQuestion(currentQuestionNum))
   navigate('/gameQuestion')
  }
  return (
    <Card className={classes.users} >
      <TimeComp timestamp={(Date.now() + 20 * 1000) + 2} page={'/gameQuestion'}/>
      {/* {if(props.numOfQuestionLeft>0){
        <TimeComp time={10} page={'gameQuestion'}/>
      }
      else
      {
        <TimeComp time={100} page={'gamePrize'}/>
      }
      } */}
    <table>
      <tbody>
    {users.map(user => (
        <UserComp user={user}/>
    )
    )}
    <tr><button onClick={buttonHandle}>לשאלה הבאה</button></tr>
     </tbody>
    </table>
    
    </Card>
  )
}

export default ScorePage