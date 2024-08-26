import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Use the 'thunk' import

import suggestionReducer from './reducers/suggestion';
import theGameReducer from './reducers/theGame';
import categoriesReducer from './reducers/categories';
import usersReducer from './reducers/users';
import tableReducer from './reducers/table';
import companiesReducer from './reducers/companies';

// Combine all reducers
const rootReducer = combineReducers({
    suggestion: suggestionReducer,
    theGame: theGameReducer,
    categories: categoriesReducer,
    users: usersReducer,
    table: tableReducer,
    companies: companiesReducer,
});

// Create the Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
