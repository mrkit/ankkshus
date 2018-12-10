import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addingVideo, addVideoFalse } from '../../../../../store';


const AddVideoForm = ({handleAddVideo, handleUnmountAddVideoComponent }) => (
  <aside>
    <button onClick={handleUnmountAddVideoComponent}>X</button>
    <form className='messageBoxComponent' onSubmit={handleAddVideo}>
      <h3>Add new video</h3>
      <input type='text' name='title' placeholder='Title' autoFocus/>
      <input type='text' name='url' placeholder='Youtube Url'/>
      <button>Submit</button>
    </form>
  </aside>
);

const mapState = state => ({
});

const mapDispatch = dispatch => ({
  handleAddVideo: e => {
    const title = e.target.title.value;
    const url = e.target.url.value;
    dispatch(addingVideo(title, url));
  },
  
  handleUnmountAddVideoComponent: e => {
    dispatch(addVideoFalse());
  }
});

export default connect(mapState, mapDispatch)(AddVideoForm);