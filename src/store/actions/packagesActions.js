
// packagesActions.js
import { FETCH_PACKAGES, CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE } from './actionTypes';

export const fetchPackages = () => async (dispatch) => {
    // Fetch packages from the API
    const response = await fetch('/api/packages');
    const data = await response.json();
    dispatch({ type: FETCH_PACKAGES, payload: data });
};

export const createPackage = (newPackage) => async (dispatch) => {
    const response = await fetch('/api/packages', {
        method: 'POST',
        body: JSON.stringify(newPackage),
    });
    const data = await response.json();
    dispatch({ type: CREATE_PACKAGE, payload: data });
};

export const updatePackage = (id, updatedPackage) => async (dispatch) => {
    const response = await fetch(`/api/packages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPackage),
    });
    const data = await response.json();
    dispatch({ type: UPDATE_PACKAGE, payload: data });
};

export const deletePackage = (id) => async (dispatch) => {
    await fetch(`/api/packages/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_PACKAGE, payload: id });
};




