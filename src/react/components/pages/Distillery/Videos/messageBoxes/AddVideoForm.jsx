import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addingVideo } from '../../../../../store';


const AddVideoForm = ({handleAddVideo }) => (
  <aside>
    <button onClick={(e) => console.log('unMount', e.target)}>X</button>
    <form className='messageBoxComponent' onSubmit={handleAddVideo}>
      <h3>Add new video</h3>
      <input type='text' name='title' placeholder='Title' autoFocus/>
      <input type='text' name='url' placeholder='Youtube Url'/>
      <button>Submit</button>
    </form>
  </aside>
)

const mapState = state => ({
});

const mapDispatch = dispatch => ({
  handleAddVideo: e => {
    const title = e.target.title.value;
    const url = e.target.url.value;
    dispatch(addingVideo(title, url));
  }
})

export default connect(mapState, mapDispatch)(AddVideoForm);