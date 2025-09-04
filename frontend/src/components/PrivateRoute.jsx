import React from 'react'
import { Navigate } from 'react-router-dom'
import userAuthStore from '../store/authStore'

const PrivateRoute = ({ children }) => {
    const { user } = userAuthStore();
    
    return user ? children : <Navigate to="/"></Navigate>
}

export default PrivateRoute
