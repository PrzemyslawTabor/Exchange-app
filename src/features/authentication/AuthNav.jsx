import React from 'react';
import AuthenticationButton from './AuthenticationButton';
import { getAuth0Variables } from './auth0Actions';

const AuthNav = () => {
  const { user, isAuthenticated } = getAuth0Variables();

  return (
    <>
      <nav className="navbar navbar-light bg-light px-3 border border-1 border-dark">
        <span className="navbar-brand mb-0"><h2>Exchange</h2></span>
        {isAuthenticated && (
            <span className="navbar-text pb-0 pt-3 me-3 ms-auto">
              <p className="margin-md">Logged in as <b>{user.name}</b></p>
            </span>
        )}
        <div className="nav-item">
          <AuthenticationButton />
        </div>
      </nav>
    </>
  );

};

export default AuthNav;