import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, updatingPost, deletingPost } from '../../store';

const Home = ({ currentUser, posts, handleDeletingPost }) => (
  <div className='home'>
    <h1>Welcome, {currentUser}!</h1>
    <p>Add new content.</p>
    <section>
      <ul className='home-options'>
        <li><Link to='/distillery/createpost/'>Add a Post</Link></li>
        <li><Link to='/distillery/videos/'>Add a Video</Link></li>
        <li><Link to='/distillery/quizzes'>Add a Quiz</Link></li>
      </ul>
      <ol className='home-posts'>
        {
          posts.map(post => {
            return <li className='home-article' key={post.id}>
            <div className='home-article-title'>
              <h2>{post.title}</h2>
              <form onSubmit={handleDeletingPost}>
                <input type='hidden' value={post.id} name='id'/>
                <button>Delete</button>
              </form>
            </div>
            <p className='home-article-author-date'><em>{post.author} - {post.date}</em></p>
            <p className='home-article-article'>{post.article}</p>
            </li>
          })
        }
      </ol>
    </section>
  </div>
);

const mapState = state => ({
  currentUser: state.users.currentUser,
  posts: state.posts
});

const mapDispatch = dispatch => ({
  fetchPosts: dispatch(fetchPosts()),
  handleDeletingPost: e => {
    e.preventDefault();
    dispatch(deletingPost(e.target.id.value))
  }
});

export default connect(mapState, mapDispatch)(Home);