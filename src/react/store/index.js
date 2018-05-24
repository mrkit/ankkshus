import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';


//Action Types
const UPDATE_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS';
const GET_VIDEOS = 'GET_VIDEOS';
const EDIT_CURRENT_USER = 'EDIT_CURRENT_USER';
const LOG_USER_IN = 'LOG_USER_IN';
const LOG_USER_OUT = 'LOG_USER_OUT';

//Action Creators
const updateSignInStatus = () => {
  
}

const getVideos = videos => {
  const action = {
    type: GET_VIDEOS,
    payload: videos
  }
}

export const logUserIn = () => ({ type: LOG_USER_IN, payload: true });
export const logUserOut = () => ({ type: LOG_USER_OUT, payload: false });


export const editCurrentUser = editedUser => ({ type: EDIT_CURRENT_USER, payload: editedUser });

//Thunk Creators
const fetchVideos = () => {
  return dispatch => {
    axios.get('/api/videos/youtube')
    .then(res => res.data)
    .then(videos = dispatch(getVideos(videos)))
  }
}

//Reducer and Initial State
const initialState = {
  loginOrSignUp: 'Login',
  currentUser: 'Guest',
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_VIDEOS:
      return action.payload;
    case EDIT_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.payload });
    case LOG_USER_IN:
      return Object.assign({}, state, { loggedIn: action.payload });
    case LOG_USER_OUT:
      return Object.assign({}, state, { loggedIn: action.payload });
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(thunk, logger));