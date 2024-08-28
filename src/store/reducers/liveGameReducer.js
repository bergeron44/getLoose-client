import { FETCH_LIVEGAMES, CREATE_LIVEGAME, UPDATE_LIVEGAME, DELETE_LIVEGAME } from '../actionTypes';

// Initialize the state as an empty array
const initialState = [];

// Reducer function for live games
const liveGameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIVEGAMES:
            // Replace the state with the fetched live games
            return action.payload;
        case CREATE_LIVEGAME:
            // Add the newly created live game to the state
            return [...state, action.payload];
        case UPDATE_LIVEGAME:
            // Update the live game in the state if its ID matches
            return state.map(game =>
                game._id === action.payload._id ? action.payload : game
            );
        case DELETE_LIVEGAME:
            // Remove the live game with the given ID from the state
            return state.filter(game => game._id !== action.payload);
        default:
            // Return the current state if no action matches
            return state;
    }
};

export default liveGameReducer;
