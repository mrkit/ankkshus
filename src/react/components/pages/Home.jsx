import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../store';
import axios from 'axios';

// const Home = ({currentUser, posts}) => {
//   console.log('Whatup home', posts);
//   return (
//   <div className='home'>
//     <h1>Welcome, {currentUser}!</h1>
//     <p>Add new content.</p>
//     <section>
//       <ul className='home-options'>
//         <li><Link to='/distillery/createpost/'>Add a Post</Link></li>
//         <li><Link to='/distillery/videos/'>Add a Video</Link></li>
//         <li><Link to='/distillery/quizzes'>Add a Quiz</Link></li>
//       </ul>
//       <ol>
//         {
//           posts.map(post => {
//             console.log('This is the post inside the home', post);
//             return <li className='home-article' key={post.id}>
//             <h2 className='home-article-title'>{post.title}</h2>
//             <p className='home-article-author-date'><em>Author: {post.author}, Date: {post.date}</em></p>
//             <p className='home-article-article'>{post.article}</p>
//             </li>
//           })
//         }
//       </ol>
//     </section>
//   </div>
// )}

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount(){
    const { fetchPosts } = this.props;
    // console.log(fetchPosts());
    // fetchPosts();
    axios.get('/api/ankkshusposts')
    .then(res => res.data)
    .then(posts => {
     this.setState({posts: posts.reverse()})
    });
  }

  render(){
    const { currentUser } = this.props;
    const { posts } = this.state;
    return (
    <div className='home'>
      <h1>Welcome, {currentUser}!</h1>
      <p>Add new content.</p>
      <section>
        <ul className='home-options'>
          <li><Link to='/distillery/createpost/'>Add a Post</Link></li>
          <li><Link to='/distillery/videos/'>Add a Video</Link></li>
          <li><Link to='/distillery/quizzes'>Add a Quiz</Link></li>
        </ul>
        <ol>
          {
            posts.map(post => {
              return <li className='home-article' key={post.id}>
              <h2 className='home-article-title'>{post.title}</h2>
              <p className='home-article-author-date'><em>Author: {post.author}, Date: {post.date}</em></p>
              <p className='home-article-article'>{post.article}</p>
              </li>
            })
          }
        </ol>
      </section>
    </div>
  )}
}

const mapState = state => ({
  currentUser: state.currentUser,
  posts: state.posts
});

const mapDispatch = (dispatch, getState) => {
  return {
    fetchPosts
  }
}

export default connect(mapState, mapDispatch)(Home);