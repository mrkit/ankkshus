import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Quizzes from './Quizzes/Quizzes';

class TableOfContents extends Component {
  render(){
    return (
      <Fragment>
        <h1>This is the new distillery</h1>
        <ul className='table-of-contents'>
          <li><Link to='/distillery/videos'>Videos</Link></li>
          <li><Link to='/distillery/quizzes'>Quizzes</Link></li>
          <li><Link to='/distillery/games'>Games</Link></li>
        </ul>        
      </Fragment>
    )
  }
}

export default TableOfContents;