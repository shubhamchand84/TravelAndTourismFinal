import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { createApiUrl } from '../../config/api';

const AuthDebug = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(createApiUrl('/auth/login'), {
        username: 'admin',
        password: 'admin123'
      });
      
      setResponse({
        success: true,
        data: res.data,
        status: res.status
      });
    } catch (err) {
      setResponse({
        success: false,
        error: err.message,
        data: err.response?.data,
        status: err.response?.status
      });
    } finally {
      setLoading(false);
    }
  };

  const testAPI = async () => {
    setLoading(true);
    try {
      const res = await axios.get(createApiUrl('/travel-packages'));
      setResponse({
        success: true,
        data: res.data,
        status: res.status,
        type: 'API Test'
      });
    } catch (err) {
      setResponse({
        success: false,
        error: err.message,
        data: err.response?.data,
        status: err.response?.status,
        type: 'API Test'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-3">
      <Card.Header>
        <h5>Authentication Debug Tool</h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <Button 
            variant="primary" 
            onClick={testLogin} 
            disabled={loading}
            className="me-2"
          >
            {loading ? 'Testing...' : 'Test Admin Login'}
          </Button>
          <Button 
            variant="secondary" 
            onClick={testAPI} 
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Test API Connection'}
          </Button>
        </div>

        <div className="mb-3">
          <strong>API URL:</strong> {createApiUrl('/auth/login')}
        </div>

        {response && (
          <Alert variant={response.success ? 'success' : 'danger'}>
            <h6>{response.type || 'Login Test'} Result:</h6>
            <div><strong>Status:</strong> {response.status}</div>
            {response.success ? (
              <div>
                <strong>Success!</strong>
                <pre>{JSON.stringify(response.data, null, 2)}</pre>
              </div>
            ) : (
              <div>
                <strong>Error:</strong> {response.error}
                {response.data && (
                  <pre>{JSON.stringify(response.data, null, 2)}</pre>
                )}
              </div>
            )}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default AuthDebug;
