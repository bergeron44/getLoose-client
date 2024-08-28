// packagesReducer.js
import { FETCH_PACKAGES, CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE } from '../actionTypes'; 

// Your reducer code here

const initialState = [];

const packagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PACKAGES:
            return action.payload;
        case CREATE_PACKAGE:
            return [...state, action.payload];
        case UPDATE_PACKAGE:
            return state.map(pkg => pkg._id === action.payload._id ? action.payload : pkg);
        case DELETE_PACKAGE:
            return state.filter(pkg => pkg._id !== action.payload);
        default:
            return state;
    }
};

export default packagesReducer;