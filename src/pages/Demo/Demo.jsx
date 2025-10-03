import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Demo.css';

const Demo = () => {
  return (
    <div className="demo-page">
      {/* Hero Section */}
      <section className="demo-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="demo-title">Travel & Tourism Website Demo</h1>
              <p className="demo-subtitle">
                Complete frontend-only prototype with localStorage and production-ready REST API specification
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center mb-5">Features Implemented</h2>
            </Col>
          </Row>

          <Row>
            {/* Admin Section */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon admin-icon">
                    <i className="bi bi-gear-fill"></i>
                  </div>
                  <Card.Title>Admin Section</Card.Title>
                  <Card.Text>
                    Secure admin interface for managing travel packages with all required fields:
                    title, subtitle, price, dates, description, tags, and image upload.
                  </Card.Text>
                  <ul className="feature-list text-start">
                    <li>✅ Complete CRUD operations</li>
                    <li>✅ Image upload with FileReader</li>
                    <li>✅ Form validation</li>
                    <li>✅ Real-time preview</li>
                  </ul>
                  <Link to="/admin-demo" className="btn btn-primary">
                    Try Admin Demo
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Public Site */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon public-icon">
                    <i className="bi bi-globe"></i>
                  </div>
                  <Card.Title>Public Site</Card.Title>
                  <Card.Text>
                    Responsive public interface with modern navigation and package display.
                  </Card.Text>
                  <ul className="feature-list text-start">
                    <li>✅ Responsive navbar</li>
                    <li>✅ Mobile hamburger menu</li>
                    <li>✅ Latest packages display</li>
                    <li>✅ Card hover effects</li>
                    <li>✅ Newest-first sorting</li>
                  </ul>
                  <Link to="/latest-packages" className="btn btn-success">
                    View Latest Packages
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Technical Features */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon tech-icon">
                    <i className="bi bi-code-slash"></i>
                  </div>
                  <Card.Title>Technical Implementation</Card.Title>
                  <Card.Text>
                    Modern, accessible, and production-ready implementation.
                  </Card.Text>
                  <ul className="feature-list text-start">
                    <li>✅ localStorage demo mode</li>
                    <li>✅ REST API specification</li>
                    <li>✅ Semantic HTML</li>
                    <li>✅ Mobile-first CSS</li>
                    <li>✅ Accessibility features</li>
                  </ul>
                  <Button variant="info" disabled>
                    View Documentation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Demo Instructions */}
      <section className="instructions-section py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center mb-4">How to Use the Demo</h2>
            </Col>
          </Row>

          <Row>
            <Col lg={6} className="mb-4">
              <Card className="instruction-card">
                <Card.Header className="bg-primary text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-1-circle me-2"></i>
                    Admin Demo
                  </h4>
                </Card.Header>
                <Card.Body>
                  <ol>
                    <li>Click "Try Admin Demo" above</li>
                    <li>Fill in the package form with sample data</li>
                    <li>Upload an image (optional)</li>
                    <li>Click "Create Package"</li>
                    <li>See the package appear immediately</li>
                    <li>Try editing or deleting packages</li>
                  </ol>
                  <div className="alert alert-info mt-3">
                    <strong>Note:</strong> All data is stored in localStorage and will persist until you clear browser data.
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} className="mb-4">
              <Card className="instruction-card">
                <Card.Header className="bg-success text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-2-circle me-2"></i>
                    Public Site
                  </h4>
                </Card.Header>
                <Card.Body>
                  <ol>
                    <li>Create some packages in the admin first</li>
                    <li>Navigate to "Latest Packages"</li>
                    <li>See packages displayed as responsive cards</li>
                    <li>Try resizing the browser window</li>
                    <li>Test the mobile hamburger menu</li>
                    <li>Hover over cards to see effects</li>
                  </ol>
                  <div className="alert alert-success mt-3">
                    <strong>Tip:</strong> Packages appear newest-first automatically!
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Navigation Links */}
      <section className="navigation-section py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <h3 className="mb-4">Quick Navigation</h3>
              <div className="nav-buttons">
                <Link to="/" className="btn btn-outline-primary me-3 mb-2">
                  <i className="bi bi-house me-2"></i>
                  Home
                </Link>
                <Link to="/about" className="btn btn-outline-primary me-3 mb-2">
                  <i className="bi bi-info-circle me-2"></i>
                  About
                </Link>
                <Link to="/latest-packages" className="btn btn-outline-primary me-3 mb-2">
                  <i className="bi bi-box-seam me-2"></i>
                  Latest Packages
                </Link>
                <Link to="/contact" className="btn btn-outline-primary me-3 mb-2">
                  <i className="bi bi-envelope me-2"></i>
                  Contact
                </Link>
                <Link to="/admin-demo" className="btn btn-outline-danger mb-2">
                  <i className="bi bi-gear me-2"></i>
                  Admin Demo
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Technical Details */}
      <section className="tech-details py-5 bg-dark text-white">
        <Container>
          <Row>
            <Col>
              <h3 className="text-center mb-4">Technical Specifications</h3>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h5>Frontend Demo Features:</h5>
              <ul>
                <li>React 18 with functional components</li>
                <li>React Bootstrap for responsive UI</li>
                <li>localStorage for data persistence</li>
                <li>FileReader API for image uploads</li>
                <li>Custom CSS with hover effects</li>
                <li>Mobile-first responsive design</li>
                <li>Semantic HTML for accessibility</li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Production API Ready:</h5>
              <ul>
                <li>Complete REST API specification</li>
                <li>JWT authentication support</li>
                <li>Image upload endpoints</li>
                <li>Pagination and filtering</li>
                <li>Error handling standards</li>
                <li>Rate limiting guidelines</li>
                <li>TypeScript interfaces</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Demo;
