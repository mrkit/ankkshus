import React, { Component } from 'react';

const AddVideoForm = ({handleAddVideo, unMount}) => (
  <aside>
    <button onClick={unMount}>X</button>
    <form className='messageBoxComponent' onSubmit={handleAddVideo}>
      <h3>Add new video</h3>
      <input type='text' name='title' placeholder='Title' autoFocus/>
      <input type='text' name='url' placeholder='Embeded Url'/>
      <button>Submit</button>
    </form>
  </aside>
)

export default AddVideoForm;