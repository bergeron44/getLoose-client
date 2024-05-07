import React, {useState,useRef, useEffect} from 'react'
import classes from './TimeComp.module.css'
import CardTwo from './UI/CardTwo'
import {useNavigate} from 'react-router'


const TimeCompOld = (props) => {
const navigate= useNavigate();
const intervalRef  = useRef(null)
const [timer,setTimer]=useState('00:00:00');
function getTimeRemaining(endtime){
    const total = Date.parse(endtime)-Date.parse(new Date());
    const seconds= Math.floor((total/1000)%60);
    const minutes= Math.floor((total/1000/60)%60);
    const hours= Math.floor((total/1000*60*60)%24);
    const days= Math.floor(total/(1000*60*60*24));
    return{
    total, days, hours,minutes,seconds
    };
}

function startTimer(deadline)
{
    let {total ,days ,hours,minutes,seconds}=getTimeRemaining(deadline);

     if(total>=0)
     {
        setTimer(
            (hours >9 ? hours : '0'+hours)+ ':'+
            (minutes >9 ? minutes : '0'+minutes)+ ':'+
            (seconds >9 ? seconds : '0'+seconds)

        )
     }else{
        alert('the timer is end')
        clearInterval(intervalRef.current);
        navigate(props.page)
     }
}

function clearTimer(endtime)
{
    setTimer('00:00:40')
    if(intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(()=>{
        startTimer(endtime);
    },1000)
    intervalRef.current= id;
}

function getDeadlineTime(){
    let deadline= new Date();
    deadline.setSeconds(deadline.getSeconds()+props.time);
    return deadline;
}
useEffect(()=>{
clearTimer(getDeadlineTime());
return () => {if(intervalRef.current) clearInterval(intervalRef.current)}
},[])

function onClickResetBtn(){
    if(intervalRef.current) clearInterval(intervalRef.current)
    clearTimer(getDeadlineTime());
}
// function endTimer(){
//     if(timer=='00:00:00')
//     {

//     }
    
// }

  return (
    <div>
      <h1>{timer}</h1> 
    </div>
  )
}

export default TimeCompOld