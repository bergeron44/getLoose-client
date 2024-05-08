import {GET_ALLUSERS_VALUE} from '../constants/users'
import axios from 'axios'

export const setAllGameUsers = (code) => async dispatch => {
    // do logic for getting to server side (axios.get('someurl)) // not relevant for this action
    const data = await axios.get(`https://rightordrink-server.onrender.com/api/users/code/${code}`)
    const users=[]
    let i=0;
    data.data.map(user =>{
        users[i]={userName:user.userName,code:user.code,numOfGames:user.numOfGames,numOfPointForGame:user.numOfPointForGame,numOfPointAllTime:user.numOfPointAllTime};
        i++;
    })
    await dispatch({type:GET_ALLUSERS_VALUE, payload: users})
}

