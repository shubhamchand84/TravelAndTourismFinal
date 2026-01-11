// API Configuration for different environments
const API_CONFIG = {
  development: {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api'
  },
  production: {
    BASE_URL: process.env.REACT_APP_API_URL || 'https://travelandtourismfinalbackenddd.onrender.com/api'
  }
};

// Fallback for Render environment
const getApiBaseUrl = () => {
  // Check for Render-specific environment variables
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Check if we're on Render and set correct backend URL
  if (window.location.hostname.includes('onrender.com')) {
    return 'https://travelandtourismfinalbackenddd.onrender.com/api';
  }
  
  // Default fallback based on NODE_ENV
  const environment = process.env.NODE_ENV || 'development';
  return API_CONFIG[environment].BASE_URL;
};

const environment = process.env.NODE_ENV || 'development';
const config = API_CONFIG[environment];

export const API_BASE_URL = getApiBaseUrl();

// Helper function to create full API URLs
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export default config;
