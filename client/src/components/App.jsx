import React, { Component } from 'react';
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
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App