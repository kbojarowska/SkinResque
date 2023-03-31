import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import logger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import { cosmeticsReducer } from './Cosmetics/reducer';
import { usersReducer } from './User/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    cosmetics: cosmeticsReducer,
	users: usersReducer
  });

const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk, apiMiddleware, logger)),
  );

  export default store;
