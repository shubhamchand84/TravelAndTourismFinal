// API Configuration for different environments
const API_CONFIG = {
  development: {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api'
  },
  production: {
    BASE_URL: process.env.REACT_APP_API_URL || 'https://travelandtourismfinalbackenddd.onrender.com/api'
  }
};

const environment = process.env.NODE_ENV || 'development';
const config = API_CONFIG[environment];

export const API_BASE_URL = config.BASE_URL;

// Helper function to create full API URLs
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export default config;
