import React from 'react';
import { connect } from 'react-redux';

const Home = ({currentUser}) => (
  <section>
    <h1>Welcome, {currentUser}!</h1>
  </section>
)

const mapState = state => ({
  currentUser: state.currentUser
});

export default connect(mapState)(Home);