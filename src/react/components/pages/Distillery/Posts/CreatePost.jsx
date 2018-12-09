import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createNewPost } from '../../../../store';

class CreatePost extends Component {

 

  

  render() {
    const { handleCreatingPost } = this.props;

    return (
      <div className='create-post'>
        <h2>Create New Post:</h2>
        <form onSubmit={handleCreatingPost}>
          <input type='text' name='title' placeholder='Title' autoFocus autoComplete='off'/>
          <textarea name='article' cols="30" rows="10" placeholder='Content'></textarea>
          <button>Create new post</button>
        </form>
      </div>
    );
  }
}

const dateStamp = () => {
  const currentDate = new Date(),
    date = currentDate.getDate(),
    month = currentDate.getMonth()+1,
    year = currentDate.getFullYear();

  const pad = month => month < 10 ? '0'+month : month;

  return `${pad(month)}/${date}/${year}`
}

const mapState = state => ({
  currentUser: state.currentUser,
});

const mapDispatch = dispatch => {
  return {
    handleCreatingPost: e => {
      e.preventDefault();
  
      const title = e.target.title.value,
            article = e.target.article.value;
  
      const date = dateStamp();
      // const author = this.props.currentUser;
      const author = 'bob';
      
      dispatch(createNewPost(title, date,  author, article));
      e.target.title.value = '';
      e.target.article.value = '';
    }
  }
}

export default connect(mapState, mapDispatch)(CreatePost);