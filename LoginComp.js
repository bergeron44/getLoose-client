import React, { useState } from 'react'
import Card from './UI/Card';
import Button from './UI/Button';
import classes from './LoginComp.module.css'
import {  setLastUser } from '../store/actions/user';
import { setUser,createUser } from '../store/actions/table';
import {useNavigate} from 'react-router'
import {useDispatch, useSelector} from 'react-redux';
import { setGameTable } from '../store/actions/theGame';
 



const LoginComp = (props) => {
  const navigate = useNavigate()
    const dispatch=useDispatch()
    const table= useSelector(state=> state.theGameReducer.gameTable)
    const tableCode = useSelector(state => state.tableReducer.tableCode)
    const [enterUserName,setEnteredUserName]= useState('');
    const [enterCode,setEnteredCode]= useState(0);

    const userNameChange= (event) =>
    {
      setEnteredUserName(event.target.value)
    }
    const codeChange= (event) =>
    {
      setEnteredCode(parseInt(event.target.value))
    }
    
    const loginHandler=(event) =>{
        event.preventDefault();
        //validtion
        //שם לא תקין
        if(enterUserName.trim().length===0)
        {
          setEnteredCode(0)
          setEnteredUserName('')
          return alert("the name is unvalid");

        }
          
        //אני בודק עם הקוד שהכניסו שווה לקוד של הטייבל
        if(enterCode!==tableCode)
        {
        setEnteredCode(0)
        setEnteredUserName('')
        return alert("the code is wrong");
        }
          
         const dataBaseUser={userName:enterUserName,code:enterCode,joinGame:true} 
         const playerToAdd=dispatch(setLastUser(dataBaseUser))
         dispatch(createUser(enterUserName,playerToAdd._id,tableCode));//לא בטוח צריך סט יוזר
         table.allUsers.push(playerToAdd);
         dispatch(setGameTable(table));
        ////////////////////
        //אולי צריך לבנות פעולה אפדייט לשולחן
        /////////////////////
        setEnteredCode(0)
        setEnteredUserName('')
        navigate('/gameLobby')
       // navigate('/gameLobby')
    }
  return (

    <Card className={classes.input}>
    <form onSubmit={loginHandler}>

     <label htmlFor='username'>UserName</label>
     <input id="username" type="text" value={enterUserName} onChange={userNameChange}/>

     <label htmlFor='code'>Code</label>
     <input id="code" type="number" value={enterCode} onChange={codeChange}/>

     <Button type='submit'>להתחלת משחק</Button>
    </form>
   </Card>
  )
}

export default LoginComp