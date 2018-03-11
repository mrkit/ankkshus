import React from 'react';
import { Route } from 'react-router-dom';
import Quiz from './pages/Quiz/Quiz.jsx';
import Login from './pages/Login/Login.jsx';
import Distillery from './pages/Distillery/Distillery.jsx';
import Videos from './pages/Videos/Videos.jsx';
import Brainstorm from './pages/Brainstorm/Brainstorm.jsx';

const Main = () => (
  <main className="fade">
    
    <Route exact path='/' render={() => (
      <section>
       <h1>Hello World</h1>
      </section>
      )}/> 
    <Route path='/videos' component={Videos} />
    <Route path='/luci' render={() => window.location.reload()}/>
    <Route path='/distillery' component={Distillery} />
    <Route path='/quiz' component={Quiz} /> 
    <Route path='/login' component={Login} />
    <Route path='/brainstorm' component={Brainstorm} />
  </main>
)

export default Main;