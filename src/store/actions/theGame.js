import axios from 'axios'
import { SET_CATEGORY } from '../constants/theGame'
import { SET_GAME_SIZE } from '../constants/theGame'
import { SET_GAME_TABLE } from '../constants/theGame'
import { SET_GAME_QUESTIONS } from '../constants/theGame'
import { SET_GAME_COMPANY } from '../constants/theGame'
import{SET_WINNERS} from '../constants/theGame'
import{SET_GAME_ID} from '../constants/theGame'
import{SET_GAME} from '../constants/theGame'
import{SET_GAME_NUMQUESTION} from '../constants/theGame'


export const addNumOfQuestion = (currentQuestionNum) => async dispatch => {
   const newQuestionNum=currentQuestionNum+1;
   console.log(newQuestionNum)
    await dispatch({type:SET_GAME_NUMQUESTION, payload: newQuestionNum})
}
export const setCategory = (category) => async dispatch => {

    await dispatch({type:SET_CATEGORY, payload: category})
}
export const setGameCompany = (companyName) => async dispatch => {
    const data = await axios.get(`http://localhost:3001/api/company/${companyName}`)

    await dispatch({type:SET_GAME_COMPANY, payload: data.data})
}
export const setGameSize = (gameSize) => async dispatch => {
    await dispatch({type:SET_GAME_SIZE, payload: gameSize})
}
export const createGameTable = (creator) => async dispatch => {
    const table = await axios.post(`http://localhost:3001/api/table/create`,{
        allUsers:[{_id:creator._id}],
        creator:{_id:creator._id},
        tableName:""+creator._id
    })
    console.log(table.data.code)
    const tableToReturn={
    allUsers:[creator],
    creator:creator,
    tableName:"founder"+creator._id,
    code:table.data.code,
    _id:table.data._id
    }
    await dispatch({type:SET_GAME_TABLE, payload: tableToReturn})
}
export const setGameTable = (table) => async dispatch => {
   
    await dispatch({type:SET_GAME_TABLE, payload: table})
}

export const setGameQuestions = (catName) => async dispatch => {
    
    let j,k;
    const data = await axios.get(`https://rightordrink-server.onrender.com/api/questions/category/${catName}`)
    let array=data.data;

    for (let i = array.length -1; i > 0; i--) {
         j = Math.floor(Math.random() * i)
         k = array[i]
         array[i] = array[j]
         array[j] = k
  }
    await dispatch({type:SET_GAME_QUESTIONS, payload: array})
}
export const setGameId = (gameId) => async dispatch => {
    await dispatch({type:SET_GAME_ID, payload: gameId})
}
export const createGame = (gameSize,gameQuestion,gameCompany,table) => async dispatch => {
    const game = await axios.post(`https://rightordrink-server.onrender.com/api/game/create`,{
        location:gameCompany,
        table:table,
        gameSize:gameSize,
        theGameQuestions:gameQuestion,
        gameStart:true

    })

    await dispatch({type:SET_GAME, payload: game.data})
    
}
export const endGame = (gameId) => async dispatch => {
    const game = await axios.post(`https://rightordrink-server.onrender.com/api/game/${gameId}/endGame`)
    return " now the game ending";
    
}
export const deleteGame = (gameId) => async dispatch => {
    const game = await axios.post(`https://rightordrink-server.onrender.com/api/game/${gameId}/delete`)
    return " deleted";
    
}
export const setWinnersTable = (code,gameId) => async dispatch => {
    const data = await axios.get(`https://rightordrink-server.onrender.com/api/table/${code}/top`)
    const winners=await axios.post(`https://rightordrink-server.onrender.com/api/game/${gameId}/update`,{
        winnersTable:data})
    dispatch({type:SET_WINNERS, payload: data})
}
