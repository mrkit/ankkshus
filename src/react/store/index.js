import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
import posts from './posts';
import users from './users';
import videos from './videos';

const rootReducer = combineReducers({
  posts,
  users,
  videos
});

export * from './posts';
export * from './users';
export * from './videos';
export default createStore(rootReducer, applyMiddleware(logger, thunk));