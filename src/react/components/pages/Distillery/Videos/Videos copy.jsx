import React, { Component } from 'react';
import axios from 'axios';
import AddVideoForm from './messageBoxes/AddVideoForm';
import EditVideoForm from './messageBoxes/EditVideoForm';
import { connect } from 'react-redux';

class Videos extends Component{
  state = {
    videos: [],
    addVideo: false,
    editVideo: false,
    selectedVideo: '',
    rename: ''
  }
  
  componentDidMount(){
    axios.get('/api/videos/youtube')
    .then(res => res.data)
    .then(videos => this.setState({videos}))
    .catch(err => console.log('Axios Youtube Error:', err.message))
  }

  handleReverseVideoRow = () => {
    this.setState({videos: this.state.videos.reverse()})
  }
  
  handleNewVideoSubmission = () => {
    this.setState({addVideo: true})
  }
  
  handleAddVideo = event => {
    event.preventDefault();
    const { title, url } = event.target;
    
    axios.post('/api/videos/youtube', { title: title.value, url: url.value })
    .then((video) => this.setState({addVideo: false, videos: [...this.state.videos, video.data]}))
    .catch(err => console.log('Axios POST Youtube Error message', err.message));
  }
  
  handleDoubleClickToEditVideo = event => {
    this.setState({editVideo: true, selectedVideo: event.target.innerText});
  }
  
  handleRenameInputStateChange = event => {
    this.setState({rename: event.target.value});
  }
  
  handleEditVideo = event => {
    event.preventDefault();
    const deleteVideo = event.target.delete.value === 'yes' ? true : false;
    const title = this.state.selectedVideo;
    const renamedTitle = event.target.rename.value;
    
    if(deleteVideo){
      //Add an are you sure box before this
      axios.delete(`/api/videos/youtube/${title}`)
      .then(() => this.setState({
          selectedVideo: '', 
          editVideo: false, 
          videos: this.state.videos.filter(video => title !== video.title)
        }))
      .catch(err => console.log('Axios DELETE Youtube Error message', err.message));
    } else {
      //Unmount (closes dialogue box)
      this.setState({editVideo: false});
    }
    
    if(renamedTitle){
      axios.put(`/api/videos/youtube/${title}`, { renamedTitle })
      .then(row => this.setState({ 
        rename: '',
        videos: this.state.videos.map(video => { 
          if(video.title === title){
            return Object.assign({}, video, {title: renamedTitle});
          } else {
            return video;
          }
        }) 
      }))
      .catch(err => console.log('Axios PUT Youtube Error message', err.message));
    } else {
      //add invalid title warning?
    }
    
    event.target.rename = '';
  }
  
  handleUnmountEdit = () => this.setState({editVideo: false});
  handleUnmountVideo = () => this.setState({addVideo: false});
  
  render(){
    const { videos, rename, addVideo, editVideo, selectedVideo } = this.state;
    const { handleReverseVideoRow, handleNewVideoSubmission, handleAddVideo, handleUnmountVideo, handleEditVideo, handleUnmountEdit, handleRenameInputStateChange, handleDoubleClickToEditVideo } = this;

    return (
      <div className='video'>
        <nav className='video-nav'>
          <h2 className='video-nav-title'>Videos</h2>
          <ul className='video-nav-video-list'>
            <li>Crash Course</li>
          </ul>
          
          <div>
            <button onClick={handleReverseVideoRow}>reverse</button>
            <button onClick={handleNewVideoSubmission}>+</button>
          </div>
        </nav>
        <section className="video-container">
            <p>Double click on an episode title to Edit or Delete a video.</p>
            <section className="ccSection">
              {addVideo ? <AddVideoForm handleAddVideo={handleAddVideo} unMount={handleUnmountVideo}/>: null}
              {editVideo ? 
                <EditVideoForm 
                  handleEditVideo={handleEditVideo} 
                  unMount={handleUnmountEdit} 
                  rename={rename} 
                  handleRename={handleRenameInputStateChange}
                  currentTitle={selectedVideo}
                  /> : null }
              <div className="video-container-row">
                {
                  videos.map(video => {
                    let thumburl = video.url.split('https://youtu.be/').join('');
                    let thumbnail = `http://img.youtube.com/vi/${thumburl}/mqdefault.jpg`
                    return (
                      <article key={video.id}>
                        <h3 onDoubleClick={handleDoubleClickToEditVideo}>{video.title}</h3>
                        {/*<iframe width="560" height="315" src={video.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>*/}
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
}

//const mapState =(state) => {
//  return {
//    videos: state.videos,
//    addVideo: false,
//    editVideo: false
//  }
//};
//
//const mapDispatch = () => {};
//
//export default connect(mapState, mapDispatch)(Videos);
export default Videos;