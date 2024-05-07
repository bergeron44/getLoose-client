import React from 'react'
import classes from './QuestionComp.module.css'
import CardTwo from './UI/CardTwo'

const QuestionComp = (props) => {
  return (
   <div>
    <CardTwo>
    <h1 className={classes.h1}>{props.title}</h1>
    </CardTwo>
   </div>
  )
}

export default QuestionComp