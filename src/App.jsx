import React from 'react';
import RootLayout from './components/RootLayout';
import { Outlet } from 'react-router-dom';
import AuthNav from './features/authentication/AuthNav';
import './app.css';

const App = () => {
  return (
    <>
      <Outlet />
      <AuthNav />
      <RootLayout />
    </>
  );
};

export default App;
