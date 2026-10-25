import { useState } from 'react';
import { useLoginMutation, useSignUpMutation } from '../../app/api.js';
import { DragonMark } from '../../dragons/dragons.jsx';

function errorMessage(error) {
  if (!error) return null;
  if (error.status === 409) return 'That name is taken at this table.';
  if (error.status === 401) return 'That name and password do not match.';
  if (error.data?.issues)
    return error.data.issues.map((i) => `${i.path}: ${i.message}`).join(' ');
  return 'Something went wrong. Try again.';
}

export function LoginPage() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, loginState] = useLoginMutation();
  const [signUp, signUpState] = useSignUpMutation();

  const isSignUp = mode === 'signup';
  const state = isSignUp ? signUpState : loginState;
  const submit = isSignUp ? signUp : login;

  return (
    <div className="login-wrap">
      <div className="login card">
        <div className="login-mark">
          <DragonMark size={34} />
          ankkshus
        </div>
        <p className="muted">A table for two. Sign in to sit down.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit({ username, password });
          }}
        >
          <label className="field">
            <span>Name</span>
            <input
              className="input"
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              className="input"
              type="password"
              name="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={isSignUp ? 8 : undefined}
            />
          </label>
          {isSignUp && <p className="muted">Eight characters or more.</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={state.isLoading}
          >
            {isSignUp ? 'Create my seat' : 'Sit down'}
          </button>
          {state.error && (
            <p className="error" role="alert">
              {errorMessage(state.error)}
            </p>
          )}
        </form>

        <button
          type="button"
          className="btn-link"
          onClick={() => setMode(isSignUp ? 'login' : 'signup')}
        >
          {isSignUp
            ? 'I already have a seat'
            : 'First time here? Create a seat'}
        </button>
      </div>
    </div>
  );
}
