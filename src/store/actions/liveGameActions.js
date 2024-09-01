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
    UPDATE_APPROVAL_FAILURE,
    UPDATE_LIVEGAME_FAILURE
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
        const response = await fetch(`${BASE_URL}/api/livegame`);
        const data = await handleResponse(response);
        dispatch({ type: FETCH_LIVEGAMES, payload: data });
    } catch (error) {
        console.error('Failed to fetch live games:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: FETCH_LIVEGAMES_FAILURE, payload: error.message });
    }
};

// Fetch all live games
export const fetchLiveGamesFromSameBar = (BarId) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/livegame`);
        const data = await handleResponse(response);
        console.log(data)
        const filteredLiveGames = [];
           for (let i = 0; i < data.length; i++) {
             const liveGame = data[i];
                if (liveGame.bar=== BarId) {
                    filteredLiveGames.push(liveGame);
                 }
              }
        dispatch({ type: FETCH_LIVEGAMES, payload: filteredLiveGames });
    } catch (error) {
        console.error('Failed to fetch live games:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: FETCH_LIVEGAMES_FAILURE, payload: error.message });
    }
};


// Create a new live game
export const createLiveGame = (newLiveGame) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/livegame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLiveGame),
        });
        const data = await handleResponse(response);
        dispatch({ type: CREATE_LIVEGAME, payload: data });
        return data; // Return data for further processing
    } catch (error) {
        console.error('Failed to create live game:', error);
        // Optionally dispatch an error action here
        // dispatch({ type: CREATE_LIVEGAME_FAILURE, payload: error.message });
        throw error; // Re-throw error to be handled in the component
    }
};

// Update an existing live game
export const updateLiveGame = (id, updatedLiveGame) => async (dispatch) => {
    try {
        console.log("insid:"+id);
        console.log("insid:"+updatedLiveGame);
        const response = await fetch(`${BASE_URL}/api/livegame/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLiveGame),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await handleResponse(response);
        dispatch({ type: UPDATE_LIVEGAME, payload: data });
    } catch (error) {
        console.error('Failed to update live game:', error);
        dispatch({ type: UPDATE_LIVEGAME_FAILURE, payload: error.message });
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

// Update approval status
export const updateApprovalStatus = (gameId, approved) => async (dispatch) => {
    try {
        console.log(approved);
        console.log(gameId)
        const updatedLiveGame = { waiterApprove: approved };
        await updateLiveGame(gameId, updatedLiveGame);
        dispatch({ type: UPDATE_APPROVAL_SUCCESS, payload: { gameId, approved } });
    } catch (error) {
        dispatch({ type: UPDATE_APPROVAL_FAILURE, payload: error.message });
    }
};
