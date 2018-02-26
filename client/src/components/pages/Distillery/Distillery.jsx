import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Distillery extends Component {
  constructor(){
    super();
    this.state = {}
  }
  
  componentDidMount(){
    
  }
  
  render(){
    
    return(
      <section>
        <h1>Welcome to the Distillery!</h1>
        <p>We've got drinks and dinks, help yourself.</p>
        
        <section>
          <h2>Games:</h2>
          <Link to='/luci'>Play Luci</Link>
        </section>
      </section>
    )
  }
}

export default Distillery;