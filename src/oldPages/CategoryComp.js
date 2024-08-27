import React from 'react'
//import Button from './UI/Button'
import Button from '@mui/material/Button'
import classes from '../pages/ChooseCategoryPage.module.css'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import { setCategory } from '../store/actions/theGame'

const CategoryComp = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

    const handleClickOnCategory = () => {
      dispatch(setCategory(props.category))
      navigate('/gameSize')
      //navigate('/gameSize')
    }
  return (
    <tr className={classes.flTable}>
      <Button size='large'  variant='outlined' onClick={handleClickOnCategory}>

    <td>{props.category}</td>
     {/* <img src={props.category.img}/> */}

     </Button>
     </tr>
    
  )
}

export default CategoryComp