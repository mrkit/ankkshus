import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

//          <Route path='/luci' render={() => window.open('/luci')}/>

class Games extends Component {
  render(){
    return (
      <div>
        <h1>Games</h1>
        <ul>
          <li><Link to="/luci">Luci</Link></li>
        </ul>
      </div>
    )
  }
}

export default Games;