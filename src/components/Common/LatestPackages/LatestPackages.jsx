import React, { useState, useEffect } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import axios from 'axios';
import { createApiUrl } from '../../config/api';
import './LatestPackages.css';

const LatestPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPackages();
  }, []);

  const fetchLatestPackages = async () => {
    try {
      const res = await axios.get(createApiUrl('/packages?sort=createdAt&limit=6&isActive=true'));
      setPackages(res.data.packages || []);
    } catch (err) {
      console.error('Error fetching latest packages:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown as={Nav.Item} className="me-3">
      <Dropdown.Toggle
        variant="outline-primary"
        id="latest-packages-dropdown"
        className="latest-packages-btn"
      >
        🔥 Latest Packages
      </Dropdown.Toggle>

      <Dropdown.Menu className="latest-packages-menu">
        {loading ? (
          <Dropdown.Item disabled>Loading...</Dropdown.Item>
        ) : packages.length === 0 ? (
          <Dropdown.Item disabled>No packages available</Dropdown.Item>
        ) : (
          packages.map((pkg) => (
            <Dropdown.Item
              key={pkg._id}
              className="package-item"
              href={`/packages/${pkg._id}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="package-info">
                  <div className="package-title">{pkg.title}</div>
                  <div className="package-location text-muted small">
                    {pkg.location.city}, {pkg.location.country}
                  </div>
                </div>
                <div className="package-price text-primary fw-bold">
                  ₹{pkg.basePrice}
                </div>
              </div>
              <div className="package-meta text-muted small mt-1">
                {pkg.durationDays} days • {pkg.difficulty}
              </div>
            </Dropdown.Item>
          ))
        )}
        <Dropdown.Divider />
        <Dropdown.Item href="/tour-listings" className="view-all-btn">
          View All Packages →
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LatestPackages;
