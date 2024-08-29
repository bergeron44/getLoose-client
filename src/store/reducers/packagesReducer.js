import { FETCH_PACKAGES, CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE, SET_CURRENT_PACKAGE } from '../actionTypes'; 

const initialState = {
    packages: [], // List of all packages
    currentPackage: null, // Field to track the currently selected or active package
};

const packagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PACKAGES:
            return {
                ...state,
                packages: action.payload
            };
        case CREATE_PACKAGE:
            // Add the newly created package to the list and set it as the current package
            return {
                ...state,
                packages: [...state.packages, action.payload],
                currentPackage: action.payload
            };
        case UPDATE_PACKAGE:
            // Update the existing package in the list and set it as the current package
            return {
                ...state,
                packages: state.packages.map(pkg => pkg._id === action.payload._id ? action.payload : pkg),
                currentPackage: action.payload
            };
        case DELETE_PACKAGE:
            // Remove the package from the list
            return {
                ...state,
                packages: state.packages.filter(pkg => pkg._id !== action.payload),
                currentPackage: state.currentPackage && state.currentPackage._id === action.payload ? null : state.currentPackage
            };
        case SET_CURRENT_PACKAGE:
            // Set the current package based on payload
            return {
                ...state,
                currentPackage: state.packages.find(pkg => pkg._id === action.payload) || null
            };
        default:
            return state;
    }
};

export default packagesReducer;
