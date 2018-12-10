const GET_VIDEOS = 'GET_VIDEOS';

const getVideos = videos => ({ type: GET_VIDEOS, payload: videos })

export const fetchVideos = () => dispatch => (
  axios.get('/api/videos/youtube').then(res => res.data)
  .then(videos => dispatch(getVideos(videos)))
  .catch(err => console.log(err.message))
);

const videosReducer = (state = [], action) => {
  switch(action.type){
    case GET_VIDEOS:
      return action.payload;
    default:
      return state;
  }
}

export default videosReducer;