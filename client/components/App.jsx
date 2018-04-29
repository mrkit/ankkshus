import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

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