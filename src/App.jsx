import React from 'react';
import RootView from './components/RootView';
import { Outlet } from 'react-router-dom';
import AuthNav from './features/authentication/AuthNav';
import './app.css';

const App = () => {
  return (
    <>
      <Outlet />
      <AuthNav />
      <RootView />
    </>
  );
};

export default App;
