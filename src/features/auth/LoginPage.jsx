import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useMeQuery,
  useSignUpMutation,
} from '../../app/api.js';

function errorMessage(error) {
  if (!error) return null;
  if (error.status === 409) return 'That username is taken.';
  if (error.status === 401) return 'Invalid username or password.';
  if (error.data?.issues)
    return error.data.issues.map((i) => `${i.path}: ${i.message}`).join(' ');
  return 'Something went wrong. Try again.';
}

export function LoginPage() {
  const navigate = useNavigate();
  const { data: me } = useMeQuery();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, loginState] = useLoginMutation();
  const [signUp, signUpState] = useSignUpMutation();

  if (me?.user) return <Navigate to="/" replace />;

  const isSignUp = mode === 'signup';
  const state = isSignUp ? signUpState : loginState;
  const submit = isSignUp ? signUp : login;

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await submit({ username, password });
    if (!result.error) navigate('/');
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <input
          type="text"
          name="username"
          autoComplete="username"
          placeholder={isSignUp ? 'Register new username' : 'Login username'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={isSignUp ? 8 : undefined}
          required
        />
        <button type="submit" disabled={state.isLoading}>
          Submit
        </button>
        {state.error && <p role="alert">{errorMessage(state.error)}</p>}
      </form>
      <button
        type="button"
        onClick={() => setMode(isSignUp ? 'login' : 'signup')}
      >
        {isSignUp ? 'Or Login' : 'Or Sign Up'}
      </button>
    </div>
  );
}
