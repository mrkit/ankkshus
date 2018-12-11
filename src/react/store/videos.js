import axios from 'axios';

//ACTION TYPES
const GET_VIDEOS = 'GET_VIDEOS';
const ADD_VIDEO = 'ADD_VIDEO';
const REVERSE_VIDEOS = 'REVERSE_VIDEOS';

//ACTION CREATORS
const getVideos = videos => ({ type: GET_VIDEOS, payload: videos });
const addVideo = video => ({ type: ADD_VIDEO, payload: video });
export const reverseVideos = () => ({ type: REVERSE_VIDEOS  });

//THUNK CREATORS
export const fetchVideos = () => dispatch => (
  axios.get('/api/videos/youtube').then(res => res.data)
  .then(videos => dispatch(getVideos(videos)))
  .catch(err => console.log(err.message))
);

export const addingVideo = (title, url) => dispatch => (
  axios.post('/api/videos/youtube', { title, url }).then(res => res.data)
  .then(newVideo => dispatch(addVideo(newVideo)))
  .catch(err => console.log(err.message))
);

//REDUCER
const videosReducer = (state = [], action) => {
  switch(action.type){
    case GET_VIDEOS:
      return [...action.payload];
    case ADD_VIDEO:
      return [...state, action.payload];
    case REVERSE_VIDEOS:
      return [...state.reverse()]
    default:
      return state;
  }
};

export default videosReducer;

// handleAddVideo: event => {
//    event.preventDefault();
//    const { title, url } = event.target;
//    
//    axios.post('/api/videos/youtube', { title: title.value, url: url.value })
//    .then((video) => this.setState({addVideo: false, videos: [...this.state.videos, video.data]}))
//    .catch(err => console.log('Axios POST Youtube Error message', err.message));
//  }