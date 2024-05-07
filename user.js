import axios from 'axios'
import {GET_USER_VALUE} from '../constants/users'
import{SET_USER_RIGHT_OR_WRONG} from '../constants/users'



export const setLastUser = (user) => async dispatch => {
    // do logic for getting to server side (axios.get('someurl)) // not relevant for this action
    const returnUser = await  axios.post(`https://rightordrink-server.onrender.com/api/user/create`,user)
    await dispatch({type:GET_USER_VALUE, payload: returnUser.data})
    
}
export const setIfUserRight = (ansStatus) => async dispatch => {
    if(ansStatus)
    await dispatch({type:SET_USER_RIGHT_OR_WRONG, payload: true})
    else
    await dispatch({type:SET_USER_RIGHT_OR_WRONG, payload: false})
    
}
export const updateUserCode = (userId,newCode) => async dispatch => {
    // do logic for getting to server side (axios.get('someurl)) // not relevant for this action
    const updateUser= await axios.post(`https://rightordrink-server.onrender.com/api/user/${userId}/edit`,{
       code:newCode
    })
    await dispatch({type:GET_USER_VALUE, payload: updateUser.data})
    
    
}

