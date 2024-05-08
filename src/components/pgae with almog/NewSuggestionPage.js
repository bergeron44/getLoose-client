import React, {useState} from 'react'
import styles from './NewSuggestionPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestion, setValue } from '../../store/actions/suggestion'
import { Button, Card} from '@mui/material'
import { useNavigate } from 'react-router'
import classes from '../LoginComp.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const NewSuggestionPage = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch() 
  const [enterType,setEnteredType]= useState('question');
    const [enterSuggestion,setEnteredSuggestion]= useState('');

    const typeChange= (event) =>
    {
      setEnteredType(event.target.value)
    }
    const SuggestionChange= (event) =>
    {
      setEnteredSuggestion(event.target.value)
    }

    const loginHandler=(event)=>{
      let data
      event.preventDefault();
      //validtion
      //שם לא תקין

      if(enterSuggestion.trim().length===0)
      {
       return alert('לא הכנסת הצעה אמיתית')
      }
      else
      {
        if(enterType=='question')
        {
          data={answer:enterSuggestion,type:'QUESTION'} 
          
        }
        else
        {
          data={answer:enterSuggestion,type:'CATEGORY'} 
        }
          
        dispatch(setSuggestion(data))
      }
       
        alert("תודה רבה על ההצעה");

      
        
      //אני בודק עם הקוד שהכניסו שווה לקוד של הטייבל

      setEnteredSuggestion('')
      setEnteredType('/')
      navigate('/')
     // navigate('/gameLobby')
  }
  
  return (
    <Card>
    <form onSubmit={loginHandler}>

     <label htmlFor='type'>choose a type</label>
     <select className={classes.select} id="type" value={enterType} onChange={typeChange}>
      <option value="/">בחר סוג הצעה</option>
      <option value="question">שאלה</option>
      <option value="category">קטגוריה</option>
     </select><br/><br/>

     
        {/* <InputLabel id="typetow">בחר מה תירצה להציע</InputLabel><br/>
        <Select 
          labelId="typetow"
          id="typetow-select"
          value={enterType}
          label="type"
          onChange={typeChange}
        >
          <MenuItem value="question">שאלה</MenuItem>
          <MenuItem value="category">קטגוריה</MenuItem>
         
        </Select><br/><br/> */}
      

    <label htmlFor='suggestion'>הצעות</label><br/>
    <input id="suggestion" type="text" value={enterSuggestion} onChange={SuggestionChange}/><br/><br/>

    <Button variant="contained" size="large" type='submit'>הגש הצעה </Button>
   </form>
   </Card>
  )
  }

export default NewSuggestionPage