import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { createApiUrl } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await axios.get(createApiUrl('/auth/verify'), {
          headers: { 'x-auth-token': token }
        });
        
        if (res.data.isValid) {
          console.log('Auth verification successful:', res.data);
          // Ensure isAdmin is properly set as a boolean
          const userData = {
            ...res.data.user,
            isAdmin: res.data.user.isAdmin === true
          };
          console.log('Setting user with admin status:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log('Auth verification failed:', res.data);
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function - admin only
  const login = async (username, password) => {
    try {
      const res = await axios.post(createApiUrl('/auth/login'), {
        username,
        password
      });
      
      const { token, user } = res.data;
      const userData = {
        ...user,
        isAdmin: user.isAdmin === true
      };
      console.log('Admin login successful, user data:', userData);
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Admin login failed:', err);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };


  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};