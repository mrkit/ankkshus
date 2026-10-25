import React from 'react';
import { useNavigate } from 'react-router-dom';

// React Router 6+ removed props.history. This passes `navigate` instead.
const withNavigate = Component => props => {
  const navigate = useNavigate();
  return <Component {...props} navigate={navigate} />;
};

export default withNavigate;
