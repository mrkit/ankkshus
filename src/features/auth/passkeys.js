import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';

async function post(url, body) {
  const res = await fetch(`/api/auth/${url}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data.error ?? 'Something went wrong. Try again.');
  return data;
}

// The browser and the password manager raise these when the person closes
// the prompt or the device has no passkey for this site.
function explain(err) {
  if (err?.name === 'NotAllowedError')
    return new Error('No passkey was used. Try again when you are ready.');
  if (err?.name === 'InvalidStateError')
    return new Error('This device already has a passkey for that seat.');
  return err;
}

export async function signInWithPasskey() {
  const optionsJSON = await post('login/options');
  let response;
  try {
    response = await startAuthentication({ optionsJSON });
  } catch (err) {
    throw explain(err);
  }
  return post('login/verify', response);
}

export async function createSeat({ username, setupCode }) {
  const optionsJSON = await post('register/options', { username, setupCode });
  let response;
  try {
    response = await startRegistration({ optionsJSON });
  } catch (err) {
    throw explain(err);
  }
  return post('register/verify', response);
}
