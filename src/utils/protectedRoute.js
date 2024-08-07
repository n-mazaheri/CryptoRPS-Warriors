// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
