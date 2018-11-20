import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Quizzes from './Quizzes/Quizzes';

class Distillery2 extends Component {
  render(){
    return (
      <Fragment>
        <h1>This is the new distillery</h1>
        <Switch>
          <Route exact path='/distillery2/' render={() => <h1>Made it to hoempage for new distillery2</h1>}/>
          <Route path='/distillery2/quizzes/' component={Quizzes}/>
        </Switch>
      </Fragment>
    )
  }
}

export default Distillery2;