import React, { Component } from 'react';
import axios from 'axios';
import AddVideoForm from './messageBoxes/AddVideoForm';
import EditVideoForm from './messageBoxes/EditVideoForm';

class Videos extends Component{
  state = {
    videos: [],
    addVideo: false,
    editVideo: false
  }
  
  componentDidMount(){
    axios.get('/api/videos/youtube')
    .then(res => res.data)
    .then(videos => this.setState({videos}))
    .catch(err => console.log('Axios Youtube Get Error:', err.message))
  }

  handleReverse = () => {
    this.setState({videos: this.state.videos.reverse()})
  }
  
  handleNewVideo = () => {
    this.setState({addVideo: true})
  }
  
  handleAddVideo = event => {
    event.preventDefault();
    const { title, url } = event.target;
    
    axios.post('/api/videos/youtube', { title: title.value, url: url.value })
    .then((video) => this.setState({addVideo: false, videos: [...this.state.videos, video.data]}))
    .catch(err => console.log('Axios Post Youtube Error message', err.message));
  }
  
  handleDoubleClick = event => {
    console.log('Double Click Found!', event.target);
    this.setState({editVideo: true});
  }
  
  handleEditVideo = event => {
    event.preventDefault();
    console.log(event.target.delete.value);
    console.log(event.target);
//    axios.delete('/api/videos/youtube')
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
              <button onClick={this.handleReverse}>reverse</button>
              <button onClick={this.handleNewVideo}>+</button>
            </nav>
            {this.state.addVideo ? <AddVideoForm handleAddVideo={this.handleAddVideo} unMount={this.handleUnmountVideo}/>: null}
            {this.state.editVideo ? <EditVideoForm handleEditVideo={this.handleEditVideo} unMount={this.handleUnmountEdit}/> : null }
            <div className="rowContainer">
              {
                this.state.videos.map(video => (
                  <article key={video.id}>
                    <h3 onDoubleClick={this.handleDoubleClick}>{video.title}</h3>
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

export default Videos;