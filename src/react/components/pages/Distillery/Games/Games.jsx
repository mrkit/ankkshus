import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

//          <Route path='/luci' render={() => window.open('/luci')}/>

class Games extends Component {
  render(){
    return (
      <div className='games'>
        <h1>Games</h1>
        <ul className='games-list'>
          <li className='games-list-item'><Link to="/luci"><img src="/assets/images/luci/thumbnail.jpg" alt="Luci"/></Link></li>
        </ul>
      </div>
    )
  }
}

export default Games;