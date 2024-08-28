// src/store/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Make sure thunk is imported correctly
import { composeWithDevTools } from '@redux-devtools/extension'; // Updated package

import packagesReducer from './reducers/packagesReducer';
import barsReducer from './reducers/barsReducer';
import liveGameReducer from './reducers/liveGameReducer';

const rootReducer = combineReducers({
    packages: packagesReducer,
    bars: barsReducer,
    liveGames: liveGameReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // Use thunk directly
);

export default store;
