import React from 'react'
import classes from './List.module.css'

const List = (props) => {
  return (
    <ul className={classes.ul}>
       { props.objects.map(Object => {
    <li className={classes.ul-li}>
        <h1>{Object}</h1>
    </li>
      })
    }
    </ul>
    
  )
}

export default List