//שתי קומפוננתות אחד משוב חיובי אחד שלילי
import React from 'react'
import WrongComp from '../components/WrongComp'
import RightComp from '../components/RightComp'
import {useNavigate} from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addNumOfQuestion } from '../store/actions/theGame'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import TimeCompOld from '../components/TimeCompOld'

const FeedbackPage = () => {
  const dispatch=useDispatch();
  const navigate= useNavigate();
  //לקבל אם היוזר צדק או טעה פה
  const category = useSelector(state => state.theGameReducer.category)
  const trueAnswer=useSelector(state=>state.usersReducer.userAnsStatus);
  const currentQuestionNum=useSelector(state => state.theGameReducer.questionNum)
  //מיותר ,להביא לפה את התשובות הנכונות
  const rightAnswer="שמע אתה חד היום"
  const wrongAnswer="תוריד שוט בזמן המוקצב"

  
  const nextQuestionHandle=()=>
  {
  dispatch(addNumOfQuestion(currentQuestionNum))
   navigate('/gameNewQuestion')
   
  }
  const nextCategoryHandle=()=>
  {
    dispatch(addNumOfQuestion(0))
   navigate('/gameNewCategory')
  }
  const endGameHandle=()=>
  {
    dispatch(addNumOfQuestion(0))
    alert('בחיים אין טיפים חינם')
   navigate('/')
  }
  return (
    <Card>
    <TimeCompOld time={60} page={'/'}/>
    {trueAnswer ? <RightComp rightAnswer={rightAnswer}/> :
    <WrongComp wrongAnswer={wrongAnswer}/>}
     <br/><br/>
    <Button  onClick={nextQuestionHandle}>{category.categoryName} המשך לשאלה בקטגוריה  </Button>
    <br/><br/>
    <Button  onClick={nextCategoryHandle}> המשך לשאלה בקטגוריה אחרת</Button>
    <br/><br/>
    <Button  onClick={endGameHandle}> סיים משחק ותזכה בטיפ לחיים</Button>

    
    </Card>
  )
}

export default FeedbackPage