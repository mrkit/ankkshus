const LOG_USER_IN = 'LOG_USER_IN';
const LOG_USER_OUT = 'LOG_USER_OUT';
const UPDATE_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS';
const EDIT_CURRENT_USER = 'EDIT_CURRENT_USER';

const logUserIn = () => ({ type: LOG_USER_IN, payload: true });
const logUserOut = () => ({ type: LOG_USER_OUT, payload: false });
const editCurrentUser = editedUser => ({ type: EDIT_CURRENT_USER, payload: editedUser });
const updateSignInStatus = () => ({});

 const initialState = { 
  currentUser: 'Guest',
  loggedIn: false,
  logInOrOut: 'Login'
 }
 
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
