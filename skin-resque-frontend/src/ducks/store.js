import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import logger from 'redux-logger';
import { createMiddleware } from 'redux-api-middleware';
import { cosmeticsReducer } from './Cosmetics/reducer';
import { uploadReducer } from './UploadImage/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    cosmetics: cosmeticsReducer,
    upload: uploadReducer
  });

const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger)),
  );

  export default store;
