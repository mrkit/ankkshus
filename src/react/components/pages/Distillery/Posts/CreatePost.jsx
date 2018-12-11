import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNewPost } from '../../../../store';

class CreatePost extends Component {

  render() {
    const { handleCreatingPost, currentUser } = this.props;

    return (
      <div className='create-post'>
        <h2>Create New Post:</h2>
        <form onSubmit={(e) => handleCreatingPost(e, currentUser)}>
          <input type='text' name='title' placeholder='Title' autoFocus autoComplete='off'/>
          <textarea name='article' cols="30" rows="10" placeholder='Content'></textarea>
          <button>Create new post</button>
        </form>
      </div>
    );
  }
};

const mapState = state => ({
  currentUser: state.users.currentUser,
});

const mapDispatch = (dispatch, ownProps) => ({
  handleCreatingPost: (e, currentUser) => {
    e.preventDefault();

    const title = e.target.title.value,
          article = e.target.article.value,
          date = new Date().toLocaleString([], { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'}),
          author = currentUser;

    dispatch(createNewPost(title, date,  author, article));
    e.target.title.value = '';
    e.target.article.value = '';

    //Redirects to home page
    ownProps.history.push('/');
  }
});

export default connect(mapState, mapDispatch)(CreatePost);