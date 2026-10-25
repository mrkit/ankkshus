import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Games extends Component {
  render(){
    return (
      <section className='games'>
        <h1>Games</h1>
        <ul className='games-list'>
          <li className='games-list-item'><Link to="/luci"><img src="/assets/images/luci/thumbnail.jpg" alt="Luci" className="games-list-item-thumbnail"/></Link></li>
        </ul>
      </section>
    )
  }
}

export default Games;
