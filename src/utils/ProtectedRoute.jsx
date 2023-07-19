import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { removeToken } from './tokenActions';

const ProtectedRoute = ({children}) => {
    const {state} = useLocation();
    const storegeToken = localStorage.getItem('token')
    removeToken();

    if (state === null || storegeToken !== state.token) {
        return <Navigate to="/"/>
    }

    return children
};

export default ProtectedRoute;