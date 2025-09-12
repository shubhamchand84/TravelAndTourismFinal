import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
        const res = await axios.get('http://localhost:5000/api/auth/verify', {
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

  // Login function
  const login = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        username,
        password
      });
      
      const { token, user } = res.data;
      // Ensure isAdmin is properly set as a boolean
      const userData = {
        ...user,
        isAdmin: user.isAdmin === true
      };
      console.log('Login successful, user data:', userData);
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', userData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};