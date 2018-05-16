import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


//Action Types
const UPDATE_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS';
const GET_VIDEOS = 'GET_VIDEOS';

//Action Creators
const updateSignInStatus = () => {
  
}

const getVideos = () => {
  
}
//Thunk Creators
const fetchVideos = () => {
  return () => {
    
  }
}

//Reducer and Initial State
const initialState = {
  loginOrSignUp: 'Login',
  currentUser: 'Guest'
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(thunk, logger));