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
    return (
      <section className="pageContainer">
         <h1>Video page</h1>
          <p>YouTubes and Mashups and stuff.</p>
          <section className="ccSection">
            <nav>
              <h2>Crash Course</h2>
              <button onClick={this.handleReverseVideoRow}>reverse</button>
              <button onClick={this.handleNewVideoSubmission}>+</button>
            </nav>
            {this.state.addVideo ? <AddVideoForm handleAddVideo={this.handleAddVideo} unMount={this.handleUnmountVideo}/>: null}
            {this.state.editVideo ? 
              <EditVideoForm 
                handleEditVideo={this.handleEditVideo} 
                unMount={this.handleUnmountEdit} 
                rename={this.state.rename} 
                handleRename={this.handleRenameInputStateChange}
                currentTitle={this.state.selectedVideo}
                /> : null }
            <div className="rowContainer">
              {
                this.state.videos.map(video => (
                  <article key={video.id}>
                    <h3 onDoubleClick={this.handleDoubleClickToEditVideo}>{video.title}</h3>
                    <iframe width="560" height="315" src={video.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  </article>
                ))
              }
            </div>
          </section>
          <section className="mashupSection">
            <h2>Mashups</h2>
          </section>
      </section>
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