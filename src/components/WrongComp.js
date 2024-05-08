import React from 'react'
import Card from './UI/Card'
import classes from './WrongComp.module.css'

const WrongComp = (props) => {
  return (
    
    <div>
      <h1>{props.wrongAnswer}</h1><br/>
<img src='https://th.bing.com/th/id/R.eadae3054fac51a50be5c487d1309963?rik=t4NnxFt%2ffNIB%2fw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fA504R6%2fmen-drinking-shots-at-a-bar-A504R6.jpg&ehk=CCK7fPL31dKfM%2bv70G8U90kWrP8axgyXQHEX8eU8DkM%3d&risl=&pid=ImgRaw&r=0' width="600" alt='wrong answer'></img>
    </div>
    
  )
}

export default WrongComp