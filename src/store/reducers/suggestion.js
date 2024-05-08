import {SET_SUGGESTION_VALUE} from '../constants/suggestion';

const initialState = {
    lastSuggestion:{}
}


export default (state = initialState, action) => {
    const {type,payload} = action
    switch(type){
        case SET_SUGGESTION_VALUE:{
            return {
                ...state,
                lastSuggestion: payload
            }
        }    
        default:
            return state;
    }
}