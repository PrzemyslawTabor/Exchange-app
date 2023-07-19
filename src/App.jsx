import React from 'react';
import NavBar from './components/NavBar';
import RootLayout from './components/RootLayout';
import { Outlet } from 'react-router-dom';
import ProtectedCreateWalletRoute from './utils/ProtectedRoute';

import './app.css';

const App = () => {
  return (
    <>
    <Outlet />
    <main>
        <NavBar />
        <RootLayout />
    </main>
    </>
  );
};

export default App;
