import axios from 'axios'
import { SET_TABLE_CREATOR} from '../constants/table'
import { SET_TABLE_USER } from '../constants/table'
import { SET_TABLE_CODE } from '../constants/table'

export const createUser = (userName,userId=0,tableCode) => async dispatch => {
    const userToAdd= await axios.get(`http://localhost:3001/api/user/name/${userName}`)
    if(userId>0)
    {
        const data = await axios.post(`http://localhost:3001/api/table/${tableCode}/${userId}/enterGame`)
    
        // const updatedtable=data.data.updatedtable;
        // const newUser=data.data.newUser;
       
    }
    
    console.log(userToAdd.data)
    await dispatch({type:SET_TABLE_USER, payload: userToAdd.data})
}
export const setUser = (user) => async dispatch => {
   
    await dispatch({type:SET_TABLE_USER, payload: user})
}
export const createCreator = (createor) => async dispatch => {
    const returnUser = await  axios.post(`https://rightordrink-server.onrender.com/api/user/create`,createor)
    await dispatch({type:SET_TABLE_CREATOR, payload: returnUser.data})
}
export const setCreator = (createor) => async dispatch => {
    
    await dispatch({type:SET_TABLE_CREATOR, payload: createor})
}
export const setCode = (tableId) => async dispatch => {
    const data = await axios.get(`https://rightordrink-server.onrender.com/api/table/id/${tableId}`)
    await dispatch({type:SET_TABLE_CODE, payload: data.data.code})
}
export const createTable = (user) => async dispatch => {
    const table = await axios.post(`https://rightordrink-server.onrender.com/api/table/create`,{
        allUsers:[{_id:user._id}],
        creator:{_id:user._id},
        tableName:"  founder  "+user._id
    })
    return table.data;
    
}