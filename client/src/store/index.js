import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


//Action Types
const UPDATE_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS';

//Action Creators
const updateSignInStatus = () => {
  
}

//Thunk Creators

//Reducer and Initial State
const initialState = {
  loginOrSignUp: 'Login/Sign Up',
  currentUser: 'Guest'
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(thunk, logger));