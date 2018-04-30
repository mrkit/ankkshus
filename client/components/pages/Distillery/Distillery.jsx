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
      <section className="pageContainer">
        <h1>Welcome to the Distillery!</h1>
        <p>We've got drinks and dinks, help yourself.</p>
        <section className="ccSection">
          <h2>Games:</h2>
          <div className="rowContainer">
            <article>
              <h3><Link to="/luci">Luci</Link></h3>
              <iframe width="560" height="315" src="/luci" frameBorder="0" allowFullScreen></iframe>
            </article>
          </div>
        </section>
      </section>
    )
  }
}

export default Distillery;