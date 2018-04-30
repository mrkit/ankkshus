import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    username: '',
    password: '',
    signUp: false
  }
  
  handleUsername = ev => {
    this.setState({username: ev.target.value})
  }
  
  handlePassword = ev => {
    this.setState({password: ev.target.value})
  }
  
  handleLoginSubmit = ev => {
    ev.preventDefault();
    
    const username = ev.target.username.value;
    const password = ev.target.password.value;
    
    axios.post('/api/login', {username, password});

    this.setState({username: '', password:''});
            
//    taken from login: <h1>{this.props.currentUser}</h1>

    window.location.href="/"
  } 
  
  handleSignUpSubmit = ev => {
    ev.preventDefault();
    
    const username = ev.target.username.value;
    const password = ev.target.password.value;
    
    axios.post('/api/signUp', {username, password});
    
    this.setState({username: '', password:''});
    
    window.location.href="/"
  }
  
  handleClick = () => {
    const { signUp } = this.state;
    signUp ? 
      this.setState({signUp: false}) :
      this.setState({signUp: true});
  }
  
  render(){
    const { handleLoginSubmit, handleSignUpSubmit, handleUsername, handlePassword, handleClick } = this;
    return (
      
      this.state.signUp ? 
      <div className="login">
        <form onSubmit={handleSignUpSubmit}>
          <label>Sign Up</label>
          <input type="text" name="username" onChange={handleUsername} placeholder="Register new username" autoFocus  value={this.state.username} />
           <input type="password" onChange={handlePassword} name="password" value={this.state.password} placeholder="Password" />
          <button>Submit</button>
        </form> 
        <button onClick={handleClick}>Or Login</button>
      </div>
      
      :
      
      <div className="login">
        <form onSubmit={handleLoginSubmit}>
          <label>Login</label>
          <input type="text" name="username" onChange={handleUsername} placeholder="Login username" autoFocus  value={this.state.username} />
          
            <input type="password" onChange={handlePassword} name="password" value={this.state.password} placeholder="Password" />
          <button>Submit</button>
        </form>
        <button onClick={handleClick}>Or Sign Up</button>
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

