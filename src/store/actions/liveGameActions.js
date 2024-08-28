// liveGameActions.js
import { FETCH_LIVEGAMES, CREATE_LIVEGAME, UPDATE_LIVEGAME, DELETE_LIVEGAME } from './actionTypes';

export const fetchLiveGames = () => async (dispatch) => {
    const response = await fetch('/api/livegame');
    const data = await response.json();
    dispatch({ type: FETCH_LIVEGAMES, payload: data });
};

export const createLiveGame = (newLiveGame) => async (dispatch) => {
    const response = await fetch('/api/livegame', {
        method: 'POST',
        body: JSON.stringify(newLiveGame),
    });
    const data = await response.json();
    dispatch({ type: CREATE_LIVEGAME, payload: data });
};

export const updateLiveGame = (id, updatedLiveGame) => async (dispatch) => {
    const response = await fetch(`/api/livegame/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedLiveGame),
    });
    const data = await response.json();
    dispatch({ type: UPDATE_LIVEGAME, payload: data });
};

export const deleteLiveGame = (id) => async (dispatch) => {
    await fetch(`/api/livegame/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_LIVEGAME, payload: id });
};
