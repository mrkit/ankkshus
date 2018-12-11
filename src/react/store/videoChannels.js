import axios from 'axios';

//ACTION TYPE
const GET_CHANNELS = 'GET_CHANNELS';

//ACTION CREATOR
const getChannels = channels => ({ type: GET_CHANNELS, payload: channels });

//THUNK CREATOR
export const fetchChannels = () => dispatch => (
  axios.get('/api/videochannels').then(res => res.data)
  .then(channels => dispatch(getChannels(channels)))
  .catch(err => console.log(err.message))
);

//REDUCER
const videoChannelsReducer = (state = [], action) => {
  switch(action.type){
    case GET_CHANNELS:
      return [...action.payload];
    default:
      return state;
  }
};

export default videoChannelsReducer; 