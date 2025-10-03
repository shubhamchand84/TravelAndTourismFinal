import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl } from '../../config/api';
import './LatestPackages.css';

const LatestPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load packages from API (production) with fallback to localStorage (demo mode)
    const loadPackages = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API first
        try {
          const response = await axios.get(createApiUrl('/travel-packages'), {
            params: { limit: 6, sortBy: 'createdAt', sortOrder: 'desc' }
          });
          
          if (response.data.success && response.data.data.packages.length > 0) {
            setPackages(response.data.data.packages);
            return;
          }
        } catch (apiError) {
          console.log('API fetch failed, trying localStorage fallback:', apiError.message);
        }
        
        // Fallback to localStorage for demo mode
        const savedPackages = localStorage.getItem('demoPackages');
        if (savedPackages) {
          const parsedPackages = JSON.parse(savedPackages);
          // Sort by creation date (newest first)
          const sortedPackages = parsedPackages.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPackages(sortedPackages);
        }
      } catch (error) {
        console.error('Error loading packages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();

    // Listen for storage changes (when packages are added/updated in admin)
    const handleStorageChange = (e) => {
      if (e.key === 'demoPackages') {
        loadPackages();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from the same window
    const handlePackageUpdate = () => {
      loadPackages();
    };
    
    window.addEventListener('packagesUpdated', handlePackageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('packagesUpdated', handlePackageUpdate);
    };
  }, []);

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

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading latest packages...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="latest-packages-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="hero-title">Latest Travel Packages</h1>
              <p className="hero-subtitle">
                Discover our newest and most exciting travel destinations. 
                Book your dream vacation today!
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="packages-section py-5">
        <Container>
          {packages.length === 0 ? (
            <Row className="justify-content-center">
              <Col lg={6} className="text-center">
                <div className="empty-state">
                  <div className="empty-icon">📦</div>
                  <h3>No Packages Available</h3>
                  <p className="text-muted">
                    No travel packages have been created yet. 
                    Check back soon for exciting new destinations!
                  </p>
                  <Link to="/admin-demo" className="btn btn-primary">
                    Add First Package
                  </Link>
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <Row className="mb-4">
                <Col>
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="section-title">
                      Featured Packages ({packages.length})
                    </h2>
                    <Link to="/admin-demo" className="btn btn-outline-primary">
                      Manage Packages
                    </Link>
                  </div>
                </Col>
              </Row>

              <Row>
                {packages.map((pkg, index) => {
                  // Handle both API format and localStorage format
                  const packageId = pkg._id || pkg.id;
                  const imageUrl = pkg.image?.url || pkg.imagePreview;
                  const packagePrice = pkg.price;
                  
                  return (
                  <Col lg={4} md={6} key={packageId} className="mb-4">
                    <Card className="package-card h-100">
                      {/* Package Image */}
                      <div className="package-image-container">
                        {imageUrl ? (
                          <Card.Img
                            variant="top"
                            src={imageUrl}
                            alt={pkg.title}
                            className="package-image"
                          />
                        ) : (
                          <div className="placeholder-image">
                            <i className="bi bi-image"></i>
                            <span>No Image</span>
                          </div>
                        )}
                        
                        {/* Price Badge */}
                        <div className="price-badge">
                          <span className="price-amount">₹{packagePrice}</span>
                        </div>

                        {/* New Badge for recently added packages */}
                        {index < 3 && (
                          <Badge bg="success" className="new-badge">
                            New
                          </Badge>
                        )}
                      </div>

                      <Card.Body className="d-flex flex-column">
                        {/* Package Title & Subtitle */}
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
                          <i className="bi bi-calendar-event me-2"></i>
                          <span className="date-text">
                            {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
                          </span>
                          <Badge bg="light" text="dark" className="ms-2">
                            {calculateDuration(pkg.startDate, pkg.endDate)} days
                          </Badge>
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
                                bg="outline-primary" 
                                className="tag-badge me-1 mb-1"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {pkg.tags.length > 3 && (
                              <Badge bg="light" text="dark" className="me-1 mb-1">
                                +{pkg.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}

                      </Card.Body>
                    </Card>
                  </Col>
                  );
                })}
              </Row>

              {/* Call to Action */}
              <Row className="mt-5">
                <Col className="text-center">
                  <div className="cta-section">
                    <h3>Ready for Your Next Adventure?</h3>
                    <p className="text-muted mb-4">
                      Browse our complete collection of travel packages or contact us for custom trips.
                    </p>
                    <div className="cta-buttons">
                      <Link to="/packages" className="btn btn-primary me-3">
                        View All Packages
                      </Link>
                      <Link to="/contact" className="btn btn-outline-primary">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </div>
  );
};

export default LatestPackages;
