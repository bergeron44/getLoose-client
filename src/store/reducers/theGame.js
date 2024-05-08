import {SET_CATEGORY} from '../constants/theGame';
import {SET_GAME_SIZE} from '../constants/theGame';
import { SET_GAME_TABLE } from '../constants/theGame';
import { SET_GAME_QUESTIONS } from '../constants/theGame';
import { SET_GAME_COMPANY } from '../constants/theGame';
import {SET_WINNERS} from '../constants/theGame';
import {SET_GAME_ID} from '../constants/theGame';
import {SET_GAME} from '../constants/theGame';
import {SET_GAME_NUMQUESTION} from '../constants/theGame';

const initialState = {
    category:{},
    gameSize: {
        size: 'SHORT',
        price: undefined,
        gameNumOfQuestions: undefined
    },
    gameTable:{},
    gameQuestions:{},
    gameLocation:{},
    gameWinners:{},
    gameId:"",
    theGame:{},
    questionNum:0,
}


export default (state = initialState, action) => {
    const {type,payload} = action
    switch(type){
        case SET_CATEGORY:
            return {
                ...state,
                category: payload
            }
        case SET_GAME_SIZE:
            return {...state, gameSize: payload}
        case SET_GAME_QUESTIONS:
                return {...state, gameQuestions: payload}
        case SET_GAME_TABLE:
            return {...state, gameTable: payload}
        case SET_GAME_COMPANY:
            return {...state, gameLocation: payload}
        case SET_WINNERS:
            return {...state,gameWinners: payload}
        case SET_GAME_ID:
                return {...state,gameId: payload}
        case SET_GAME:
                    return {...state,theGame: payload}
        case SET_GAME_NUMQUESTION:
                        return {...state,questionNum: payload}
       default:
            return state;
    }
}