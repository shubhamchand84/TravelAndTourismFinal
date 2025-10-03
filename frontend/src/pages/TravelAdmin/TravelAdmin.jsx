import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal, Alert, Badge, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl } from '../../config/api';
import './TravelAdmin.css';

const TravelAdmin = () => {
  const { isAuthenticated } = useAuth();
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Package form state
  const [packageForm, setPackageForm] = useState({
    title: '',
    subtitle: '',
    price: '',
    startDate: '',
    endDate: '',
    shortDescription: '',
    tags: '',
    image: null
  });
  
  // Statistics state
  const [stats, setStats] = useState({
    totalPackages: 0,
    activePackages: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchPackages();
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please log in.');
        return;
      }

      const response = await axios.get(createApiUrl('/travel-packages/admin/all'), {
        headers: { 'x-auth-token': token }
      });
      
      if (response.data.success) {
        setPackages(response.data.data.packages);
      } else {
        setError('Failed to fetch packages: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      if (error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (error.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to fetch packages: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const packagesRes = await axios.get(createApiUrl('/travel-packages/admin/all'), {
        headers: { 'x-auth-token': token }
      });

      if (packagesRes.data.success) {
        const packages = packagesRes.data.data.packages;
        
        setStats({
          totalPackages: packages.length,
          activePackages: packages.filter(p => p.isActive).length
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handlePackageFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPackageForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setPackageForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');


    // Client-side validation
    if (packageForm.shortDescription.length > 1000) {
      setError('Description must be 1000 characters or less');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      Object.keys(packageForm).forEach(key => {
        if (packageForm[key] !== null && packageForm[key] !== '') {
          formData.append(key, packageForm[key]);
        }
      });

      const response = await axios.post(createApiUrl('/travel-packages'), formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSuccess('Package created successfully!');
        
        // Reset form
        setPackageForm({
          title: '',
          subtitle: '',
          price: '',
          startDate: '',
          endDate: '',
          shortDescription: '',
          tags: '',
          image: null
        });
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
        // Refresh data
        await fetchPackages();
        await fetchStats();
        
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError('Failed to create package: ' + response.data.message);
      }
    } catch (error) {
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        setError('Validation errors: ' + error.response.data.errors.join(', '));
      } else {
        setError(error.response?.data?.message || 'Failed to create package: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(createApiUrl(`/travel-packages/${packageId}`), {
        headers: { 'x-auth-token': token }
      });

      if (response.data.success) {
        setSuccess('Package deleted successfully!');
        fetchPackages();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      setError(error.response?.data?.message || 'Failed to delete package');
    }
  };



  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please log in to access the admin dashboard.
        </Alert>
      </Container>
    );
  }

  return (
    <div className="travel-admin">
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="admin-header">
              <h1 className="display-5 fw-bold text-primary mb-2">Travel Admin Dashboard</h1>
              <p className="text-muted">Manage travel packages</p>
            </div>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Card className="stat-card border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="stat-icon bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-3">
                  <i className="bi bi-box fs-3"></i>
                </div>
                <h3 className="fw-bold text-primary">{stats.totalPackages}</h3>
                <p className="text-muted mb-0">Total Packages</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="stat-card border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="stat-icon bg-success bg-opacity-10 text-success rounded-circle mx-auto mb-3">
                  <i className="bi bi-check-circle fs-3"></i>
                </div>
                <h3 className="fw-bold text-success">{stats.activePackages}</h3>
                <p className="text-muted mb-0">Active Packages</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Messages */}
        {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}


        {/* Packages Section */}
          <Row>
            <Col lg={4} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Package
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handlePackageSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title *</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={packageForm.title}
                        onChange={handlePackageFormChange}
                        placeholder="Package title"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Subtitle</Form.Label>
                      <Form.Control
                        type="text"
                        name="subtitle"
                        value={packageForm.subtitle}
                        onChange={handlePackageFormChange}
                        placeholder="Package subtitle"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Price ($) *</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={packageForm.price}
                        onChange={handlePackageFormChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Start Date *</Form.Label>
                          <Form.Control
                            type="date"
                            name="startDate"
                            value={packageForm.startDate}
                            onChange={handlePackageFormChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>End Date *</Form.Label>
                          <Form.Control
                            type="date"
                            name="endDate"
                            value={packageForm.endDate}
                            onChange={handlePackageFormChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Package Description *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="shortDescription"
                        value={packageForm.shortDescription}
                        onChange={handlePackageFormChange}
                        placeholder="Detailed description of the package (up to 1000 characters)"
                        required
                        isInvalid={packageForm.shortDescription.length > 1000}
                      />
                      <div className="d-flex justify-content-between">
                        <Form.Text className="text-muted">
                          Provide detailed information about the package
                        </Form.Text>
                        <Form.Text className={packageForm.shortDescription.length > 1000 ? 'text-danger' : 'text-muted'}>
                          {packageForm.shortDescription.length}/1000 characters
                        </Form.Text>
                      </div>
                      {packageForm.shortDescription.length > 1000 && (
                        <Form.Control.Feedback type="invalid">
                          Description must be 1000 characters or less
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control
                        type="text"
                        name="tags"
                        value={packageForm.tags}
                        onChange={handlePackageFormChange}
                        placeholder="adventure, beach, mountains (comma-separated)"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Package Image *</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={handlePackageFormChange}
                        accept="image/*"
                        required
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-100 py-2 fw-semibold"
                      disabled={loading || packageForm.shortDescription.length > 1000}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-circle me-2"></i>
                          Create Package
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-list me-2"></i>
                    All Packages ({packages.length})
                  </h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={fetchPackages}
                    disabled={loading}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Refresh
                  </Button>
                </Card.Header>
                <Card.Body className="p-0">
                  {packages.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-box text-muted" style={{ fontSize: '3rem' }}></i>
                      <p className="text-muted mt-3">No packages created yet</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table hover className="mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Package</th>
                            <th>Price</th>
                            <th>Dates</th>
                            <th>Status</th>
                            <th>Bookings</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packages.map((pkg) => (
                            <tr key={pkg._id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={pkg.image.url}
                                    alt={pkg.title}
                                    className="rounded me-3"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                  />
                                  <div>
                                    <h6 className="mb-1">{pkg.title}</h6>
                                    <small className="text-muted">{pkg.subtitle}</small>
                                  </div>
                                </div>
                              </td>
                              <td className="fw-semibold">{formatCurrency(pkg.price)}</td>
                              <td>
                                <small>
                                  {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
                                </small>
                              </td>
                              <td>
                                <Badge bg={pkg.isActive ? 'success' : 'secondary'}>
                                  {pkg.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </td>
                              <td>{pkg.bookingsCount || 0}</td>
                              <td>
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => handleDeletePackage(pkg._id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </Container>
    </div>
  );
};

export default TravelAdmin;
