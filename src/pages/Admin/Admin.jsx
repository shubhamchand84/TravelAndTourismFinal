import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { useAuth } from '../../context/AuthContext';

const Admin = () => {
  const { isAuthenticated, login, logout, user } = useAuth();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contents, setContents] = useState([]);
  const [currentContent, setCurrentContent] = useState({
    section: '',
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch contents when component mounts
  useEffect(() => {
    fetchContents();
  }, []);



  const fetchContents = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/content');
      setContents(res.data);
    } catch (err) {
      console.error('Error fetching contents:', err);
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(loginForm.username, loginForm.password);
      if (!success) {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleContentChange = (e) => {
    setCurrentContent({ ...currentContent, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in');
        return;
      }

      // Save content data
      const contentRes = await axios.post(
        'http://localhost:5000/api/content',
        currentContent,
        { headers: { 'x-auth-token': token } }
      );

      // If file is selected, upload it
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        await axios.post(
          `http://localhost:5000/api/content/upload/${currentContent.section}`,
          formData,
          { headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' } }
        );
      }

      setSuccessMessage('Content updated successfully!');
      fetchContents();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update content');
    } finally {
      setIsLoading(false);
    }
  };

  const selectContent = (content) => {
    setCurrentContent(content);
    setActiveTab('edit');
  };

  const createNewContent = () => {
    setCurrentContent({
      section: '',
      title: '',
      description: '',
      price: '',
      imageUrl: ''
    });
    setActiveTab('edit');
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login-form">
          <h2>Admin Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'edit' ? 'active' : ''}
            onClick={() => setActiveTab('edit')}
          >
            Edit Content
          </button>
        </div>

        <div className="admin-main">
          {activeTab === 'dashboard' && (
            <div className="admin-dashboard">
              <h2>Content Sections</h2>
              <button className="new-content-btn" onClick={createNewContent}>
                Create New Section
              </button>
              
              <div className="content-list">
                {contents.length === 0 ? (
                  <p>No content sections found. Create your first one!</p>
                ) : (
                  contents.map((content) => (
                    <div className="content-item" key={content._id}>
                      <h3>{content.title}</h3>
                      <p><strong>Section:</strong> {content.section}</p>
                      <p><strong>Last Updated:</strong> {new Date(content.updatedAt).toLocaleString()}</p>
                      <button onClick={() => selectContent(content)}>Edit</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="admin-edit">
              <h2>{currentContent._id ? 'Edit Content' : 'Create New Content'}</h2>
              
              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
              
              <form onSubmit={handleContentSubmit}>
                <div className="form-group">
                  <label>Section ID (unique identifier)</label>
                  <input
                    type="text"
                    name="section"
                    value={currentContent.section}
                    onChange={handleContentChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentContent.title}
                    onChange={handleContentChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={currentContent.description}
                    onChange={handleContentChange}
                    required
                    rows="5"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Price (optional)</label>
                  <input
                    type="text"
                    name="price"
                    value={currentContent.price}
                    onChange={handleContentChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Image</label>
                  {currentContent.imageUrl && (
                    <div className="current-image">
                      <img 
                        src={`http://localhost:5000${currentContent.imageUrl}`} 
                        alt="Current content image" 
                      />
                      <p>Current image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Content'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;