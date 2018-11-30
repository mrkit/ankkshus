import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login/Login';
import Distillery from './pages/Distillery/Distillery';
import Home from './pages/Home';

class Main extends Component {
  state = {}
  
  render(){
    return (
      <main>
        <Route exact path='/' component={Home}/> 
        <Route path='/distillery' component={Distillery} />
        <Route path='/luci' render={() => window.open('/luci')}/>
        <Route path='/login' component={Login} />
      </main>
    )
  }
}

export default Main;