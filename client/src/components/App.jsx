import React, { Component } from 'react';
//import { Route, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {}
  }
  
  render(){
    return (
      <div id="container">
        <div className="cog one"></div>
        <div className="cog two"></div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App