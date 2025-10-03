import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Pagination, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl } from '../../config/api';
import './TravelPackages.css';

const TravelPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    tags: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 9
  });

  useEffect(() => {
    fetchPackages();
  }, [filters, pagination.currentPage]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      params.append('page', pagination.currentPage);
      params.append('limit', pagination.itemsPerPage);

      const response = await axios.get(createApiUrl(`/travel-packages?${params}`));
      
      if (response.data.success) {
        setPackages(response.data.data.packages);
        setPagination(prev => ({
          ...prev,
          ...response.data.data.pagination
        }));
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to load travel packages. Please try again later.');
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
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      tags: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading && packages.length === 0) {
    return (
      <div className="travel-packages-page">
        <Container className="py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading amazing travel packages...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="travel-packages-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="hero-title">Latest Travel Packages</h1>
              <p className="hero-subtitle">
                Discover breathtaking destinations and create unforgettable memories with our carefully curated travel experiences.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="filters-section py-4 bg-light">
        <Container>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Row className="align-items-end">
                <Col md={3} className="mb-3">
                  <Form.Label className="fw-semibold">Search Packages</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Search destinations..."
                    />
                  </InputGroup>
                </Col>
                
                <Col md={2} className="mb-3">
                  <Form.Label className="fw-semibold">Tags</Form.Label>
                  <Form.Control
                    type="text"
                    name="tags"
                    value={filters.tags}
                    onChange={handleFilterChange}
                    placeholder="adventure, beach..."
                  />
                </Col>
                
                <Col md={2} className="mb-3">
                  <Form.Label className="fw-semibold">Min Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="$0"
                    min="0"
                  />
                </Col>
                
                <Col md={2} className="mb-3">
                  <Form.Label className="fw-semibold">Max Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="$10000"
                    min="0"
                  />
                </Col>
                
                <Col md={2} className="mb-3">
                  <Form.Label className="fw-semibold">Sort By</Form.Label>
                  <Form.Select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                  >
                    <option value="createdAt">Newest First</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="title">Name A-Z</option>
                  </Form.Select>
                </Col>
                
                <Col md={1} className="mb-3">
                  <Button 
                    variant="outline-secondary" 
                    onClick={clearFilters}
                    className="w-100"
                    title="Clear Filters"
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="packages-section py-5">
        <Container>
          {error && (
            <Row className="mb-4">
              <Col>
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              </Col>
            </Row>
          )}

          {/* Results Header */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="section-title mb-0">
                  {pagination.totalItems > 0 ? (
                    <>
                      {pagination.totalItems} Package{pagination.totalItems !== 1 ? 's' : ''} Found
                    </>
                  ) : (
                    'No Packages Found'
                  )}
                </h2>
                {loading && (
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {/* Packages Grid */}
          {packages.length === 0 && !loading ? (
            <Row className="justify-content-center">
              <Col lg={6} className="text-center">
                <div className="empty-state py-5">
                  <div className="empty-icon mb-4">
                    <i className="bi bi-compass" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                  </div>
                  <h3 className="text-muted">No Travel Packages Available</h3>
                  <p className="text-muted">
                    We're working on adding amazing travel experiences. Check back soon!
                  </p>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              {packages.map((pkg, index) => (
                <Col lg={4} md={6} key={pkg._id} className="mb-4">
                  <Card className="package-card h-100 border-0 shadow-sm">
                    {/* Package Image */}
                    <div className="package-image-container">
                      <Card.Img
                        variant="top"
                        src={pkg.image.url}
                        alt={pkg.title}
                        className="package-image"
                      />
                      
                      {/* Price Badge */}
                      <div className="price-badge">
                        <span className="price-amount">{formatCurrency(pkg.price)}</span>
                      </div>

                      {/* New Badge for recently added packages */}
                      {index < 3 && (
                        <Badge bg="success" className="new-badge">
                          New
                        </Badge>
                      )}

                      {/* Duration Badge */}
                      <Badge bg="dark" className="duration-badge">
                        {calculateDuration(pkg.startDate, pkg.endDate)} days
                      </Badge>
                    </div>

                    <Card.Body className="d-flex flex-column">
                      {/* Package Header */}
                      <div className="package-header mb-3">
                        <Card.Title className="package-title">
                          {pkg.title}
                        </Card.Title>
                        {pkg.subtitle && (
                          <Card.Subtitle className="package-subtitle text-muted">
                            {pkg.subtitle}
                          </Card.Subtitle>
                        )}
                      </div>

                      {/* Date Range */}
                      <div className="date-range mb-3">
                        <i className="bi bi-calendar-event me-2 text-primary"></i>
                        <span className="date-text">
                          {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
                        </span>
                      </div>

                      {/* Description */}
                      <Card.Text className="package-description flex-grow-1">
                        {truncateText(pkg.shortDescription)}
                      </Card.Text>

                      {/* Tags */}
                      {pkg.tags && pkg.tags.length > 0 && (
                        <div className="package-tags mb-3">
                          {pkg.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              bg="light" 
                              text="dark"
                              className="tag-badge me-1 mb-1"
                            >
                              #{tag}
                            </Badge>
                          ))}
                          {pkg.tags.length > 3 && (
                            <Badge bg="secondary" className="me-1 mb-1">
                              +{pkg.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="package-actions mt-auto">
                        <Link 
                          to="/book-now"
                          className="btn btn-primary btn-book-now w-100"
                        >
                          <i className="bi bi-airplane me-2"></i>
                          Book Now
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Row className="mt-5">
              <Col>
                <nav aria-label="Package pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${!pagination.hasPrevPage ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                      >
                        <i className="bi bi-chevron-left"></i>
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(pagination.totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      const isCurrentPage = pageNum === pagination.currentPage;
                      const showPage = 
                        pageNum === 1 || 
                        pageNum === pagination.totalPages || 
                        Math.abs(pageNum - pagination.currentPage) <= 2;
                      
                      if (!showPage) {
                        if (pageNum === pagination.currentPage - 3 || pageNum === pagination.currentPage + 3) {
                          return (
                            <li key={pageNum} className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>
                          );
                        }
                        return null;
                      }
                      
                      return (
                        <li key={pageNum} className={`page-item ${isCurrentPage ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        </li>
                      );
                    })}
                    
                    <li className={`page-item ${!pagination.hasNextPage ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                      >
                        Next
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default TravelPackages;
