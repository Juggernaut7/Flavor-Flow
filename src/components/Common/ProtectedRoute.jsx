import React, { useEffect } from 'react';

const ProtectedRoute = ({ children, isAuthenticated, onNavigate }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate('auth');
    }
  }, [isAuthenticated, onNavigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;