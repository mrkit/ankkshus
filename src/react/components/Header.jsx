import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserOut } from '../store';

const Header = (props) => ( 
  <header>
    <Link to="/">
      <div id="ankkshus" className="fade"></div>
    </Link>

    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="videos">Videos</Link></li>   
        <li><Link to="/distillery">Distillery</Link></li>
        <li><Link to="/quiz">Quizzes</Link></li>
        <li onClick={props.handleClick}><Link to="/login">{props.loggedIn ? 'Logout' : 'Login'}</Link></li>
      </ul>         
    </nav>
  </header>
)

const mapState = state => ({
    loggedIn: state.loggedIn
});

const mapDispatch = dispatch => ({
   handleClick(e){
     console.log('Made it', e)
     dispatch(logUserOut());
  }
})

export default connect(mapState, mapDispatch)(Header);
