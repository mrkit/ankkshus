import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import VideosSidebar from './VideosSidebar';
import AddVideoForm from './messageBoxes/AddVideoForm';
import EditVideoForm from './messageBoxes/EditVideoForm';
import { fetchVideos, editVideoTrue } from '../../../../store';

const Videos = ({ videos, addVideo, editVideo, handleMountEditVideoComponent }) => {
  return (
    <section className="video-container">
       <h1>Videos</h1>
        <p>Double click on an episode title to Edit or Delete a video.</p>
        <section className="ccSection">
          {addVideo ? <AddVideoForm />: null}
          {editVideo ? <EditVideoForm /> : null }
          <ul className="video-container-ul">
            {
              videos.map(video => {
                let thumburl;
                //Slice off the non-id part based on where you get the youtube link from.
                if(video.url.slice(0, 17) === 'https://youtu.be/'){
                  thumburl = video.url.split('https://youtu.be/').join('');
                } else {
                  thumburl = video.url.split('https://www.youtube.com/watch?v=').join('');
                }

                let thumbnail = `http://img.youtube.com/vi/${thumburl}/mqdefault.jpg`;

                return (
                  <li key={video.id} className='video-container-ul-li'>
                    <a target='_blank' href={video.url}><img src={thumbnail} alt={video.title}/></a>
                    <h3 onDoubleClick={handleMountEditVideoComponent}>{video.title}</h3>
                  </li>
                )
            })
            }
          </ul>
        </section>
    </section>
  )
}


const mapState =(state) => ({
  videos: state.videos,
  addVideo: state.editVideo.addVideo,
  editVideo: state.editVideo.editVideo
});

const mapDispatch = dispatch => ({
  fetchVideos: dispatch(fetchVideos()),
  handleMountEditVideoComponent: e => {
    dispatch(editVideoTrue());
  }
});

export default connect(mapState, mapDispatch)(Videos);