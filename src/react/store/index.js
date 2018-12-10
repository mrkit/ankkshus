import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import posts from './posts';
import users from './users';
import videos from './videos';
import videoChannels from './videoChannels';
import editVideo from './editVideo';


const rootReducer = combineReducers({
  posts,
  users,
  videos,
  videoChannels,
  editVideo
});

export * from './posts';
export * from './users';
export * from './videos';
export * from './editVideo';
export * from './videoChannels';
export default createStore(rootReducer, applyMiddleware(logger, thunk));