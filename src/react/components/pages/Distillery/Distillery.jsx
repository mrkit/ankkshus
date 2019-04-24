import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import DistillerySidebar from './DistillerySidebar';
import Videos from './Videos/Videos';
import Quizzes from './Quizzes/Quizzes';
import Games from './Games/Games';
import CreatePost from './Posts/CreatePost';

class Distillery extends Component {
  render(){
    return (
      <section className='distillery'>
        <DistillerySidebar/>
        <section className="distillery-main">
          <Switch>
            <Route exact path='/distillery/' render={() => console.log('temp')}/>
            <Route path='/distillery/quizzes/' component={Quizzes}/>
            <Route path='/distillery/games/' component={Games}/>
            <Route path='/distillery/videos' component={Videos} />
            <Route path='/distillery/createpost/' component={CreatePost}/>
          </Switch>
        </section>
      </section>
    )
  }
}

export default Distillery;