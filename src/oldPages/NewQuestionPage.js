import React from 'react'
import AnswerComp from './AnswerComp'
import QuestionComp from './QuestionComp'
import CardTwo from './UI/CardTwo'
import Classes from './QuestionPage.module.css'
import TimeComp from './TimeComp'
import {useDispatch, useSelector} from 'react-redux';
import { setGameId } from '../store/actions/theGame'
import { editCategory } from '../store/actions/postFunction'

 


const NewQuestionPage = () => {
  const dispatch=useDispatch()
  const category = useSelector(state => state.theGameReducer.category)
  const allQuestion = useSelector(state => state.theGameReducer.gameQuestions)
  const currentQuestionNum=useSelector(state => state.theGameReducer.questionNum)
  let question
  if(currentQuestionNum===1)
  {
    dispatch(editCategory(category._id,allQuestion.length))
  }
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
  

  
  return (
    <div>
        {/* <CardTwo> */}
            <table className={Classes.table} align='center'>
            <thead>
            <tr><QuestionComp title={question.title}/></tr>
            </thead>
                <tbody>
                <tr ><AnswerComp answer={question.answer1.answer} rightAnswer={question.answer1.rightAnswer} /></tr>
                <tr ><AnswerComp answer={question.answer2.answer} rightAnswer={question.answer2.rightAnswer} /></tr>
                <tr ><AnswerComp answer={question.answer3.answer} rightAnswer={question.answer3.rightAnswer} /></tr>
                <tr ><AnswerComp answer={question.answer4.answer} rightAnswer={question.answer4.rightAnswer} /></tr>
                </tbody>

            </table>
        {/* </CardTwo> */}
    </div>
  )
}

export default NewQuestionPage