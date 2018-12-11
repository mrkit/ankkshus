import React from 'react';
import { connect } from 'react-redux';
import { addVideoTrue, fetchChannels } from '../../../../store';

const VideosSidebar = ({ handleNewVideoSubmission, videoChannels }) => (
  <nav className='video-nav'>
    <h2 className='video-nav-title'>Videos</h2>
    <ul className='video-nav-video-list'>
      {
        videoChannels.map(channel => {
          console.log('channel map', channel)
          return <li key={channel.id}>{channel.name}</li>
        })
      }
    </ul>
    {/* 
    <div>
      <button onClick={handleReverseVideoRow}>reverse</button>
      <button onClick={handleNewVideoSubmission}>+</button>
    </div>
    */}
    <div className='video-nav-buttons'>
      <button onClick={handleNewVideoSubmission}>Add New Video</button>
    </div>
  </nav>
);

const mapState = state => ({
  videoChannels: state.videoChannels
})

const mapDispatch = dispatch => ({
  handleNewVideoSubmission: e => {
    dispatch(addVideoTrue());
  },
  fetchChannels: dispatch(fetchChannels())
  
});

export default connect(mapState, mapDispatch)(VideosSidebar);
