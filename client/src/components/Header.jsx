import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = (props) => (
  <header>
    <Link to="/">
      <div id="ankkshus" className="fade"></div>
    </Link>
    <p style={{
        position: 'relative',
        top: '-5rem',
        left: '25rem'
      }}>Hello {props.currentUser}</p>
    <nav className="fade">
      <ul>
        <li><Link to="videos">Videos</Link></li>   
        <li><Link to="/distillery">The Distillery</Link></li>
        <li><Link to="/quiz">Quizzes</Link></li>
        <li><Link to="mashups">Mashups</Link></li>
        <li><Link to="/login">{props.loginOrSignUp}</Link></li>
      </ul>         
    </nav>
  </header>
)

function mapStateToProps (state){
  return {
    loginOrSignUp: state.loginOrSignUp,
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(Header);