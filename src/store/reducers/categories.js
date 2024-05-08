import {SET_ALLCATEGORIES_VALUE} from '../constants/categories'
import { setAllCategoryName } from '../actions/categories'

const initialState = {
    categories:[],
}


export default (state = initialState, action) => {
    const {type,payload} = action
    switch(type){
        case SET_ALLCATEGORIES_VALUE:{
            return {
                ...state,
                categories: payload
        }
         
        }
        default:
            return state;
    }
}