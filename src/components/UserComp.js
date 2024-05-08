import React from 'react'
import classes from './UserComp.module.css'


const UserComp = (props) => {
  return (
    // <td>{JSON.stringify(props.user)}</td>
    <tr className={classes.table}>
      <td className={classes.table}>
         {props.user.userName}
      </td>
      <td className={classes.table}>
          {props.user.numOfPointForGame}
      </td>
      <td className={classes.table}>
        {props.user.numOfPointOverAll}
     </td>
     <td className={classes.table}>
        {props.user.thisGameCompany}
     </td>
     <td className={classes.table}>
        {props.user.code}
     </td>
     </tr>
     
  )
}

export default UserComp