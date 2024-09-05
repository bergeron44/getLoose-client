import { 
    FETCH_BARS, 
    CREATE_BAR, 
    UPDATE_BAR, 
    DELETE_BAR, 
    FETCH_BAR_PACKAGES, 
    SET_CURRENT_BAR, 
    SET_LOADING, 
    SET_ERROR,
    SET_BAR_NAME
} from '../actionTypes';

// Define the base URL
const BASE_URL = 'https://getloose-server.onrender.com';

// Set loading state
const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

// Set error state
const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

// Set the current bar name
export const setBarName = (name) => ({
    type: SET_BAR_NAME,
    payload: name,
});

// Fetch all bars
export const fetchBars = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`${BASE_URL}/api/bars`);
        if (!response.ok) throw new Error('Failed to fetch bars');
        const data = await response.json();
        dispatch({ type: FETCH_BARS, payload: data });
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Create a new bar
export const createBar = (newBar) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`${BASE_URL}/api/bar/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBar),
        });
        if (!response.ok) throw new Error('Failed to create bar');
        const data = await response.json();
        dispatch({ type: CREATE_BAR, payload: data });
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Update an existing bar by ID
export const updateBar = (id, updatedBar) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`${BASE_URL}/api/bars/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBar),
        });
        if (!response.ok) throw new Error('Failed to update bar');
        const data = await response.json();
        dispatch({ type: UPDATE_BAR, payload: data });
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Delete a bar by ID
export const deleteBar = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`${BASE_URL}/api/bars/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete bar');
        dispatch({ type: DELETE_BAR, payload: id });
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Fetch all packages for a specific bar by ID
export const fetchBarPackages = (barId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        alert(barId);
        const response = await fetch(`${BASE_URL}/api/bars/${barId}/packages`);
        if (!response.ok) throw new Error('Failed to fetch bar packages');
        const data = await response.json();
        
        // Ensure that data is always an array
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format');
        }
        
        dispatch({ type: FETCH_BAR_PACKAGES, payload: data });
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Set the current bar
export const setCurrentBar = (bar) => ({
    type: SET_CURRENT_BAR,
    payload: bar,
});
