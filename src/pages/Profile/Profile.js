import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    preferences: {
      interests: [],
      budgetRange: { min: '', max: '' },
      preferredDurations: [],
      locations: []
    }
  });
  const [bookings, setBookings] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
      fetchBookings();
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/users/me', {
        headers: { 'x-auth-token': token }
      });
      setProfileData(res.data);
      setSavedTrips(res.data.savedTrips || []);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/bookings', {
        headers: { 'x-auth-token': token }
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5001/api/users/me', {
        name: profileData.name,
        preferences: profileData.preferences
      }, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interests
      }
    }));
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Please login to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="mb-4">My Profile</h2>
          
          <Tabs defaultActiveKey="profile" className="mb-4">
            <Tab eventKey="profile" title="Profile Information">
              <Card>
                <Card.Body>
                  {message && (
                    <Alert variant={message.includes('Error') ? 'danger' : 'success'}>
                      {message}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleProfileUpdate}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={profileData.email}
                            disabled
                            placeholder="Email address"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            value={profileData.phone}
                            disabled
                            placeholder="Phone number"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="mt-4 mb-3">Travel Preferences</h5>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Interests (comma-separated)</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.preferences?.interests?.join(', ') || ''}
                        onChange={handleInterestsChange}
                        placeholder="e.g., Adventure, Beaches, Culture, Wildlife"
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Budget Range (Min)</Form.Label>
                          <Form.Control
                            type="number"
                            name="preferences.budgetRange.min"
                            value={profileData.preferences?.budgetRange?.min || ''}
                            onChange={handleChange}
                            placeholder="Minimum budget"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Budget Range (Max)</Form.Label>
                          <Form.Control
                            type="number"
                            name="preferences.budgetRange.max"
                            value={profileData.preferences?.budgetRange?.max || ''}
                            onChange={handleChange}
                            placeholder="Maximum budget"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="bookings" title="Booking History">
              <Card>
                <Card.Body>
                  <h5>My Bookings</h5>
                  {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                  ) : (
                    <div>
                      {bookings.map(booking => (
                        <Card key={booking._id} className="mb-3">
                          <Card.Body>
                            <Row>
                              <Col md={8}>
                                <h6>{booking.type.charAt(0).toUpperCase() + booking.type.slice(1)} Booking</h6>
                                {booking.package && <p><strong>Package:</strong> {booking.package.title}</p>}
                                <p><strong>Status:</strong> <span className={`badge bg-${booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'danger'}`}>{booking.status}</span></p>
                                <p><strong>Payment:</strong> <span className={`badge bg-${booking.paymentStatus === 'paid' ? 'success' : 'warning'}`}>{booking.paymentStatus}</span></p>
                              </Col>
                              <Col md={4} className="text-end">
                                <h6>₹{booking.price}</h6>
                                <small className="text-muted">
                                  {new Date(booking.createdAt).toLocaleDateString()}
                                </small>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="saved" title="Saved Trips">
              <Card>
                <Card.Body>
                  <h5>Saved Trips</h5>
                  {savedTrips.length === 0 ? (
                    <p>No saved trips found.</p>
                  ) : (
                    <div>
                      {savedTrips.map(trip => (
                        <Card key={trip._id} className="mb-3">
                          <Card.Body>
                            <h6>{trip.title}</h6>
                            <p>{trip.description}</p>
                            <p><strong>Price:</strong> ₹{trip.basePrice}</p>
                            <p><strong>Duration:</strong> {trip.durationDays} days</p>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
