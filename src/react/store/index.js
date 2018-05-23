import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';


//Action Types
const UPDATE_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS';
const GET_VIDEOS = 'GET_VIDEOS';
const EDIT_CURRENT_USER = 'EDIT_CURRENT_USER';

//Action Creators
const updateSignInStatus = () => {
  
}

const getVideos = videos => {
  const action = {
    type: GET_VIDEOS,
    payload: videos
  }
}

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
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_VIDEOS:
      return action.payload;
    case EDIT_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.payload });
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(thunk, logger));