import axios from 'axios';

//ACTION TYPES
const GET_POSTS = 'GET_POSTS';
const ADD_POST = 'ADD_POST';
const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';

//ACTION CREATORS
const getPosts = posts => ({ type: GET_POSTS, payload: posts });
const addPost = newPost => ({ type: ADD_POST, payload: newPost });
const updatePost = (id, updatedPost) => ({ type: UPDATE_POST, payload: { id, updatedPost }});
const deletePost = id => ({ type: DELETE_POST, payload: id });

//THUNK CREATORS
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

export const updatingPost = (id, updatedPost) => dispatch => (
  axios.put(`/api/ankkshusposts/${id}`, { updatedPost }).then(res => res.data)
  .then(updatedPostFromServer => dispatch(updatePost(id, updatedPostFromServer)))
  .catch(err => console.log(err.message))
);

export const deletingPost = id => dispatch => (
  axios.delete(`/api/ankkshusposts/${id}`).then(res => res.data)
  .then(id => dispatch(deletePost(id)))
  .catch(err => console.log(err.message))
);

//REDUCER
const postReducer = (state = [], action) => {
  switch(action.type){
    case GET_POSTS:
      return [...action.payload];
    case ADD_POST:
      return [ ...state, action.payload ];
    case UPDATE_POST:
      return state.map(post => {
        if(post.id === action.payload.id){
          return { ...post, ...action.payload.updatePost };
        } else {
          return post;
        }
      });
    case DELETE_POST:
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};

export default postReducer;