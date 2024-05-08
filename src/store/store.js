import {createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import suggestionReducer from './reducers/suggestion';
import theGameReducer from './reducers/theGame';
import categoriesReducer from './reducers/categories';
import usersReducer from './reducers/users';
import tableReducer from './reducers/table';
import companiesReducer from './reducers/companies'

const rootReducer = combineReducers({
    suggestionReducer,
    theGameReducer,
    categoriesReducer,
    usersReducer,
    tableReducer,
    companiesReducer,
    
})


const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store