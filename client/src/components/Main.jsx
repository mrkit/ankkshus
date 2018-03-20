import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Quiz from './pages/Quiz/Quiz.jsx';
import Login from './pages/Login/Login.jsx';
import Distillery from './pages/Distillery/Distillery.jsx';
import Videos from './pages/Videos/Videos.jsx';
import Brainstorm from './pages/Brainstorm/Brainstorm.jsx';

class Main extends Component {
  state = {}
  
  componentWillMount(){
    const bizken = localStorage['bizken'];
    
    if(bizken){
        axios.defaults.headers.common.authorization = `Bearer ${bizken}`;
    } else {
      delete axios.defaults.headers.common.authorization
    }
  }
  
  render(){
    return (
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
      <Route path='/brainstorm' component={Brainstorm} />
      <Route path='/login' component={Login} />
    </main>
    )
  }
}

export default Main;