import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../app/api.js';
import { DragonMark } from '../../dragons/dragons.jsx';
import { createSeat, signInWithPasskey } from './passkeys.js';

export function LoginPage() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [setupCode, setSetupCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const isSignUp = mode === 'signup';

  async function run(ceremony) {
    setBusy(true);
    setError(null);
    try {
      await ceremony();
      dispatch(api.util.invalidateTags(['Me', 'Users']));
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login card">
        <div className="login-mark">
          <DragonMark size={34} />
          ankkshus
        </div>

        {isSignUp ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(() => createSeat({ username, setupCode }));
            }}
          >
            <p className="muted">
              A seat is a name and a passkey. Your device or password manager
              saves the passkey; save it to a shared vault to hand it on.
            </p>
            <label className="field">
              <span>Name</span>
              <input
                className="input"
                type="text"
                name="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={2}
              />
            </label>
            <label className="field">
              <span>Setup code</span>
              <input
                className="input"
                type="password"
                name="setup-code"
                autoComplete="off"
                value={setupCode}
                onChange={(e) => setSetupCode(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              Create the passkey
            </button>
          </form>
        ) : (
          <div className="stack">
            <p className="muted">A table for two. Sign in to sit down.</p>
            <button
              type="button"
              className="btn btn-primary"
              disabled={busy}
              onClick={() => run(signInWithPasskey)}
            >
              Sign in with a passkey
            </button>
          </div>
        )}

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          className="btn-link"
          onClick={() => {
            setMode(isSignUp ? 'login' : 'signup');
            setError(null);
          }}
        >
          {isSignUp ? 'I already have a seat' : 'Setting up a seat?'}
        </button>
      </div>
    </div>
  );
}
