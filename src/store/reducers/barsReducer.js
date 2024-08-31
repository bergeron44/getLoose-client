import { FETCH_BARS, CREATE_BAR, UPDATE_BAR, DELETE_BAR, SET_CURRENT_BAR } from '../actionTypes'; // Adjust path to point to actionTypes.js

const initialState = {
    bars: [], // List of all bars
    barPackages: [],       
    currentBar: {}, // Field to track the currently selected or active bar
};

const barsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BARS:
            return { ...state, bars: action.payload }; // Update the list of bars
        case CREATE_BAR:
            return { ...state, bars: [...state.bars, action.payload] }; // Add a new bar to the list
        case UPDATE_BAR:
            return { 
                ...state, 
                bars: state.bars.map(bar => bar._id === action.payload._id ? action.payload : bar) // Update an existing bar
            };
        case DELETE_BAR:
            return { 
                ...state, 
                bars: state.bars.filter(bar => bar._id !== action.payload) // Remove a bar from the list
            };
        case SET_CURRENT_BAR:
            return { 
                ...state, 
                currentBar: state.bars.find(bar => bar._id === action.payload) || null // Set the current bar based on payload
            };
        case 'FETCH_BAR_PACKAGES_SUCCESS':
            return {
                ...state,
                barPackages: action.payload,
            };
        case 'FETCH_BAR_PACKAGES_FAILURE':
            return {
                ...state,
                barPackages: [],
            };
        default:
            return state;
    }
};

export default barsReducer;
