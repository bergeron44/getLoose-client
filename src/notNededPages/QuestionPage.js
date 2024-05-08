import React from 'react'
import AnswerComp from '../components/AnswerComp'
import QuestionComp from '../components/QuestionComp'
import CardTwo from '../components/UI/CardTwo'
import Classes from './QuestionPage.module.css'
import TimeComp from '../components/TimeComp'
import {useDispatch, useSelector} from 'react-redux';
import { setGameId } from '../store/actions/theGame'

 


const QuestionPage = () => {
  const dispatch=useDispatch();
  const theGame = useSelector(state => state.theGameReducer.theGame)
  const allQuestion = useSelector(state => state.theGameReducer.gameQuestions)
  const currentQuestionNum=useSelector(state => state.theGameReducer.questionNum)
  // alert(JSON.stringify(allQuestion))
  alert("we are in question number :"+currentQuestionNum)
  dispatch(setGameId(theGame._id))
  let question
  if(currentQuestionNum<allQuestion.length)
  {
    question=allQuestion[currentQuestionNum]
  }
  else
  {
     question={
      title:"how is the best",
      answer1:{answer:"ron",rightAnswer:true},
      answer2:{answer:"anaelle",rightAnswer:false},
      answer3:{answer:"nina",rightAnswer:false},
      answer4:{answer:"dany",rightAnswer:false}
    }
  }
  

  ///////real code
 
  //else
  //end game


  //כל שאלות המשחק
  /* <TimeComp time={40} page={'/gameFeedback'}/> */
  return (
    <div>
        <CardTwo>
            <table className={Classes.table}>
            
            <tr className={Classes.tr}><td><TimeComp timestamp={(Date.now() + 40 * 1000) + 2} page={'/gameFeedback'}/></td><td> <h1>השאלה היא: וכמות הזמן שנותר לענות על האלה-</h1></td></tr>
                <tr className={Classes.tr}><QuestionComp title={question.title}/></tr>
                <tr className={Classes.tr}><AnswerComp answer={question.answer1.answer} rightAnswer={question.answer1.rightAnswer} /></tr>
                <tr className={Classes.tr}><AnswerComp answer={question.answer2.answer} rightAnswer={question.answer2.rightAnswer} /></tr>
                <tr className={Classes.tr}><AnswerComp answer={question.answer3.answer} rightAnswer={question.answer3.rightAnswer} /></tr>
                <tr className={Classes.tr}><AnswerComp answer={question.answer4.answer} rightAnswer={question.answer4.rightAnswer} /></tr>
            </table>
        </CardTwo>
    </div>
  )
}

export default QuestionPage