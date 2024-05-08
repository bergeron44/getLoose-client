import {SET_ALLCOMPANYS_VALUE} from '../constants/companies'

const initialState = {
    companies:[],
}


export default (state = initialState, action) => {
    const {type,payload} = action
    switch(type){
        case SET_ALLCOMPANYS_VALUE:{
            return {
                ...state,
                companies: payload
            }
         
        }
        default:
            return state;
    }
}