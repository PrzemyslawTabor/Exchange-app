import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import BuyCurrencies from "./features/currencies/buy/BuyCurrencies";
import SellCurrencies from "./features/currencies/sell/SellCurrencies";
import CreateInitialWallet from "./features/currencies/initial/CreateInitialWallet";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import Providers from "./features/authentication/Providers";

import 'bootstrap/dist/css/bootstrap.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      { path: "/buy-currencies", element: <ProtectedRoute><BuyCurrencies /></ProtectedRoute>},
      { path: "/sell-currencies", element: <ProtectedRoute><SellCurrencies /></ProtectedRoute>},
      { path: "/create-initial-wallet", element: <ProtectedRoute><CreateInitialWallet /></ProtectedRoute>},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
