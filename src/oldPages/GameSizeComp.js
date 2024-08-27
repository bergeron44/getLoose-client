import React from 'react'
import Button from '@mui/material/Button'
import Classes from './GameSizeComp.module.css'
import { setGameSize } from '../store/actions/theGame'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router'

const GameSizeComp = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  //בודק עם נעשה האתמאה בקומפוננטה האחרונה
  const gameCategory=useSelector((state) => state.theGameReducer.categoryName);

    const handleClickOnGameSize = () => {
      dispatch(setGameSize(props.gameSize))
      navigate('/CreatorLoginPage')
    //navigate('/CreatorLoginPage')
    }
  return (
    <div>
    {/*() => {alert(JSON.stringify(props.gameSize))}}> */}
  <Button size='large'  variant='outlined' onClick={handleClickOnGameSize}>
<table>
  <tbody>
  <tr>
    <td><h1>{props.gameSize.size}: גודל המשחק הוא </h1></td>
    <td><h1>מספר השאלות שהיו במשחק : {props.gameSize.numberOfQuestion}</h1></td>
    <td><h1>מחיר המשחק שבקלים : {props.gameSize.price}</h1></td>
    <td>{gameCategory}</td>
  </tr>
  </tbody>
</table>
 </Button>
    </div>
  )
}

export default GameSizeComp