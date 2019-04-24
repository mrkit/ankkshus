import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Burns from './QuizPages/Burns';

class Quizzes extends Component {
  render(){
    return (
      <section className="quiz">
        <nav>
          <h2>Quizzes Page </h2>
          <ul>
            <li><Link to='/distillery/'>Distillery Home</Link></li>
            <li><Link to='/distillery/quizzes/'>Quiz List</Link></li>
            <li><Link to='/distillery/quizzes/burns/'>Burns Checklist</Link></li>
          </ul>
        </nav>
        <Switch>
            <Route exact path='/distillery/quizzes/' render={() => <h2>Hello</h2>}/>
            <Route path='/distillery/quizzes/burns/' component={Burns}/>
        </Switch>
      </section>
    )
  }
}

export default Quizzes;