// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
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
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
