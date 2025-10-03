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
        
        console.log('Auth verification response:', res.data);
        
        if (res.data.isValid && res.data.user) {
          console.log('Auth verification successful:', res.data);
          // Safely handle user data with fallbacks
          const userData = {
            id: res.data.user.id || '1',
            username: res.data.user.username || 'admin',
            isAdmin: res.data.user.isAdmin === true || false
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
        console.error('Error details:', err.response?.data || err.message);
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
      
      console.log('Login response:', res.data);
      
      // Handle different response structures
      const { token, user } = res.data;
      
      if (!token) {
        console.error('No token received from login');
        return false;
      }
      
      // Safely handle user data with fallbacks
      const userData = {
        id: user?.id || '1',
        username: user?.username || username,
        isAdmin: user?.isAdmin === true || false
      };
      
      console.log('Admin login successful, user data:', userData);
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Admin login failed:', err);
      console.error('Error details:', err.response?.data || err.message);
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