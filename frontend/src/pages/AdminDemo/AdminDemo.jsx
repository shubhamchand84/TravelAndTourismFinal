import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import './AdminDemo.css';

const AdminDemo = () => {
  const [packages, setPackages] = useState([]);
  const [currentPackage, setCurrentPackage] = useState({
    title: '',
    subtitle: '',
    price: '',
    startDate: '',
    endDate: '',
    shortDescription: '',
    tags: '',
    image: null,
    imagePreview: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Load packages from localStorage on component mount
  useEffect(() => {
    const savedPackages = localStorage.getItem('demoPackages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    }
  }, []);

  // Save packages to localStorage whenever packages change
  useEffect(() => {
    localStorage.setItem('demoPackages', JSON.stringify(packages));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('packagesUpdated'));
  }, [packages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentPackage(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validation
    if (!currentPackage.title || !currentPackage.price || !currentPackage.startDate || !currentPackage.endDate) {
      setError('Please fill in all required fields');
      return;
    }

    const packageData = {
      id: isEditing ? editingId : Date.now().toString(),
      title: currentPackage.title,
      subtitle: currentPackage.subtitle,
      price: parseFloat(currentPackage.price),
      startDate: currentPackage.startDate,
      endDate: currentPackage.endDate,
      shortDescription: currentPackage.shortDescription,
      tags: currentPackage.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imagePreview: currentPackage.imagePreview,
      createdAt: isEditing ? packages.find(p => p.id === editingId)?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isEditing) {
      setPackages(prev => prev.map(pkg => 
        pkg.id === editingId ? packageData : pkg
      ));
      setSuccessMessage('Package updated successfully!');
    } else {
      setPackages(prev => [packageData, ...prev]);
      setSuccessMessage('Package created successfully!');
    }

    // Reset form
    resetForm();
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const resetForm = () => {
    setCurrentPackage({
      title: '',
      subtitle: '',
      price: '',
      startDate: '',
      endDate: '',
      shortDescription: '',
      tags: '',
      image: null,
      imagePreview: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const editPackage = (pkg) => {
    setCurrentPackage({
      title: pkg.title,
      subtitle: pkg.subtitle,
      price: pkg.price.toString(),
      startDate: pkg.startDate,
      endDate: pkg.endDate,
      shortDescription: pkg.shortDescription,
      tags: pkg.tags.join(', '),
      image: null,
      imagePreview: pkg.imagePreview
    });
    setIsEditing(true);
    setEditingId(pkg.id);
  };

  const deletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(prev => prev.filter(pkg => pkg.id !== id));
      setSuccessMessage('Package deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="admin-demo-header mb-4">
            <h1 className="display-4 text-center mb-2">Travel Package Admin</h1>
            <p className="text-center text-muted">Demo Mode - Data stored in localStorage</p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <Alert variant="success" className="mb-4">
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Package Form */}
          <Card className="mb-5 shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">
                {isEditing ? 'Edit Package' : 'Add New Travel Package'}
              </h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title *</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={currentPackage.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Amazing Himalayan Adventure"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Subtitle</Form.Label>
                      <Form.Control
                        type="text"
                        name="subtitle"
                        value={currentPackage.subtitle}
                        onChange={handleInputChange}
                        placeholder="e.g., 7 Days of Mountain Bliss"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price ($) *</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={currentPackage.price}
                        onChange={handleInputChange}
                        placeholder="999"
                        min="0"
                        step="0.01"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={currentPackage.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={currentPackage.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="shortDescription"
                    value={currentPackage.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Brief description of the travel package..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    name="tags"
                    value={currentPackage.tags}
                    onChange={handleInputChange}
                    placeholder="adventure, mountains, hiking, nature (comma-separated)"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Package Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {currentPackage.imagePreview && (
                    <div className="mt-3">
                      <img
                        src={currentPackage.imagePreview}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxWidth: '200px', maxHeight: '150px' }}
                      />
                    </div>
                  )}
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary">
                    {isEditing ? 'Update Package' : 'Create Package'}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="secondary" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Packages List */}
          <Card className="shadow">
            <Card.Header className="bg-secondary text-white">
              <h3 className="mb-0">Existing Packages ({packages.length})</h3>
            </Card.Header>
            <Card.Body>
              {packages.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No packages created yet. Add your first package above!</p>
                </div>
              ) : (
                <Row>
                  {packages.map((pkg) => (
                    <Col md={6} lg={4} key={pkg.id} className="mb-4">
                      <Card className="h-100 package-card">
                        {pkg.imagePreview && (
                          <Card.Img
                            variant="top"
                            src={pkg.imagePreview}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        )}
                        <Card.Body className="d-flex flex-column">
                          <div className="mb-2">
                            <Badge bg="primary" className="price-badge">
                              ${pkg.price}
                            </Badge>
                          </div>
                          <Card.Title className="h5">{pkg.title}</Card.Title>
                          {pkg.subtitle && (
                            <Card.Subtitle className="mb-2 text-muted">
                              {pkg.subtitle}
                            </Card.Subtitle>
                          )}
                          <Card.Text className="flex-grow-1">
                            {pkg.shortDescription && pkg.shortDescription.length > 100
                              ? `${pkg.shortDescription.substring(0, 100)}...`
                              : pkg.shortDescription}
                          </Card.Text>
                          <div className="mb-2">
                            <small className="text-muted">
                              📅 {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
                            </small>
                          </div>
                          {pkg.tags.length > 0 && (
                            <div className="mb-3">
                              {pkg.tags.map((tag, index) => (
                                <Badge key={index} bg="outline-secondary" className="me-1 mb-1">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="mt-auto d-flex gap-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => editPackage(pkg)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => deletePackage(pkg.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDemo;
