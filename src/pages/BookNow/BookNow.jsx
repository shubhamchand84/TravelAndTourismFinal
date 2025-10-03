import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import './BookNow.css';
import backgroundImage from "../../assets/images/contact/background.jpeg";

const BookNow = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    dates: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_r8c1oeq",         // Your EmailJS service ID
        "template_768qdlt",        // Your EmailJS template ID
        form,
        "w7gqE0xZzu32Rgu-f"        // Your EmailJS public key
      )
      .then(
        () => setSubmitted(true),
        (error) => alert("Failed to send: " + error.text)
      );

    setForm({
      name: "",
      email: "",
      phone: "",
      destination: "",
      dates: "",
      message: "",
    });
  };

  return (
    <div 
      className="book-now-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="book-now-overlay">
        <div className="booking-form-card">
          <h2>Book Now</h2>
          {submitted ? (
            <div className="success-message">
              <i className="bi bi-check-circle me-2"></i>
              Thank you! Your booking request has been sent. We will contact you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number *</label>
                <input
                  className="form-control"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Destination Interested In *</label>
                <input
                  className="form-control"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Enter your preferred destination"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dates of Travel *</label>
                <input
                  className="form-control"
                  name="dates"
                  type="text"
                  value={form.dates}
                  onChange={handleChange}
                  placeholder="Enter your preferred travel dates"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-control"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel requirements..."
                  rows={4}
                  required
                />
              </div>
              <button className="submit-btn" type="submit">
                <i className="bi bi-send me-2"></i>
                Send Booking Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookNow;
