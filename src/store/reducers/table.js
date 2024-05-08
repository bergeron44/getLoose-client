import {SET_TABLE_CODE} from '../constants/table';
import {SET_TABLE_CREATOR} from '../constants/table';
import { SET_TABLE_USER } from '../constants/table';


const initialState = {
    tableCode:0,
    tableCreator:{},
    tableUsers:[],
}


export default (state = initialState, action) => {
    const {type,payload} = action
    switch(type){
        case SET_TABLE_CODE:
            return {
                ...state,
                tableCode: payload,
            }
        case SET_TABLE_USER:{
            const newAllUsers=state.tableUsers.push(payload)
            return {...state, tableUsers:newAllUsers }
        }
           
        case SET_TABLE_CREATOR:
            {
                return {
                    ...state, 
                    tableCreator: payload,
                }
               
            }
                
       default:
            return state;
    }
}