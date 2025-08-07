import React from 'react';
import './TourListings.css';

const TourListings = () => {
  return (
    <div className="tourlistings-container">
      <section className="hero">
        <h1 className="hero-title">TOUR EXPERIENCES</h1>
        <p className="hero-subtitle">
          Discover unforgettable journeys – from Himalayan treks to relaxing getaways.
        </p>
      </section>

      <section className="content">
        <h2 className="section-title">Explore Our Services</h2>
        <p className="section-subtitle">
          From treks and honeymoon packages to taxis and hotel bookings – we’ve got it all.
        </p>

        <div className="tour-section">
          <h3>🌄 Trekking Tours</h3>
          <p>Certified guides, delicious meals, and permits included.</p>
          <ul>
            <li><strong>Hampta Pass Trek</strong> (Himachal) – ₹6,999 for 5D/4N</li>
            <li><strong>Kedarkantha Trek</strong> (Uttarakhand) – ₹5,999 for 6D/5N</li>
            <li><strong>Valley of Flowers Trek</strong> (Uttarakhand) – ₹7,499 for 6D/5N</li>
          </ul>
        </div>

        <div className="tour-section">
          <h3>🏨 Hotel Bookings</h3>
          <p>Verified budget to luxury stays across India with 24/7 support.</p>
        </div>

        <div className="tour-section">
          <h3>🚗 Taxi Rentals</h3>
          <p>Affordable and reliable taxi services in cities and hill regions.</p>
        </div>

        <div className="tour-section">
          <h3>💑 Honeymoon Packages</h3>
          <p>Manali, Kashmir, Goa – romantic getaways with curated experiences.</p>
        </div>

        <div className="tour-section">
          <h3>🧳 Custom Trips & Group Tours</h3>
          <p>Fully tailored college, family, or corporate trips with transport, meals, and activities.</p>
        </div>
      </section>

      <section className="benefits">
        <h3>Why Travel With Northern India Trip?</h3>
        <ul>
          <li>✔ Trek Packages with Certified Guides</li>
          <li>✔ Customizable Honeymoon Trips</li>
          <li>✔ Hotel Booking Assistance</li>
          <li>✔ Verified Local Taxi Services</li>
          <li>✔ 24/7 Support for All Travelers</li>
        </ul>
      </section>
    </div>
  );
};

export default TourListings;
