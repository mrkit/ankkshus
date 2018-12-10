import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
  
  componentDidMount(){
    const bizken = localStorage['bizken'];
    
    if(bizken){
        axios.defaults.headers.common.authorization = `Bearer ${bizken}`;
    } else {
      delete axios.defaults.headers.common.authorization;
    }
  }
  
  render(){
     return (
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App