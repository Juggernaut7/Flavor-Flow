import React, { createContext, useState, useEffect } from 'react';
import { getAuthStatus, loginUser, registerUser, logoutUser } from '../utils/authUtils';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const status = getAuthStatus();
    setIsAuthenticated(status.isAuthenticated);
    setUserId(status.userId);
    setUsername(status.username);
  }, []);

  const login = (user, pass) => {
    const result = loginUser(user, pass);
    if (result.success) {
      setIsAuthenticated(true);
      setUserId(result.userId);
      setUsername(result.username);
    }
    return result;
  };

  const register = (user, pass) => {
    const result = registerUser(user, pass);
    if (result.success) {
      setIsAuthenticated(true);
      setUserId(result.userId);
      setUsername(result.username);
    }
    return result;
  };

  const logout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUserId(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
