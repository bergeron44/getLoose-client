// reducers/liveGameReducer.js
import {
    FETCH_LIVEGAMES,
    CREATE_LIVEGAME,
    UPDATE_LIVEGAME,
    DELETE_LIVEGAME,
    SET_GAME_TYPE,
    SET_WAITER_APPROVE,
    SET_BAR,
    SET_TABLE_NAME,
    SET_TABLE_NUMBER,
    SET_PACKAGE,
    SET_PLAYERS_NAMES
} from '../actionTypes';

// Initialize the state
const initialState = {
    liveGames: [],
    gameType: "",
    waiterApprove: false,
    bar: "",
    tableName: "",
    tableNumber: 666,
    package: [],
    playersNames: "",
};

// Reducer function for live games
const liveGameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIVEGAMES:
            return {
                ...state,
                liveGames: action.payload,
            };
        case CREATE_LIVEGAME:
            return {
                ...state,
                liveGames: [...state.liveGames, action.payload],
            };
        case UPDATE_LIVEGAME:
            return {
                ...state,
                liveGames: state.liveGames.map(game =>
                    game._id === action.payload._id ? action.payload : game
                ),
            };
        case DELETE_LIVEGAME:
            return {
                ...state,
                liveGames: state.liveGames.filter(game => game._id !== action.payload),
            };
        case SET_GAME_TYPE:
            return {
                ...state,
                gameType: action.payload,
            };
        case SET_WAITER_APPROVE:
            return {
                ...state,
                waiterApprove: action.payload,
            };
        case SET_BAR:
            return {
                ...state,
                bar: action.payload,
            };
        case SET_TABLE_NAME:
            return {
                ...state,
                tableName: action.payload,
            };
        case SET_TABLE_NUMBER:
            return {
                ...state,
                tableNumber: action.payload,
            };
        case SET_PACKAGE:
            return {
                ...state,
                package: action.payload,
            };
        case SET_PLAYERS_NAMES:
            return {
                ...state,
                playersNames: action.payload,
            };
        default:
            return state;
    }
};

export default liveGameReducer;