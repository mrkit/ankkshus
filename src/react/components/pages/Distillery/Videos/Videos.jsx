import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideosSidebar from './VideosSidebar';
import AddVideoForm from './messageBoxes/AddVideoForm';
import EditVideoForm from './messageBoxes/EditVideoForm';
import { fetchVideos } from '../../../../store';

const Videos = ({ videos, addVideo }) => {
  return (
    <div className='video'>
      <VideosSidebar />
      <section className="video-container">
          <p>Double click on an episode title to Edit or Delete a video.</p>
          <section className="ccSection">
            {addVideo ? <AddVideoForm />: null}
            {/*editVideo ? 
              <EditVideoForm 
                handleEditVideo={handleEditVideo} 
                unMount={handleUnmountEdit} 
                rename={rename} 
                handleRename={handleRenameInputStateChange}
                currentTitle={selectedVideo}
                /> : null */}
            <div className="video-container-row">
              {
                videos.map(video => {
                  let thumburl = video.url.split('https://youtu.be/').join('');
                  let thumbnail = `http://img.youtube.com/vi/${thumburl}/mqdefault.jpg`
                  return (
                    <article key={video.id}>
                      <h3 >{video.title}</h3>

                      <a target='_blank' href={video.url}><img src={thumbnail} alt={video.title}/></a>
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
  editVideo: state.editVideo.editVideo,
  selectedVideo: state.editVideoselectedVideo,
  rename: state.editVideo.rename
});

const mapDispatch = dispatch => ({
  fetchVideos: dispatch(fetchVideos()),
});

export default connect(mapState, mapDispatch)(Videos);