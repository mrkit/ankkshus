import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editCurrentUser, logUserIn, logUserOut } from '../../../store';

class Login extends Component {
  state = {
    username: '',
    password: '',
    signUp: false,
  }
  
  handleUsername = ev => {
    this.setState({username: ev.target.value});
  }
  
  handlePassword = ev => {
    this.setState({password: ev.target.value});
  }
  
  handleClick = () => {
    const { signUp } = this.state;
    signUp ? 
      this.setState({signUp: false}) :
      this.setState({signUp: true});
  }
  
  render(){
    const { handleUsername, handlePassword, handleClick } = this;
    const { handleSignUpSubmit, handleLoginSubmit } = this.props;
    
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
  currentUser: state.currentUser,
  loggedIn: state.loggedIn
});

const mapDispatch = (dispatch, props) => ({
    handleLoginSubmit(ev){
      ev.preventDefault();

      const username = ev.target.username.value;
      const password = ev.target.password.value;

      axios.post('/api/login', {username, password})
      .then(res => res.data)
      .then(user => {
        console.log('this is the user', user); 
        dispatch(editCurrentUser(user.username));
        dispatch(logUserIn());
      })
      .catch(err => console.log(`Axios POST login error message: ${err.message}`));
    },
  
    handleSignUpSubmit(ev){
    ev.preventDefault();
    
    const username = ev.target.username.value;
    const password = ev.target.password.value;

    axios.post('/api/signUp', {username, password})
    .then(res => res.data)
    .then(user => {
      console.log('This is the user', user);
      dispatch(editCurrentUser(user.username));
      dispatch(logUserIn());
    })
    .then(() => props.history.push('/'))
    .catch(err => console.log(`Axios POST sign up error message ${err.message}`));
    }
})


export default connect(mapState, mapDispatch)(Login);

