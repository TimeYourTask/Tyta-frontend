import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/500" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
