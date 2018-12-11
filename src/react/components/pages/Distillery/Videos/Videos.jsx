import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import VideosSidebar from './VideosSidebar';
import AddVideoForm from './messageBoxes/AddVideoForm';
import EditVideoForm from './messageBoxes/EditVideoForm';
import { fetchVideos, editVideoTrue } from '../../../../store';

const Videos = ({ videos, addVideo, editVideo, handleMountEditVideoComponent }) => {
  return (
    <div className='video'>
      <VideosSidebar />
      <section className="video-container">
          <p>Double click on an episode title to Edit or Delete a video.</p>
          <section className="ccSection">
            {addVideo ? <AddVideoForm />: null}
            {editVideo ? <EditVideoForm /> : null }
            <div className="video-container-row">
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

                  // Figure out how to get the title from the url
                  // axios.get(`https://www.youtube.com/oembed?format=json&url=${video.url}`)
                  // .then(res => res.data)
                  // .then(thing => console.log('Axios', thing))
                  // .catch(err => console.log(err.message))
                  // let title = JSON.parse(`https://www.youtube.com/oembed?format=json&url=${video.url}`);

                  return (
                    <article key={video.id} className='video-container-row-video'>
                      <a target='_blank' href={video.url}><img src={thumbnail} alt={video.title}/></a>
                      <h3 onDoubleClick={handleMountEditVideoComponent}>{video.title}</h3>
                    </article>
                  )
              })
              }
            </div>
          </section>
      </section>
    </div>
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