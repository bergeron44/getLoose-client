import React, { useState ,useEffect} from 'react'
import {useNavigate} from 'react-router'
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import classes from '../components/LoginComp.module.css'
import { setGameTable,createGameTable } from '../store/actions/theGame';
import { setCode, setCreator, setUser } from '../store/actions/table';
import { updateUserCode } from '../store/actions/user';




const CreatorEnterCode = () => {
  const creator = useSelector(state => state.tableReducer.tableCreator) 
  alert(creator.userName)
  const navigate = useNavigate()
  const dispatch=useDispatch();
  useEffect(()=>{
    if(creator!=undefined)
    {
      dispatch(createGameTable(creator))
    }
    
  },[creator])

  const table = useSelector(state => state.theGameReducer.gameTable)
  
    const [enterCode,setEnteredCode]= useState(0);
    const codeChange= (event) =>
    {
      setEnteredCode(parseInt(event.target.value))
    }
    const setCodeHandler=(event) =>{
        event.preventDefault();
        // alert("the table code is:"+table.code)
        if(enterCode!==table.code){
          //if fails check the types of each variable.
          
          setEnteredCode(0)
          return alert("the code is wrong thet the code= "+table.code);
        }
        else
        {
          dispatch(updateUserCode(creator._id,table.code))
          dispatch(setCode(table._id))
          creator.code=table.code;
          dispatch(setCreator(creator))
          dispatch(setUser(creator))
          //ושולח אותה ללובי
          setEnteredCode(0)
          navigate('/gameLobby')
        }
       
        //navigate('/gameLobby')
    }
  return (
    <Card className={classes.input}>
    <form onSubmit={setCodeHandler}>

     <label htmlFor='code'>Code</label>
     <input id="code" type="number" value={enterCode} onChange={codeChange}/>

     <Button type='submit'> הקוד בידי!!</Button>
    </form>
   </Card>
  )
}

export default CreatorEnterCode