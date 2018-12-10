import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import posts from './posts';
import users from './users';
import videos from './videos';
import editVideo from './editVideo';

const rootReducer = combineReducers({
  posts,
  users,
  videos,
  editVideo
});

export * from './posts';
export * from './users';
export * from './videos';
export * from './editVideo';
export default createStore(rootReducer, applyMiddleware(logger, thunk));