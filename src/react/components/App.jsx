import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  componentDidMount(){
    const bizken = localStorage['bizken'];
    
    if(bizken){
        axios.defaults.headers.common.authorization = `Bearer ${bizken}`;
    } else {
      delete axios.defaults.headers.common.authorization;
    }
  }
  
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }
  
  render(){
    
     return this.state.hasError ?
      <h1>Something went wrong!</h1> :
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    
  }
}

export default App