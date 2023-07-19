import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import App from './App';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import { Provider } from 'react-redux';
import store from "./store/store";
import BuyCurrencies from "./components/BuyCurrencies";
import SellCurrencies from "./components/SellCurrencies";
import CreateInitialWallet from "./components/CreateInitialWallet";
import ProtectedRoute from "./utils/ProtectedRoute";

import 'bootstrap/dist/css/bootstrap.css';

const Auth0ProviderLayout = () => (
  <Auth0ProviderWithHistory>
    <Provider store={store}>
      <Outlet />
    </Provider>
  </Auth0ProviderWithHistory>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth0ProviderLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "/buy_currencies", element: <ProtectedRoute><BuyCurrencies /></ProtectedRoute>},
          { path: "/sell_currencies", element: <ProtectedRoute><SellCurrencies /></ProtectedRoute>},
          { path: "/create_initial_wallet", element: <ProtectedRoute><CreateInitialWallet /></ProtectedRoute>},
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
