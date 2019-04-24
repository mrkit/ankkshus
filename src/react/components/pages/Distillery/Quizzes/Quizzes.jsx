import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Burns from './QuizPages/Burns';

class Quizzes extends Component {
  render(){
    return (
      <section className="quiz">
        <h1>Quizzes</h1>
        <Switch>
            <Route exact path='/distillery/quizzes/' render={() => <h2>Hello</h2>}/>
            <Route path='/distillery/quizzes/burns/' component={Burns}/>
        </Switch>
      </section>
    )
  }
}

export default Quizzes;