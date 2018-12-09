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
const GET_POSTS = 'GET_POSTS';
const ADD_POST = 'ADD_POST';

//Action Creators
const updateSignInStatus = () => {
  
}

const getVideos = videos => ({ type: GET_VIDEOS, payload: videos })

export const logUserIn = () => ({ type: LOG_USER_IN, payload: true });
export const logUserOut = () => ({ type: LOG_USER_OUT, payload: false });

export const editCurrentUser = editedUser => ({ type: EDIT_CURRENT_USER, payload: editedUser });
export const getPosts = posts => ({ type: GET_POSTS, payload: posts })
export const addPost = newPost => ({type: ADD_POST, payload: newPost });

//Thunk Creators
const fetchVideos = () => {
  return dispatch => {
    return axios.get('/api/videos/youtube')
    .then(res => res.data)
    .then(videos = dispatch(getVideos(videos)))
  }
}

export const fetchPosts = () => {
  return dispatch => {
    return axios.get('/api/ankkshusposts')
    .then(res => res.data)
    .then(posts =>{
      console.log('fetchposts promise posts', posts);
      return dispatch(getPosts(posts))
    } )
  }
}

export const createNewPost = (title, date,  author, article) => {
  return dispatch => {
    return axios.post('/api/ankkshusposts', { title, date,  author, article })
    .then(res => res.data)
    .then(post => {
      dispatch(addPost(post));
    })
    .catch(err => `Axios create post error ${err.message}`);
  }
}

//Reducer and Initial State
const initialState = {
  currentUser: 'Guest',
  loggedIn: false,
  logInOrOut: 'Login',
  posts: [{id:4094109, title: 'Testem', author: 'johnnyboy', date: 'Nevuary', article: 'The sea and the wind.'}]
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
    case GET_POSTS:
      return Object.assign({}, state, { posts: [...state.posts, action.payload] });
    case ADD_POST:
      return Object.assign({}, state, { posts: [ ...state.posts, action.payload ] })
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(thunk, logger));