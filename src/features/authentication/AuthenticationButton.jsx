import React from 'react';
import Button from '../../components/buttons/Button';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return isAuthenticated 
    ? <Button type="btn-danger" onClick={() =>
      logout({
        returnTo: window.location.origin,
      })
    }>Log out</Button>
    : <Button type="btn-primary" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default AuthenticationButton;