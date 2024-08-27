import React, { useState } from 'react'
import classes from './AddQuestionPage.module.css'
import Card from './UI/Card';
import Button from './UI/Button';
import { useDispatch } from 'react-redux';
import { addCategory, addQuestion } from '../store/actions/postFunction';
import { json } from 'react-router';

    
const AddCategoryPage = () => {
    const dispatch=useDispatch()
    const [enterCategory,setEnteredCategory]= useState('');
    const [enterUrl,setEnteredUrl]= useState('');
    
   
    const categoryChange= (event) =>
    {
        setEnteredCategory(event.target.value)
    }
   
    const urlChange= (event) =>
    {
        setEnteredUrl(event.target.value)
    }
    const submitHandler=(event) =>{
        event.preventDefault();
        let dataBaseCategory
        //validtion
        //להוסיף שהקוד שונה מהקוד שהמשחק גינרט
        if((enterCategory.trim().length===0)||(enterUrl.trim().length===0))
        {
            alert("not all fields arr full ")
            return;
        }
        dataBaseCategory={categoryName:enterCategory,img:enterUrl}
        
        
        dispatch(addCategory(dataBaseCategory))
        //מעביר אובייקט יוזר לדאטא ולשולחן שנוצר
        //ומרענן את הדך ושולח אלרט של תודה רבה הנתונים יתקבלו בהצלחה
        alert(JSON.stringify(dataBaseCategory)+"  ---"+ "תודה רבה הקטגוריה התקבלה")
        
        setEnteredCategory('')
        setEnteredUrl('')
    }
  return (

    <Card className={classes.input}>
    <form onSubmit={submitHandler}>

     <label htmlFor='category'>put category</label><br/>
     <input id="category" type="text" value={enterCategory} onChange={categoryChange}/><br/>

     <label htmlFor='photo'>put url for photo</label><br/>
     <input id="photo" type="text" value={enterUrl} onChange={urlChange}/><br/>

     <Button type='submit'>submit category</Button>
    </form>
   </Card>
  )
}

export default AddCategoryPage