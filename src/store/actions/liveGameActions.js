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
        const response = await fetch('/api/livegame');
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
        const response = await fetch('/api/livegame', {
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
        const response = await fetch(`/api/livegame/${id}`, {
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
        const response = await fetch(`/api/livegame/${id}`, { method: 'DELETE' });
        await handleResponse(response);
        dispatch({ type: DELETE_LIVEGAME, payload: id });
    } catch (error) {
        console.error('Failed to delete live game:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: DELETE_LIVEGAME_FAILURE, payload: error.message });
    }
};
export const setGameType = (gameType) => ({
    type: SET_GAME_TYPE,
    payload: gameType,
});

export const setWaiterApprove = (waiterApprove) => ({
    type: SET_WAITER_APPROVE,
    payload: waiterApprove,
});

export const setBar = (bar) => ({
    type: SET_BAR,
    payload: bar,
});

export const setTableName = (tableName) => ({
    type: SET_TABLE_NAME,
    payload: tableName,
});

export const setTableNumber = (tableNumber) => ({
    type: SET_TABLE_NUMBER,
    payload: tableNumber,
});

export const setPackage = (packageData) => ({
    type: SET_PACKAGE,
    payload: packageData,
});

export const setPlayersNames = (playersNames) => ({
    type: SET_PLAYERS_NAMES,
    payload: playersNames,
});
