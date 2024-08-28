// barsReducer.js
import { FETCH_BARS, CREATE_BAR, UPDATE_BAR, DELETE_BAR } from './actions';

const initialState = [];

const barsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BARS:
            return action.payload;
        case CREATE_BAR:
            return [...state, action.payload];
        case UPDATE_BAR:
            return state.map(bar => bar._id === action.payload._id ? action.payload : bar);
        case DELETE_BAR:
            return state.filter(bar => bar._id !== action.payload);
        default:
            return state;
    }
};

export default barsReducer;