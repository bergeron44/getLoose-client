// barsActions.js
import { FETCH_BARS, CREATE_BAR, UPDATE_BAR, DELETE_BAR } from './actionTypes';

export const fetchBars = () => async (dispatch) => {
    const response = await fetch('/api/bars');
    const data = await response.json();
    dispatch({ type: FETCH_BARS, payload: data });
};

export const createBar = (newBar) => async (dispatch) => {
    const response = await fetch('/api/bars', {
        method: 'POST',
        body: JSON.stringify(newBar),
    });
    const data = await response.json();
    dispatch({ type: CREATE_BAR, payload: data });
};

export const updateBar = (id, updatedBar) => async (dispatch) => {
    const response = await fetch(`/api/bars/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedBar),
    });
    const data = await response.json();
    dispatch({ type: UPDATE_BAR, payload: data });
};

export const deleteBar = (id) => async (dispatch) => {
    await fetch(`/api/bars/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_BAR, payload: id });
};
