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
    SET_PLAYERS_NAMES,
    SET_CURRENT_GAME_ID,
    UPDATE_APPROVAL_SUCCESS,
    UPDATE_APPROVAL_FAILURE
} from '../actionTypes';

// Define the base URL
const BASE_URL = 'http://localhost:3001';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Network response was not ok.');
    }
    return response.json();
};

// Fetch all live games
export const fetchLiveGames = () => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/livegames`);
        const data = await handleResponse(response);
        dispatch({ type: FETCH_LIVEGAMES, payload: data });
    } catch (error) {
        console.error('Failed to fetch live games:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: FETCH_LIVEGAMES_FAILURE, payload: error.message });
    }
};

// Create a new live game
export const createLiveGame = (newLiveGame) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/livegames`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLiveGame),
        });
        const data = await handleResponse(response);
        dispatch({ type: CREATE_LIVEGAME, payload: data });
    } catch (error) {
        console.error('Failed to create live game:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: CREATE_LIVEGAME_FAILURE, payload: error.message });
    }
};

// Update an existing live game
export const updateLiveGame = (id, updatedLiveGame) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/livegames/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLiveGame),
        });
        const data = await handleResponse(response);
        dispatch({ type: UPDATE_LIVEGAME, payload: data });
    } catch (error) {
        console.error('Failed to update live game:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: UPDATE_LIVEGAME_FAILURE, payload: error.message });
    }
};

// Delete a live game
export const deleteLiveGame = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/livegames/${id}`, { method: 'DELETE' });
        await handleResponse(response);
        dispatch({ type: DELETE_LIVEGAME, payload: id });
    } catch (error) {
        console.error('Failed to delete live game:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: DELETE_LIVEGAME_FAILURE, payload: error.message });
    }
};

// Set game type
export const setGameType = (gameType) => ({
    type: SET_GAME_TYPE,
    payload: gameType,
});

// Set waiter approval status
export const setWaiterApprove = (waiterApprove) => ({
    type: SET_WAITER_APPROVE,
    payload: waiterApprove,
});

// Set the current bar
export const setBar = (bar) => ({
    type: SET_BAR,
    payload: bar,
});

// Set table name
export const setTableName = (tableName) => ({
    type: SET_TABLE_NAME,
    payload: tableName,
});

// Set table number
export const setTableNumber = (tableNumber) => ({
    type: SET_TABLE_NUMBER,
    payload: tableNumber,
});

// Set package data
export const setPackage = (packageData) => ({
    type: SET_PACKAGE,
    payload: packageData,
});

// Set players names
export const setPlayersNames = (playersNames) => ({
    type: SET_PLAYERS_NAMES,
    payload: playersNames,
});

// Set the current game ID
export const setCurrentGameId = (gameId) => ({
    type: SET_CURRENT_GAME_ID,
    payload: gameId,
});
export const updateApprovalStatus = (gameId, approved) => async (dispatch) => {
    try {
        const updatedLiveGame = { waiterApprove: approved };
        await updateLiveGame(gameId, updatedLiveGame);
        dispatch({ type: UPDATE_APPROVAL_SUCCESS, payload: { gameId, approved } });
    } catch (error) {
        dispatch({ type: UPDATE_APPROVAL_FAILURE, payload: error.message });
    }
};
