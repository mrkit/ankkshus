import React from 'react';
import { connect } from 'react-redux';

const Home = ({currentUser}) => (
  <div className='home'>
    <h1>Welcome, {currentUser}!</h1>
    <p>Add new content.</p>
    <section>
      <ul className='home-options'>
        <li>Add a Post</li>
        <li>Add a Video</li>
        <li>Add a Quiz</li>
      </ul>
    </section>
  </div>
)

const mapState = state => ({
  currentUser: state.currentUser
});

export default connect(mapState)(Home);