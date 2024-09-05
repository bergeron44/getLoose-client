import {
    FETCH_PACKAGES,
    CREATE_PACKAGE,
    UPDATE_PACKAGE,
    DELETE_PACKAGE,
    SET_CURRENT_PACKAGE,
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

// Fetch all packages
export const fetchPackages = () => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/packages`);
        const data = await handleResponse(response);
        dispatch({ type: FETCH_PACKAGES, payload: data });
    } catch (error) {
        console.error('Failed to fetch packages:', error);
        // Optionally dispatch an error action here
    }
};

// Create a new package
export const createPackage = (newPackage) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/package/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPackage),
        });
        const data = await handleResponse(response);
        dispatch({ type: CREATE_PACKAGE, payload: data });
        dispatch({ type: SET_CURRENT_PACKAGE, payload: data._id }); // Set the newly created package as current
    } catch (error) {
        console.error('Failed to create package:', error);
        // Optionally dispatch an error action here
    }
};
export const setPackage = (newPackage) => async (dispatch) => {
    try {
        dispatch({ type: SET_CURRENT_PACKAGE, payload: newPackage }); // Set the newly created package as current
    } catch (error) {
        console.error('Failed to set package:', error);
        // Optionally dispatch an error action here
    }
};

// Update an existing package
export const updatePackage = (id, updatedPackage) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/packages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPackage),
        });
        const data = await handleResponse(response);
        dispatch({ type: UPDATE_PACKAGE, payload: data });
        dispatch({ type: SET_CURRENT_PACKAGE, payload: data._id }); // Set the updated package as current
    } catch (error) {
        console.error('Failed to update package:', error);
        // Optionally dispatch an error action here
    }
};

// Delete a package
export const deletePackage = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/api/packages/${id}`, { method: 'DELETE' });
        await handleResponse(response);
        dispatch({ type: DELETE_PACKAGE, payload: id });
        dispatch({ type: SET_CURRENT_PACKAGE, payload: null }); // Clear the current package if it was deleted
    } catch (error) {
        console.error('Failed to delete package:', error);
        // Optionally dispatch an error action here
    }
};
