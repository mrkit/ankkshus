import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import TableOfContents from './TableOfContents';
import Videos from './Videos/Videos';
import Quizzes from './Quizzes/Quizzes';
import Games from './Games/Games';
import CreatePost from './Posts/CreatePost';

class Distillery extends Component {
  render(){
    return (
      <section className='distillery'>
        <aside className='distillery-sidebar'>
          <h2>This is the new distillery</h2>
          <ul className='table-of-contents-categories'>
            <li><Link to='/distillery/videos'>Videos</Link></li>
            <li><Link to='/distillery/quizzes'>Quizzes</Link></li>
            <li><Link to='/distillery/games'>Games</Link></li>
          </ul>   
        </aside>
        <section class="distillery-main">
          <Switch>
            <Route exact path='/distillery/' component={TableOfContents}/>
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