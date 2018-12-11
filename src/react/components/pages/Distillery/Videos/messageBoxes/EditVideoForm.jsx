import React from 'react';
import { connect } from 'react-redux';
import { editVideoFalse, renameVideoTitle } from '../../../../../store';

const EditVideoForm = ({ handleUnmountEditVideoComponent, handleSubmitEditVideo, handleRename, rename, currentTitle}) => (
  <aside>
    <button onClick={handleUnmountEditVideoComponent}>X</button>
    <form className='messageBoxComponent' onSubmit={handleSubmitEditVideo}>
      <h3>Edit video: </h3>
      <label>Do you want to delete this video?</label>
      <label><input type='radio' name='delete' value='no' defaultChecked /><span>No</span></label>
      <label><input type='radio' name='delete' value='yes'/><span>Yes</span></label>
      <label><input onChange={handleRename} type='text' name='rename' value={rename} placeholder={`Rename: "${currentTitle}"`} autoFocus/></label>
      <button>Submit</button>
    </form>
  </aside>
);

/*
  handleEditVideo={handleEditVideo} 
  unMount={handleUnmountEdit} 
  rename={rename} 
  handleRename={handleRenameInputStateChange}
  currentTitle={selectedVideo}
*/

const mapState = state => ({
  currentTitle: state.editVideo.selectedVideo,
  rename: state.editVideo.rename
});

const mapDispatch = dispatch => ({
  handleSubmitEditVideo: e => {
    
  },
  handleRename: e => {
    console.log('Handle Rename', e.target.value)
    dispatch(renameVideoTitle(e.target.value))
  },
  handleUnmountEditVideoComponent: e => {
    dispatch(editVideoFalse());
  }
});

export default connect(mapState, mapDispatch)(EditVideoForm);