import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import TableOfContents from './TableOfContents';
import Videos from './Videos/Videos';
import Quizzes from './Quizzes/Quizzes';
import Games from './Games/Games';
import CreatePost from './Posts/CreatePost';

class Distillery extends Component {
  render(){
    return (
      <section className='distillery'>
        <Switch>
          <Route exact path='/distillery/' component={TableOfContents}/>
          <Route path='/distillery/quizzes/' component={Quizzes}/>
          <Route path='/distillery/games/' component={Games}/>
          <Route path='/distillery/videos' component={Videos} />
          <Route path='/distillery/createpost/' component={CreatePost}/>
        </Switch>
      </section>
    )
  }
}

export default Distillery;