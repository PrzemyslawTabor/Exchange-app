import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { isTokenCorrect } from './tokenActions';

const ProtectedRoute = ({children}) => {
    const {state} = useLocation();

    if (state === null || !isTokenCorrect(state.token)) {
        return <Navigate to="/"/>
    }

    return children
};

export default ProtectedRoute;