import React, {useState, useEffect} from 'react'
import CategoryComp from '../components/CategoryComp'
import classes from './ChooseCategoryPage.module.css'
import {useDispatch, useSelector} from 'react-redux';

const ChooseCategoryPage = () => {
  const dispatch = useDispatch();
 
  const allCategory = useSelector((state) => state.categoriesReducer.categories)
  return (
    <div className={classes.tableWrapper} >
     
    <table className={classes.flTable}>
        <thead>
        <tr>
          <h2 className={classes.h2}>
          תבחר קטגוריה
          </h2>
        </tr>
        </thead>
       <tbody>
        {allCategory?.map(category =>(
        
         <CategoryComp category={category}/>
         
        ))} 
        </tbody>
        </table>
        
     </div>
  )
}

export default ChooseCategoryPage