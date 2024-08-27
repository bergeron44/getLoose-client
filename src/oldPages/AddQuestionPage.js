import React, { useState } from 'react'
import classes from './AddQuestionPage.module.css'
import Card from './UI/Card';
import Button from './UI/Button';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../store/actions/postFunction';
import { json } from 'react-router';

    
const AddQuestionPage = () => {
    const dispatch=useDispatch()
    const [enterQuestion,setEnteredQuestion]= useState('');
    const [enterAnswer1,setEnteredAnswer1]= useState('');
    const [enterAnswer2,setEnteredAnswer2]= useState('');
    const [enterAnswer3,setEnteredAnswer3]= useState('');
    const [enterAnswer4,setEnteredAnswer4]= useState('');
    const [enterCategory,setEnteredCategory]= useState('');
    const [enterTheNumOfCorructAnswer,setEnteredTheNumOfCorructAnswer]= useState(0);
    const questionChange= (event) =>
    {
        setEnteredQuestion(event.target.value)
    }
    const answer1Change= (event) =>
    {
        setEnteredAnswer1(event.target.value)
    }
    const answer2Change= (event) =>
    {
        setEnteredAnswer2(event.target.value)
    }
    const answer3Change= (event) =>
    {
        setEnteredAnswer3(event.target.value)
    }
    const answer4Change= (event) =>
    {
        setEnteredAnswer4(event.target.value)
    }
    const categoryChange= (event) =>
    {
        setEnteredCategory(event.target.value)
    }
    const rightAnswerChange= (event) =>
    {
        setEnteredTheNumOfCorructAnswer(event.target.value)
    }
    const submitHandler=(event) =>{
        event.preventDefault();
        let dataBaseQuestion
        //validtion
        //להוסיף שהקוד שונה מהקוד שהמשחק גינרט
        if((enterQuestion.trim().length===0)||(enterAnswer1.trim().length===0)||(enterAnswer2.trim().length===0)||(enterAnswer3.trim().length===0)||(enterAnswer4.trim().length===0)||(enterCategory.trim().length===0)||(enterTheNumOfCorructAnswer===0))
        {
            alert("not all fields arr full ")
            return;
        }
        if(enterTheNumOfCorructAnswer==1)
        {
            dataBaseQuestion={title:enterQuestion,answer1:{answer:enterAnswer1,rightAnswer:true},answer2:{answer:enterAnswer2},answer3:{answer:enterAnswer3},answer4:{answer:enterAnswer4},category:enterCategory}
        }
        else if(enterTheNumOfCorructAnswer==2)
        {
            dataBaseQuestion={title:enterQuestion,answer1:{answer:enterAnswer1},answer2:{answer:enterAnswer2,rightAnswer:true},answer3:{answer:enterAnswer3},answer4:{answer:enterAnswer4},category:enterCategory}
        }
        else if(enterTheNumOfCorructAnswer==3)
        {
            dataBaseQuestion={title:enterQuestion,answer1:{answer:enterAnswer1},answer2:{answer:enterAnswer2},answer3:{answer:enterAnswer3,rightAnswer:true},answer4:{answer:enterAnswer4},category:enterCategory}
        }
        else
        {
            dataBaseQuestion={title:enterQuestion,answer1:{answer:enterAnswer1},answer2:{answer:enterAnswer2},answer3:{answer:enterAnswer3},answer4:{answer:enterAnswer4,rightAnswer:true},category:enterCategory}
        }
        
        dispatch(addQuestion(dataBaseQuestion))
        //מעביר אובייקט יוזר לדאטא ולשולחן שנוצר
        //ומרענן את הדך ושולח אלרט של תודה רבה הנתונים יתקבלו בהצלחה
        alert(JSON.stringify(dataBaseQuestion)+"  ---"+ "תודה רבה השאלה התקבלה")
        setEnteredQuestion('')
        setEnteredAnswer1('')
        setEnteredAnswer2('')
        setEnteredAnswer3('')
        setEnteredAnswer4('')
        setEnteredCategory('')
        setEnteredTheNumOfCorructAnswer(0)
    }
  return (

    <Card className={classes.input}>
    <form onSubmit={submitHandler}>

     <label htmlFor='question'>enter question</label><br/>
     <input id="question" type="text" value={enterQuestion} onChange={questionChange}/><br/>

     <label htmlFor='answer1'>put answer 1</label><br/>
     <input id="answer1" type="text" value={enterAnswer1} onChange={answer1Change}/><br/>

     <label htmlFor='answer2'>put answer 2</label><br/>
     <input id="answer2" type="text" value={enterAnswer2} onChange={answer2Change}/><br/>

     <label htmlFor='answer3'>put answer 3</label><br/>
     <input id="answer3" type="text" value={enterAnswer3} onChange={answer3Change}/><br/>

     <label htmlFor='answer4'>put answer 4</label><br/>
     <input id="answer4" type="text" value={enterAnswer4} onChange={answer4Change}/><br/>

     <label htmlFor='category'>put category</label><br/>
     <input id="category" type="text" value={enterCategory} onChange={categoryChange}/><br/>


     <label htmlFor='rightAnswer'>מה התשובה הנכונה</label>
     <select className={classes.select} id="rightAnswer" value={enterTheNumOfCorructAnswer} onChange={rightAnswerChange}>
        <option value={0} type="Number">no right answer choose yet</option>
        <option value={1} type="Number">answer1</option>
        <option value={2} type="Number">answer2</option>
        <option value={3} type="Number">answer3</option>
        <option value={4} type="Number">answer4</option>
     </select><br/>
     <Button type='submit'>submit question</Button>
    </form>
   </Card>
  )
}

export default AddQuestionPage