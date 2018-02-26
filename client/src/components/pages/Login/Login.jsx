import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      signUp: false
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleUsername(ev){
    this.setState({username: ev.target.value})
  }
  
  handlePassword(ev){
    this.setState({password: ev.target.value})
  }
  
  handleLoginSubmit(ev){
    ev.preventDefault();
    
    const username = ev.target.username.value;
    const password = ev.target.password.value;
    
    axios.post('/api/login', {username, password});

    this.setState({username: '', password:''});
    
    window.location.href="/"
  } 
  
  handleSignUpSubmit(ev){
    ev.preventDefault();
    
    const username = ev.target.username.value;
    const password = ev.target.password.value;
    
    axios.post('/api/signUp', {username, password});
    
    this.setState({username: '', password:''});
    
    window.location.href="/"
  }
  
  handleClick(){
    const { signUp } = this.state;
    signUp ? 
      this.setState({signUp: false}) :
      this.setState({signUp: true});
  }
  
  render(){
    const { handleLoginSubmit, handleSignUpSubmit, handleUsername, handlePassword, handleClick } = this;
    return (
      
      this.state.signUp ? 
      <div>
        <form onSubmit={handleSignUpSubmit}>
         <label htmlFor="username">Sign Up  </label>
          <input type="text" name="username" onChange={handleUsername} placeholder="Register new username" autoFocus  value={this.state.username} />
          <input type="password" onChange={handlePassword} name="password" value={this.state.password} />
          <button>Submit</button>
        </form> 
        <h1>{this.props.currentUser}</h1>
        <button onClick={handleClick}>Change to Login</button>
      </div>
      
      :
      
      <div>
        <form onSubmit={handleLoginSubmit}>
         <label htmlFor="username">Login  </label>
          <input type="text" name="username" onChange={handleUsername} placeholder="Login username" autoFocus  value={this.state.username} />
          <input type="password" onChange={handlePassword} name="password" value={this.state.password} />
          <button>Submit</button>
        </form>
        <button onClick={handleClick}>Register new member</button>
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.currentUser
});

const mapDispatch = dispatch => ({
  
})

export default connect(mapState, mapDispatch)(Login);

