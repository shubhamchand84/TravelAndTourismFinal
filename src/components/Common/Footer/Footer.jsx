import React, { useState, useEffect } from "react";
import "../Footer/footer.css";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <>
      <footer className="pt-5">
        <Container>
          <Row>
            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
              <h4 className="mt-lg-0 mt-sm-3">Company</h4>
              <ListGroup variant="flush">
                <ListGroup.Item as="div">
                  <NavLink to="/about">About Us</NavLink>
                </ListGroup.Item>
                <ListGroup.Item as="div">
                  <NavLink to="/news">News</NavLink>
                </ListGroup.Item>
                <ListGroup.Item as="div">
                  <NavLink to="/faq">FAQ</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
              <h4 className="mt-lg-0 mt-sm-3">Explore</h4>
              <ListGroup variant="flush">
                <ListGroup.Item as="div">
                  <NavLink to="/faq">FAQ</NavLink>
                </ListGroup.Item>
                <ListGroup.Item as="div">
                  <NavLink to="/tour-listings">Tour Listings</NavLink>
                </ListGroup.Item>
                <ListGroup.Item as="div">
                  <NavLink to="/destination">Destination</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
              <h4 className="mt-lg-0 mt-sm-3">Quick Link</h4>
              <ListGroup variant="flush">
                <ListGroup.Item as="div">
                  <NavLink to="/">Home</NavLink>
                </ListGroup.Item>
                <ListGroup.Item as="div">
                  <NavLink to="/about">About Us</NavLink>
                </ListGroup.Item>
                <ListGroup.Item as="div">
                  <NavLink to="/contact">Contact Us</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md="3" sm="12" className="location mt-3 mt-md-0">
              <h4 className="mt-lg-0 mt-sm-3">Contact Info</h4>

              <div className="d-flex align-items-center">
                <p className="pb-2">Dehradun, Uttarakhand, India</p>
              </div>

              <div className="d-flex align-items-top my-2">
                <i className="bi bi-envelope me-3"></i>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:shubhamchandofficial@gmail.com"
                  className="d-block"
                >
                  shubhamchandofficial@gmail.com
                </a>
              </div>

              <div className="d-flex align-items-top">
                <i className="bi bi-telephone me-3"></i>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="tel:+918630129605"
                  className="d-block"
                >
                  (+91) 8630129605
                </a>
              </div>
            </Col>
          </Row>

          <Row className="py-2 bdr mt-3">
            <Col className="col copyright">
              <p className="text-light">© 2024. Shubham Chand. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>

      <div id="back-top" onClick={scrollTop} className={visible ? "active" : ""}>
        <i className="bi bi-arrow-up"></i>
      </div>
    </>
  );
};

export default Footer;
