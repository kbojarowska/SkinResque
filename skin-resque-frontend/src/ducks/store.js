import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import logger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import { cosmeticsReducer } from './Cosmetics/reducer';
import { userReducer } from './User/reducer';
import { uploadReducer } from './UploadImage/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    cosmetics: cosmeticsReducer,
	users: userReducer,
    upload: uploadReducer
  });

const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk, apiMiddleware, logger)),
  );

  export default store;
