import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Burns from './QuizPages/Burns';

class Quizzes extends Component {
  render(){
    return (
      <Fragment>
        <nav>
          <ul>
            <li><Link to='/distillery/'>Distillery Home</Link></li>
            <li><Link to='/distillery/quizzes/'>Quiz List</Link></li>
            <li><Link to='/distillery/quizzes/burns/'>Burns Checklist</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/distillery/quizzes/' render={() => <h1>Quizzes Page </h1>}/>
          <Route path='/distillery/quizzes/burns/' component={Burns}/>
        </Switch>
      </Fragment>
    )
  }
}

export default Quizzes;