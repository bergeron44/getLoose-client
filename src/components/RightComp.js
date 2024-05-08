import React from 'react'
import classes from './RightComp.module.css'
import CardTwo from './UI/Card'

const RightComp = (props) => {
  return (
    <div>
    
      <h1>{props.rightAnswer}</h1><br/>
      <img src='https://previews.123rf.com/images/bankrx/bankrx1810/bankrx181000134/109366960-grunge-green-correct-with-star-icon-round-rubber-seal-stamp-on-white-background.jpg' width='100%' alt='correct answer'></img>
      {/* <img src='https://ranjandesilva.files.wordpress.com/2015/10/right-answer.jpg' alt='right answer'></img> */}
    
      </div>
  )
}

export default RightComp