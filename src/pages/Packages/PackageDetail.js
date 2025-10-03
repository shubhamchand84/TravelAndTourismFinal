import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { createApiUrl } from '../../config/api';
import './PackageDetail.css';

const PackageDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [packageData, setPackageData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    travelers: [{ name: '', email: '', phone: '' }],
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchPackageDetails();
    fetchReviews();
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const res = await axios.get(createApiUrl(`/packages/${id}`));
      setPackageData(res.data);
    } catch (err) {
      setError('Package not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(createApiUrl(`/reviews/package/${id}`));
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const bookingPayload = {
        type: 'package',
        package: id,
        travelers: bookingData.travelers,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        price: packageData.basePrice
      };

      const res = await axios.post(createApiUrl('/bookings'), bookingPayload, {
        headers: { 'x-auth-token': token }
      });

      alert('Booking created successfully! Please proceed to payment.');
      navigate('/profile');
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    }
  };

  const addTraveler = () => {
    setBookingData(prev => ({
      ...prev,
      travelers: [...prev.travelers, { name: '', email: '', phone: '' }]
    }));
  };

  const removeTraveler = (index) => {
    setBookingData(prev => ({
      ...prev,
      travelers: prev.travelers.filter((_, i) => i !== index)
    }));
  };

  const updateTraveler = (index, field, value) => {
    setBookingData(prev => ({
      ...prev,
      travelers: prev.travelers.map((traveler, i) => 
        i === index ? { ...traveler, [field]: value } : traveler
      )
    }));
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading package details...</p>
      </Container>
    );
  }

  if (error || !packageData) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Package not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          {/* Package Images */}
          {packageData.images && packageData.images.length > 0 && (
            <Card className="mb-4">
              <Card.Img 
                variant="top" 
                src={packageData.images[0]} 
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Card>
          )}

          {/* Package Info */}
          <Card className="mb-4">
            <Card.Body>
              <div className="mb-3">
                <Badge bg="primary" className="me-2">{packageData.category}</Badge>
                {packageData.rating > 0 && (
                  <Badge bg="warning" text="dark">
                    ⭐ {packageData.rating.toFixed(1)} ({packageData.ratingCount} reviews)
                  </Badge>
                )}
              </div>
              
              <Card.Title as="h1">{packageData.title}</Card.Title>
              <Card.Text>{packageData.description}</Card.Text>
              
              <Row className="mb-3">
                <Col md={6}>
                  <h5>Location</h5>
                  <p>📍 {packageData.location?.city}, {packageData.location?.country}</p>
                </Col>
                <Col md={6}>
                  <h5>Duration</h5>
                  <p>🗓️ {packageData.durationDays} days</p>
                </Col>
              </Row>

              <h5>Inclusions</h5>
              <ul>
                {packageData.inclusions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h5>Exclusions</h5>
              <ul>
                {packageData.exclusions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          {/* Reviews */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Customer Reviews</h5>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map(review => (
                  <Card key={review._id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{review.user?.name || 'Anonymous'}</h6>
                          <div className="mb-2">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </div>
                        </div>
                        <small className="text-muted">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="mb-0">{review.comment}</p>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Booking Card */}
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h4 className="mb-3">Book This Package</h4>
              
              <div className="mb-3">
                <h3 className="text-primary mb-0">₹{packageData.basePrice?.toLocaleString()}</h3>
                <small className="text-muted">per person</small>
              </div>

              {isAuthenticated ? (
                <Form onSubmit={handleBookingSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, endDate: e.target.value }))}
                      required
                    />
                  </Form.Group>

                  <h6 className="mb-3">Traveler Details</h6>
                  {bookingData.travelers.map((traveler, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0">Traveler {index + 1}</h6>
                          {bookingData.travelers.length > 1 && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeTraveler(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        
                        <Form.Group className="mb-2">
                          <Form.Control
                            placeholder="Full Name"
                            value={traveler.name}
                            onChange={(e) => updateTraveler(index, 'name', e.target.value)}
                            required
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-2">
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={traveler.email}
                            onChange={(e) => updateTraveler(index, 'email', e.target.value)}
                            required
                          />
                        </Form.Group>
                        
                        <Form.Group>
                          <Form.Control
                            type="tel"
                            placeholder="Phone"
                            value={traveler.phone}
                            onChange={(e) => updateTraveler(index, 'phone', e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  ))}

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={addTraveler}
                    className="mb-3"
                  >
                    + Add Traveler
                  </Button>

                  {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                  >
                    Book Now
                  </Button>
                </Form>
              ) : (
                <div className="text-center">
                  <p>Please login to book this package.</p>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/login')}
                    className="w-100"
                  >
                    Login to Book
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PackageDetail;
