import {GET_ALLUSERS_VALUE} from '../constants/users'
import{GET_USER_VALUE} from '../constants/users'
import{SET_USER_RIGHT_OR_WRONG} from '../constants/users'

const initialState = {
    users:[],
    lastUser:{},
    userAnsStatus:false
}


export default (state = initialState, action) => {
    const {type,payload} = action
    switch(type){
        case GET_ALLUSERS_VALUE:{
            return {
                ...state,
                users: payload
            }
        }
        case SET_USER_RIGHT_OR_WRONG:{
            return {
                ...state,
                userAnsStatus: payload
            }
        }
        case GET_USER_VALUE:{
                return {
                    ...state,
                    lastUser: payload
                }
         
        }
        default:
            return state;
    }
}