import React from 'react';
import Button from '../../components/buttons/Button';
import { getAuth0Variables } from './auth0Actions';

const AuthenticationButton = () => {
  const { isAuthenticated, logout, loginWithRedirect } = getAuth0Variables();

  return isAuthenticated 
    ? <Button type="btn-danger" onClick={() =>
      logout({
        returnTo: window.location.origin,
      })
    }>Log out</Button>
    : <Button type="btn-primary" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default AuthenticationButton;