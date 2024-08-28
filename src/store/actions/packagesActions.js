import { FETCH_PACKAGES, CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE } from '../actionTypes';

export const fetchPackages = () => async (dispatch) => {
    try {
        const response = await fetch('/api/packages');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        dispatch({ type: FETCH_PACKAGES, payload: data });
    } catch (error) {
        console.error('Failed to fetch packages:', error);
        // Optionally dispatch an error action here
    }
};

export const createPackage = (newPackage) => async (dispatch) => {
    try {
        const response = await fetch('/api/packages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Added headers
            body: JSON.stringify(newPackage),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        dispatch({ type: CREATE_PACKAGE, payload: data });
    } catch (error) {
        console.error('Failed to create package:', error);
        // Optionally dispatch an error action here
    }
};

export const updatePackage = (id, updatedPackage) => async (dispatch) => {
    try {
        const response = await fetch(`/api/packages/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }, // Added headers
            body: JSON.stringify(updatedPackage),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        dispatch({ type: UPDATE_PACKAGE, payload: data });
    } catch (error) {
        console.error('Failed to update package:', error);
        // Optionally dispatch an error action here
    }
};

export const deletePackage = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        dispatch({ type: DELETE_PACKAGE, payload: id });
    } catch (error) {
        console.error('Failed to delete package:', error);
        // Optionally dispatch an error action here
    }
};
