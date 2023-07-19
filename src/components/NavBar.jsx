import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import AuthNav from './AuthNav';

const NavBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <nav className="navbar navbar-light bg-light px-3 border border-1 border-dark">
        <span className="navbar-brand mb-0"><h2>Exchange</h2></span>
        {isAuthenticated && (
            <span className="navbar-text pb-0 pt-3 me-3 ms-auto">
              <p className="margin-md">Logged in as <b>{user.name}</b></p>
            </span>
        )}
        <AuthNav />
      </nav>
    </>
  );
};

export default NavBar;