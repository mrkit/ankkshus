import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Distillery from './pages/Distillery/Distillery';
import Home from './pages/Home';

const Main = () => (
  <main>
    <Route exact path='/' component={Home}/> 
    <Route path='/distillery' component={Distillery} />
    <Route path='/luci' render={() => window.open('/luci')}/>
    <Route path='/login' component={Login} />
  </main>
);

export default Main;