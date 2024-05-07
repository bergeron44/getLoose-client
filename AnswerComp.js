import React from 'react'
import CardTwo from './UI/CardTwo'
import Button from './UI/Button'
import {useNavigate} from 'react-router'
import { useDispatch } from 'react-redux'
import { setIfUserRight } from '../store/actions/user'
 

const AnswerComp = (props) => {
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const answerHandle=()=>{
    if(props.rightAnswer)
    {
      dispatch(setIfUserRight(true))
      alert("you was right congrats")
      //לקבל את היוזר שעשה את הפעולה ולהוסיף לא ניקוד בהתאם לתשובה
    }
    else
    {
      dispatch(setIfUserRight(false))
      alert("loser you were wrong")
    }
    navigate('/gameFeedback')
  }
  return (
    <div>
     
      <Button  variant='contained' onClick={answerHandle}><h1>{props.answer}</h1></Button>
     
    </div>
  )
}

export default AnswerComp