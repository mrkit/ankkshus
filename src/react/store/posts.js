import axios from 'axios';

//Action Types
const GET_POSTS = 'GET_POSTS';
const ADD_POST = 'ADD_POST';

//Action Creators
export const getPosts = posts => ({ type: GET_POSTS, payload: posts })
export const addPost = newPost => ({type: ADD_POST, payload: newPost });

//Thunk Creators
export const fetchPosts = () => dispatch => (
  axios.get('/api/ankkshusposts').then(res => res.data)
  .then(posts => dispatch(getPosts(posts)))
  .catch(err => console.log(err.message))
);

export const createNewPost = (title, date,  author, article) => dispatch => (
   axios.post('/api/ankkshusposts', { title, date,  author, article })
  .then(res => res.data)
  .then(post => dispatch(addPost(post)))
  .catch(err => `Axios create post error ${err.message}`)
);

//Reducer 
const reducer = (state = [], action) => {
  switch(action.type){
    case GET_POSTS:
      return [...action.payload];
    case ADD_POST:
      return [ ...state.posts, action.payload ];
    default:
      return state;
  }
}

export default reducer;