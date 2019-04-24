import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Quizzes from './Quizzes/Quizzes';

class DistillerySidebar extends Component {
  render(){
    return (
     <aside className='distillery-sidebar'>
        <h2 className='distillery-sidebar-title'>The Distillery</h2>
        <ul className='distillery-sidebar-main-tabs'>
          <li><Link to='/distillery/videos'>Videos</Link></li>
          <li><Link to='/distillery/quizzes'>Quizzes</Link></li>
          <li><Link to='/distillery/games'>Games</Link></li>
        </ul>   
      </aside>
    )
  }
};

export default DistillerySidebar;