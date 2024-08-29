// Packages
export const FETCH_PACKAGES = 'FETCH_PACKAGES';
export const CREATE_PACKAGE = 'CREATE_PACKAGE';
export const UPDATE_PACKAGE = 'UPDATE_PACKAGE';
export const DELETE_PACKAGE = 'DELETE_PACKAGE';
export const SET_CURRENT_PACKAGE = 'SET_CURRENT_PACKAGE'; // Add this line

// Bars
export const FETCH_BARS = 'FETCH_BARS';
export const CREATE_BAR = 'CREATE_BAR';
export const UPDATE_BAR = 'UPDATE_BAR';
export const DELETE_BAR = 'DELETE_BAR';
export const SET_BAR_NAME='SET_BAR_NAME';
export const FETCH_BAR_PACKAGES = 'FETCH_BAR_PACKAGES'; // Action type for fetching bar packages
export const SET_CURRENT_BAR = 'SET_CURRENT_BAR'; // Action type for setting the current bar

// LiveGames
// actionTypes.js
export const FETCH_LIVEGAMES = 'FETCH_LIVEGAMES';
export const CREATE_LIVEGAME = 'CREATE_LIVEGAME';
export const UPDATE_LIVEGAME = 'UPDATE_LIVEGAME';
export const DELETE_LIVEGAME = 'DELETE_LIVEGAME';

// Add new action types
export const SET_GAME_TYPE = 'SET_GAME_TYPE';
export const SET_WAITER_APPROVE = 'SET_WAITER_APPROVE';
export const SET_BAR = 'SET_BAR';
export const SET_TABLE_NAME = 'SET_TABLE_NAME';
export const SET_TABLE_NUMBER = 'SET_TABLE_NUMBER';
export const SET_PACKAGE = 'SET_PACKAGE';
export const SET_PLAYERS_NAMES = 'SET_PLAYERS_NAMES';

// Additional action types (if needed)
export const SET_ERROR = 'SET_ERROR'; // Action type for setting errors
// src/store/actionTypes.js
export const SET_LOADING = 'SET_LOADING';
