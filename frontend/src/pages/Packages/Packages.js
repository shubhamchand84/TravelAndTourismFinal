import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl } from '../../config/api';
import './Packages.css';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    duration: '',
    sort: 'createdAt'
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  const categories = ['Adventure', 'Beaches', 'Hills', 'Historical', 'Wildlife', 'City', 'Culture', 'Relaxation'];

  useEffect(() => {
    fetchPackages();
  }, [filters, pagination.page]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.append('page', pagination.page);
      params.append('limit', 9);

      const res = await axios.get(createApiUrl(`/packages?${params}`));
      setPackages(res.data.packages);
      setPagination({
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total
      });
    } catch (err) {
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      duration: '',
      sort: 'createdAt'
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="mb-4">Travel Packages</h2>
          
          {/* Filters */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Filter & Search</h5>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      placeholder="Search by city"
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      placeholder="₹0"
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      placeholder="₹100000"
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sort By</Form.Label>
                    <Form.Select
                      name="sort"
                      value={filters.sort}
                      onChange={handleFilterChange}
                    >
                      <option value="createdAt">Newest</option>
                      <option value="basePrice">Price: Low to High</option>
                      <option value="-basePrice">Price: High to Low</option>
                      <option value="rating">Rating</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="outline-secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Card.Body>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="text-center py-5">
              <p>Loading packages...</p>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">{pagination.total} packages found</p>
              </div>

              <Row>
                {packages.map(pkg => (
                  <Col md={4} key={pkg._id} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      {pkg.images && pkg.images[0] && (
                        <Card.Img 
                          variant="top" 
                          src={pkg.images[0]} 
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      )}
                      <Card.Body className="d-flex flex-column">
                        <div className="mb-2">
                          <Badge bg="primary" className="me-2">{pkg.category}</Badge>
                          {pkg.rating > 0 && (
                            <Badge bg="warning" text="dark">
                              ⭐ {pkg.rating.toFixed(1)} ({pkg.ratingCount})
                            </Badge>
                          )}
                        </div>
                        <Card.Title>{pkg.title}</Card.Title>
                        <Card.Text className="flex-grow-1">
                          {pkg.description?.substring(0, 100)}...
                        </Card.Text>
                        <div className="mb-2">
                          <small className="text-muted">
                            📍 {pkg.location?.city}, {pkg.location?.country}
                          </small>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">
                            🗓️ {pkg.durationDays} days
                          </small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <h5 className="mb-0 text-primary">₹{pkg.basePrice?.toLocaleString()}</h5>
                          <Link 
                            to={`/packages/${pkg._id}`} 
                            className="btn btn-primary btn-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {packages.length === 0 && (
                <div className="text-center py-5">
                  <p>No packages found matching your criteria.</p>
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="outline-primary"
                    disabled={pagination.page === 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    className="me-2"
                  >
                    Previous
                  </Button>
                  <span className="align-self-center mx-3">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline-primary"
                    disabled={pagination.page === pagination.pages}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Packages;
