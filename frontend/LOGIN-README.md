# Admin Login System Documentation

## Overview

This document provides information about the admin login system for the travel application. The system allows administrators to authenticate and access the admin dashboard.

## Login Pages

### 1. Fixed Login Page (`login-fixed.html`)

This is the recommended login page that has been fixed to work properly with the backend authentication system.

- **Features**:
  - Simple and clean UI
  - Proper error handling
  - Token storage in localStorage
  - Automatic redirect to admin dashboard after successful login

- **Usage**:
  - Open `login-fixed.html` in a browser
  - Enter the admin credentials (username: `admin`, password: `admin123`)
  - Click the Login button
  - Upon successful login, you will be redirected to the admin dashboard

### 2. Enhanced Login Page (`admin-login-fixed.html`)

This is an enhanced version of the login page with additional features for debugging and token management.

- **Additional Features**:
  - Token information display
  - Token clearing functionality
  - Detailed payload information
  - Admin status verification

- **Usage**:
  - Same as the fixed login page, but with additional token management options

## Backend Authentication

The backend authentication system has been updated to ensure reliable login functionality.

- **Updates**:
  - Added direct password comparison for development/testing
  - Enhanced logging for debugging authentication issues
  - Improved error handling

## Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Authentication Flow

1. User enters credentials on the login page
2. Frontend sends a POST request to `http://localhost:5001/api/auth/login`
3. Backend verifies the credentials
4. If valid, backend generates a JWT token and sends it in the response
5. Frontend stores the token in localStorage
6. User is redirected to the admin dashboard

## Token Verification

The token can be verified by sending a GET request to `http://localhost:5001/api/auth/verify` with the token in the `x-auth-token` header.

## Troubleshooting

- **Invalid Credentials Error**: Make sure you're using the correct username and password
- **Server Connection Error**: Ensure the backend server is running on port 5001
- **Token Validation Error**: The token may have expired; try logging in again

## Security Notes

- The current implementation uses a hardcoded admin user for demonstration purposes
- In a production environment, user credentials should be stored in a database
- The JWT secret should be stored in an environment variable
- HTTPS should be used for all authentication requests in production