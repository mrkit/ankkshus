import React, { Component } from 'react';
import axios from 'axios';

const AddVideoForm = ({handleAddVideo}) => (
  <form className='addVideo' onSubmit={handleAddVideo}>
    <h3>Add new video</h3>
    <input type='text' name='title' placeholder='Title' autoFocus/>
    <input type='text' name='url' placeholder='Embeded Url'/>
    <button>Submit</button>
  </form>
)

const EditVideoForm = ({handleEditVideo}) => (
  <form className='addVideo' onSubmit={handleEditVideo}>
    <h3>Edit video: </h3>
    <label>Do you want to delete this video?</label>
    <label><input type='radio' name='delete' value='no'/><span>No</span></label>
    <label><input type='radio' name='delete' value='yes'/><span>Yes</span></label>
    <button>Submit</button>
  </form>
)

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
    const { title, url } = event.target;
    
    axios.post('/api/videos/youtube', { title: title.value, url: url.value })
    .then(() => this.setState({addVideo: false}))
    .catch(err => console.log('Axios Youtube Put Error:', err.message))
    
  }
  
  handleDoubleClick = event => {
    event.preventDefault();
    console.log(event.target.value)
    this.setState({editVideo: true})
  }
  
  handleEditVideo = event => {
    console.log(event.target.delete.value);
    console.log(event.target);
//    axios.delete('/api/videos/youtube')
  }
  
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
            {this.state.addVideo ? <AddVideoForm handleAddVideo={this.handleAddVideo}/> : null}
            {this.state.editVideo ? <EditVideoForm handleEditVideo={this.handleEditVideo} /> : null }
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