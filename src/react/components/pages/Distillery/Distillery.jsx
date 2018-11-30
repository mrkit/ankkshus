import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import TableOfContents from './TableOfContents';
import Videos from './Videos/Videos';
import Quizzes from './Quizzes/Quizzes';
import Games from './Games/Games';


class Distillery extends Component {
  render(){
    return (
      <Fragment>
        <Switch>
          <Route exact path='/distillery/' component={TableOfContents}/>
          <Route path='/distillery/quizzes/' component={Quizzes}/>
          <Route path='/distillery/games/' component={Games}/>
          <Route path='/distillery/videos' component={Videos} />
        </Switch>
      </Fragment>
    )
  }
}

export default Distillery;