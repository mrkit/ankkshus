import React from 'react';
import { connect } from 'react-redux';
import { addVideoTrue, fetchChannels, reverseVideos } from '../../../../store';

const VideosSidebar = ({ handleNewVideoSubmission, videoChannels, handleReverseVideos }) => (
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
    <div className='video-nav-buttons'>
      <button onClick={handleNewVideoSubmission}>Add New Video</button>
      <button onClick={handleReverseVideos}>Reverse Order</button>
    </div>
  </nav>
);

const mapState = state => ({
  videoChannels: state.videoChannels
});

const mapDispatch = dispatch => ({
  fetchChannels: dispatch(fetchChannels()),
  handleNewVideoSubmission: e => {
    dispatch(addVideoTrue());
  },
  handleReverseVideos: e => {
    dispatch(reverseVideos());
  }
});

export default connect(mapState, mapDispatch)(VideosSidebar);
