// liveGameReducer.js
import { FETCH_LIVEGAMES, CREATE_LIVEGAME, UPDATE_LIVEGAME, DELETE_LIVEGAME } from './actions';

const initialState = [];

const liveGameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIVEGAMES:
            return action.payload;
        case CREATE_LIVEGAME:
            return [...state, action.payload];
        case UPDATE_LIVEGAME:
            return state.map(game => game._id === action.payload._id ? action.payload : game);
        case DELETE_LIVEGAME:
            return state.filter(game => game._id !== action.payload);
        default:
            return state;
    }
};

export default liveGameReducer;
