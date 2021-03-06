import axios from 'axios';

//ACTION TYPES
const ADD_VIDEO_TRUE = 'ADD_VIDEO_TRUE';
const ADD_VIDEO_FALSE = 'ADD_VIDEO_FALSE';
const EDIT_VIDEO_TRUE = 'EDIT_VIDEO_TRUE';
const EDIT_VIDEO_FALSE = 'EDIT_VIDEO_FALSE';
const RENAME_VIDEO_TITLE = 'RENAME_VIDEO_TITLE';

//ACTION CREATORS
export const addVideoTrue = () => ({ type: ADD_VIDEO_TRUE, payload: true });
export const addVideoFalse = () => ({ type: ADD_VIDEO_FALSE, payload: false });
export const editVideoTrue = () => ({ type: EDIT_VIDEO_TRUE, payload: true });
export const editVideoFalse = () => ({ type: EDIT_VIDEO_FALSE, payload: false });
export const renameVideoTitle = renamedTitle => ({ type: RENAME_VIDEO_TITLE, payload: renamedTitle });

//INITIAL STATE - Remember this becomes an object within an object once used with combinedReducer.
const initialState = {
  addVideo: false,
  editVideo: false,
  selectedVideo: '',
  reverseVideo: false,
  rename: ''
};

//REDUCER
const editVideoReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_VIDEO_TRUE:
      return { ...state, addVideo: action.payload };
    case ADD_VIDEO_FALSE:
      return { ...state, addVideo: action.payload };
    case EDIT_VIDEO_TRUE:
      return { ...state, editVideo: action.payload };
    case EDIT_VIDEO_FALSE:
      return { ...state, editVideo: action.payload };
    case RENAME_VIDEO_TITLE:
      return { ...state, rename: action.payload }
    default:
      return state;
  }
};

export default editVideoReducer;


//
//handleReverseVideoRow: () => {
//    
//  }
//  
//  handleNewVideoSubmission: () => {
//    this.setState({addVideo: true})
//  }
//  
// 
//  
//  handleDoubleClickToEditVideo: event => {
//    this.setState({editVideo: true, selectedVideo: event.target.innerText});
//  }
//  
//  handleRenameInputStateChange: event => {
//    this.setState({rename: event.target.value});
//  }
//  
//  handleEditVideo: event => {
//    event.preventDefault();
//    const deleteVideo = event.target.delete.value === 'yes' ? true : false;
//    const title = this.state.selectedVideo;
//    const renamedTitle = event.target.rename.value;
//    
//    if(deleteVideo){
//      //Add an are you sure box before this
//      axios.delete(`/api/videos/youtube/${title}`)
//      .then(() => this.setState({
//          selectedVideo: '', 
//          editVideo: false, 
//          videos: this.state.videos.filter(video => title !== video.title)
//        }))
//      .catch(err => console.log('Axios DELETE Youtube Error message', err.message));
//    } else {
//      //Unmount (closes dialogue box)
//      this.setState({editVideo: false});
//    }
//    
//    if(renamedTitle){
//      axios.put(`/api/videos/youtube/${title}`, { renamedTitle })
//      .then(row => this.setState({ 
//        rename: '',
//        videos: this.state.videos.map(video => { 
//          if(video.title === title){
//            return Object.assign({}, video, {title: renamedTitle});
//          } else {
//            return video;
//          }
//        }) 
//      }))
//      .catch(err => console.log('Axios PUT Youtube Error message', err.message));
//    } else {
//      //add invalid title warning?
//    }
//    
//    event.target.rename = '';
//  }
//  
//  handleUnmountEdit: () => this.setState({editVideo: false})
//  handleUnmountVideo: () => this.setState({addVideo: false})
