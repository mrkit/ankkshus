import axios from 'axios';

//ACTION TYPES
const LOG_USER_IN = 'LOG_USER_IN';
const LOG_USER_OUT = 'LOG_USER_OUT';
const UPDATE_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS';
const EDIT_CURRENT_USER = 'EDIT_CURRENT_USER';

//ACTION CREATORS
export const logUserIn = () => ({ type: LOG_USER_IN, payload: true });
export const logUserOut = () => ({ type: LOG_USER_OUT, payload: false });
export const editCurrentUser = editedUser => ({ type: EDIT_CURRENT_USER, payload: editedUser });
export const updateSignInStatus = () => ({});

//INITIAL STATE - Remember this becomes an object within an object once used with combinedReducer.
 const initialState = { 
  currentUser: 'Guest',
  loggedIn: false,
  logInOrOut: 'Login'
 }
 
//REDUCER
const userReducer = (state = initialState, action) => {
  switch(action.type){
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

export default userReducer;
