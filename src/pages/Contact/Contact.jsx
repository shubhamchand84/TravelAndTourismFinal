import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import "../../styles/PageLayout.css";
import backgroundImage from "../../assets/images/contact/background.jpeg";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    dates: "",
    message: "",
    inquiryType: "general", // general, booking, custom
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_r8c1oeq",
        "template_768qdlt",
        form,
        "w7gqE0xZzu32Rgu-f"
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
      inquiryType: "general",
    });
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    navigate("/terms");
  };

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    navigate("/privacy");
  };

  return (
    <div
      className="contact-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="contact-overlay">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            For commissions and inquiries, please email:
            <br />
            <a href="mailto:hello@northernindiatrip.com" className="contact-email">
              hello@northernindiatrip.com
            </a>
            <br />
            or send a message via this form.
          </p>
          <a
            href="https://www.instagram.com/northernindiatrip"
            target="_blank"
            rel="noreferrer"
            className="instagram-icon"
          >
            <FaInstagram size={28} />
          </a>
        </div>

        <div className="contact-form">
          <h3>Send a Message</h3>
          {submitted ? (
            <div className="success-message">
              <i className="bi bi-check-circle me-2"></i>
              Thank you! Your message has been sent. We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Inquiry Type Selector */}
              <div className="inquiry-type-selector">
                <label className="form-label">What can we help you with?</label>
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                  className="inquiry-select"
                >
                  <option value="general">General Inquiry</option>
                  <option value="booking">Travel Booking</option>
                  <option value="custom">Custom Trip Planning</option>
                </select>
              </div>

              {/* Basic Fields - Always Visible */}
              <input
                type="text"
                name="name"
                placeholder="Your Full Name *"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address *"
                value={form.email}
                onChange={handleChange}
                required
              />

              {/* Conditional Fields for Booking/Custom Inquiries */}
              {(form.inquiryType === "booking" || form.inquiryType === "custom") && (
                <>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={handleChange}
                    required={form.inquiryType === "booking"}
                  />
                  <input
                    type="text"
                    name="destination"
                    placeholder="Destination Interested In *"
                    value={form.destination}
                    onChange={handleChange}
                    required={form.inquiryType === "booking"}
                  />
                  <input
                    type="date"
                    name="dates"
                    placeholder="Preferred Travel Date"
                    value={form.dates}
                    onChange={handleChange}
                    className="date-input"
                  />
                </>
              )}

              {/* Phone field for general inquiries (optional) */}
              {form.inquiryType === "general" && (
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={form.phone}
                  onChange={handleChange}
                />
              )}

              <textarea
                name="message"
                placeholder={
                  form.inquiryType === "booking"
                    ? "Special requests, dietary needs, or other requirements..."
                    : form.inquiryType === "custom"
                    ? "Tell us about your dream trip - duration, budget, interests, group size..."
                    : "Write your message..."
                }
                value={form.message}
                onChange={handleChange}
                required
                rows={form.inquiryType === "general" ? 4 : 5}
              />
              
              <button type="submit" className="submit-btn">
                <i className="bi bi-send me-2"></i>
                {form.inquiryType === "booking" 
                  ? "Send Booking Request" 
                  : form.inquiryType === "custom"
                  ? "Request Custom Trip"
                  : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="legal-links">
          <button onClick={handleTermsClick} className="legal-link terms-link">
            Terms & Conditions
          </button>
          <button onClick={handlePrivacyClick} className="legal-link privacy-link">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
