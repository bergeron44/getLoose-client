import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router'
import Button from './UI/Button';
import classes from '../components/LoginComp.module.css'
import { setLastUser } from '../store/actions/user';
import { createCreator } from '../store/actions/table';
import {useDispatch, useSelector} from 'react-redux';
///ניסוי
import axios from 'axios'
import CardTry from './UI/CardTry';

  const EnterUserName = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
  
    const [enterUserName,setEnteredUserName]= useState('');
    const [enterBar,setEnteredBar]= useState('');
    const userNameChange= (event) =>
    {
      setEnteredUserName(event.target.value)
    }
    const barChange= (event) =>
    {
      setEnteredBar(event.target.value)
    }
   
    const loginHandler=(event) =>{
        event.preventDefault();
        
        //validtion
        if((enterUserName.trim().length===0)||(enterBar.trim().length===0))
          return alert("user name is unvalid");
       //תקשורת עם ה -סטור
         const dataBaseUser={userName:enterUserName,barName:enterBar,joinGame:true}
         dispatch(createCreator( dataBaseUser))
         //לשלוח את הקוד לחברה שהוכנס השם שלה
        setEnteredUserName('')
        setEnteredBar('')
        navigate('/gameNewCategory')
       // navigate('/creatorEnterCode')
    }
  
  return (

    <CardTry className={classes.input}>
    <form onSubmit={loginHandler}>

     <label htmlFor='username'><h1>Enter  Name  </h1></label>
     <input   id="username" type="text" value={enterUserName} onChange={userNameChange}/><br/>

     <label htmlFor='bar'><h1> Enter Bar Name  </h1></label>
     <input   id="bar" type="text" value={enterBar} onChange={barChange}/><br/><br/>

     <Button type='submit'>   התחל את המשחק </Button>
    </form>
   </CardTry>
  )
}

export default EnterUserName