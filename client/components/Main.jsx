import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Quiz from './pages/Quiz/Quiz';
import Login from './pages/Login/Login';
import Distillery from './pages/Distillery/Distillery';
import Videos from './pages/Videos/Videos';

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
      <main>

      <Route exact path='/' render={() => (
        <section>
         <h1>Sestra!</h1>
        </section>
        )}/> 
      <Route path='/videos' component={Videos} />
      <Route path='/luci' render={() => window.open('/luci')}/>
      <Route path='/distillery' component={Distillery} />
      <Route path='/quiz' component={Quiz} /> 
      <Route path='/login' component={Login} />
    </main>
    )
  }
}

export default Main;