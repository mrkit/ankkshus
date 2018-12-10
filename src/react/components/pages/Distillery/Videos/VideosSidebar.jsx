import React from 'react';
import { connect } from 'react-redux';
import { addVideoTrue } from '../../../../store';

const VideosSidebar = ({ handleNewVideoSubmission }) => (
  <nav className='video-nav'>
    <h2 className='video-nav-title'>Videos</h2>
    <ul className='video-nav-video-list'>
      <li>Crash Course</li>
    </ul>
    {/* 
    <div>
      <button onClick={handleReverseVideoRow}>reverse</button>
      <button onClick={handleNewVideoSubmission}>+</button>
    </div>
    */}
    <div>
      <button onClick={handleNewVideoSubmission}>+</button>
    </div>
  </nav>
);

const mapState = state => ({
  
});

const mapDispatch = dispatch => ({
  handleNewVideoSubmission: e => {
    dispatch(addVideoTrue());
  }
  
});

export default connect(mapState, mapDispatch)(VideosSidebar);
