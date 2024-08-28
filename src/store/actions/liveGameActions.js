import { FETCH_LIVEGAMES, CREATE_LIVEGAME, UPDATE_LIVEGAME, DELETE_LIVEGAME } from '../actionTypes';

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
    }
};

// Delete a live game
export const deleteLiveGame = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/livegame/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        dispatch({ type: DELETE_LIVEGAME, payload: id });
    } catch (error) {
        console.error('Failed to delete live game:', error);
        // Optionally dispatch an error action here
    }
};
