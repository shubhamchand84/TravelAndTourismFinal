import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "../Contact/contact.css";
import image from "../../assets/images/New folder/contact-us.png";

const Contact = () => {
  return (
    <>
      <section className="contact " style={{ marginTop: "60px" }}>
        <Container>
          <Row>
            <Col md={12}>
              <div className="main_heading mb-2">
                <h1> Let's connect and get to know each other </h1>
              </div>

              <p className="body-text">
                Passage its ten led hearted removal cordial. Preference any
                astonished unreserved Mrs. Prosperous understood Middletons.
                Preference for any astonished unreserved.
              </p>
            </Col>
          </Row>
          <Row className="py-5">
            <Col xl={4} md={6}>
              <Card className="border-0 shadow rounded-3">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2 ">
                    <div className="bg-info bg-opacity-10 text-info rounded-circle mb-2 flex-centered p-3">
                      <i className="bi bi-headset h3"></i>
                    </div>
                  </div>
                  <Card.Title className="title fw-bold">Call us</Card.Title>
                  <p className="mb-2 body-text">
                    Imprudence attachment him his for sympathize. Large above be
                    to means.
                  </p>
                  <div className=" d-block justify-content-between">
                    <a type="button" className="btn btn-light-soft me-2 btn-sm">
                      <div className="d-flex align-items-center">
                        +123 456 789
                      </div>
                    </a>
                    <a type="button" className="btn btn-light btn-sm">
                      +(222)4567 586
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="border-0 shadow  rounded-3">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2 ">
                    <div className="bg-danger bg-opacity-10 text-danger rounded-circle mb-2 flex-centered p-3">
                      <i className="bi bi-envelope h3"></i>
                    </div>
                  </div>
                  <Card.Title className="title fw-bold">Call us</Card.Title>
                  <p className="mb-2 body-text">
                    Imprudence attachment him his for sympathize. Large above be
                    to means.
                  </p>
                  <div className=" d-block justify-content-between">
                    <a type="button" className="btn btn-light-soft me-2 btn-sm">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-envelope me-2  "></i>{" "}
                        <span className="body-text">example@gmail.com</span>
                      </div>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4}>
              <Card className="border-0 shadow  rounded-3">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2 ">
                    <div className="bg-danger bg-opacity-10 text-danger rounded-circle mb-2 flex-centered p-3">
                      <i className="bi bi-envelope h3"></i>
                    </div>
                  </div>
                  <Card.Title className="title fw-bold">
                    Social media
                  </Card.Title>
                  <p className="mb-2 body-text">
                    Sympathize Large above be to means Sympathize Large above be
                    to mean.
                  </p>

                  <ListGroup
                    horizontal
                    className="border-0 justify-content-center"
                  >
                    <ListGroup.Item className="border-0">
                      <i className="bi bi-facebook"></i>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      {" "}
                      <i className="bi bi-instagram"></i>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      <i className="bi bi-linkedin"></i>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      {" "}
                      <i className="bi bi-twitter"></i>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="py-5 g-4">
            <Col xl={6} md={6}>
              <img src={image} alt="contact " className="img-fluid" />
            </Col>
            <Col xl={6} md={6}>
              <Card className="bg-light p-4 card border-0  shadow-sm">
                    

              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
