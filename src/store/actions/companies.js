import {SET_ALLCOMPANYS_VALUE} from '../constants/companies'
import axios from 'axios'

export const setAllCompanys = () => async dispatch => {
    // do logic for getting to server side (axios.get('someurl)) // not relevant for this action
    const companies = await axios.get(`https://rightordrink-server.onrender.com/api/companys`)
   
    await dispatch({type:SET_ALLCOMPANYS_VALUE, payload: companies.data})
}
// export const getAllCategoriesName = () => async dispatch  => {
//     // do logic for getting to server side (axios.get('someurl)) // not relevant for this action
//     const data = await axios.get(`http://localhost:3000/api/categorys`)
//     const categories=[]
//     let i=0;
//     data.map(category =>{
//         categories[i]=category.categoryName;
//         i++;
//     })
//     return categories;
// }

