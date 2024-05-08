import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router'
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import classes from '../components/LoginComp.module.css'
import { setAllCompanys } from '../store/actions/companies';
import { setLastUser } from '../store/actions/user';
import { createCreator } from '../store/actions/table';
import { setGameCompany } from '../store/actions/theGame';
import {useDispatch, useSelector} from 'react-redux';
///ניסוי
import axios from 'axios'

//ניסוי התחלה
// const CreatorLoginPage = () => {
//   const bildUser=async function (user){
//       axios.post(`http://localhost:3001/api/user/create`,user).then(Response =>{
//       return Response.data
//     })}
   
  //ניסוי סוף
  const CreatorLoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allCompanys = useSelector(state => state.companiesReducer.companies)
    
    useEffect(()=>{
      dispatch(setAllCompanys())
      
    },[])
    // const getAllCompanyName= (allCompanys) =>
    // {
    //   let allCompanyName=[]
    //   allCompanys.forEach(company => {
    //     allCompanyName.push(company.companyName)
    //   });
    //   return allCompanyName
    // }
    const [enterUserName,setEnteredUserName]= useState('');
    const [enterCompany,setEnteredCompany]= useState('/');
    const userNameChange= (event) =>
    {
      setEnteredUserName(event.target.value)
    }
    const companyChange= (event) =>
    {
      setEnteredCompany(event.target.value)
    }
   
    const loginHandler=(event) =>{
        event.preventDefault();
        
        //validtion
        if(enterCompany==='/')
          return alert("no company enter");
        if(enterUserName.trim().length===0)
          return alert("user name is unvalid");
       //תקשורת עם ה -סטור
         const dataBaseUser={userName:enterUserName,joinGame:true}
         alert("him i make creator : "+dataBaseUser.userName)
         dispatch(createCreator( dataBaseUser))
         dispatch(setLastUser(dataBaseUser))
        // const creatorToReturn={
        //   code:creator.code,
        //   joinGame:creator.joinGame,
        //   numberOfGames:creator.numberOfGames,
        //   pointAllGames:creator.pointAllGames,
        //   pointForGame:creator.pointForGame,
        //   userName:creator.userName,
        //   __v:creator.__v,
        //   _id:creator._id
        //   }
        dispatch(setGameCompany(enterCompany))
         //לשלוח את הקוד לחברה שהוכנס השם שלה
        setEnteredCompany('/')
        setEnteredUserName('')
        navigate('/creatorEnterCode')
       // navigate('/creatorEnterCode')
    }
  
  return (

    <Card className={classes.input}>
    <form onSubmit={loginHandler}>

     <label htmlFor='username'>UserName</label>
     <input id="username" type="text" value={enterUserName} onChange={userNameChange}/>

     <label htmlFor='company'>choose a company</label>
     <select className={classes.select} id="company" value={enterCompany} onChange={companyChange}>
      <option value="/">choose a company</option>
      {allCompanys?.map(company => (<option value={company._id}>{company.companyName}</option>))}
     </select>
     <Button type='submit'>ליצירת שולחן וקבלת קוד</Button>
    </form>
   </Card>
  )
}

export default CreatorLoginPage