import React, { useEffect, useState } from "react";
import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../Header/header.css";
import logo from "../../../assets/images/logo/logo.jpg"; // Adjust this path if needed
import { useAuth } from "../../../context/AuthContext"; // Import auth context
import axios from 'axios';
import { createApiUrl } from '../../../config/api';

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, login, logout } = useAuth();

  const toggleMenu = () => {
    setOpen(!open);
  };

  // Close menu on navigation
  const closeMenu = () => {
    setOpen(false);
  };

  // Sticky header listener
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header-section");
      if (!header) return; // ✅ Prevents null error

      const scrollTop = window.scrollY;
      if (scrollTop >= 120) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if on homepage
  const isHome = location.pathname === "/";

  // Menu links array
  const menuLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT US" },
    { path: "/tour-listings", label: "TOURS" },
    { path: "/activities", label: "ACTIVITIES" },
    { path: "/destination", label: "DESTINATION" },
    { path: "/travel-packages", label: "LATEST PACKAGES" },
    { path: "/contact", label: "CONTACT" },
  ];
  
  // Add admin link conditionally
  
  // Force boolean evaluation for admin status
  const userIsAdmin = Boolean(user?.isAdmin);
  

  return (
    <header className={`header-section${!isHome ? " header-black" : ""}`}>
      <Container>
        <Navbar expand="lg" className="p-0">
          {/* Logo Section */}
          <Navbar.Brand>
            <NavLink to="/" className="d-flex align-items-center">
              <img src={logo} alt="Northern Indian Trip Logo" className="logo-img me-2" />
              Northern India Trip
            </NavLink>
          </Navbar.Brand>

          {/* Offcanvas Menu */}
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={open}
          >
            {/* Mobile Logo */}
            <Offcanvas.Header>
              <NavLink
                to="/"
                className="d-flex align-items-center logo-mobile"
                onClick={closeMenu}
              >
                <img src={logo} alt="Northern Indian Trip Logo" className="logo-img me-2" />
                <h1 className="m-0">Northern Indian Trip</h1>
              </NavLink>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>

            {/* Menu Items */}
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {menuLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    className={`nav-link ${link.label === "LATEST PACKAGES" ? "latest-packages-highlight" : ""}`}
                    to={link.path}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                ))}
                
                {/* Admin Link */}
                {isAuthenticated && userIsAdmin && (
                  <NavLink
                    className="nav-link admin-link"
                    to="/travel-admin"
                    onClick={closeMenu}
                  >
                    <i className="bi bi-gear-fill me-2"></i>
                    ADMIN DASHBOARD
                  </NavLink>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Admin Button & Book Now & Mobile Toggle */}
          <div className="ms-md-4 ms-2 d-flex align-items-center">
            {/* Quick Admin Login for Testing */}
            {!isAuthenticated && (
              <button 
                className="btn btn-sm btn-warning me-2"
                onClick={async () => {
                  try {
                    console.log('Attempting admin login...');
                    const success = await login('admin', 'admin123');
                    if (success) {
                      console.log('Login successful!');
                      alert('Login successful!');
                    } else {
                      console.log('Login failed');
                      alert('Login failed - check console for details');
                    }
                  } catch (error) {
                    console.error('Login error:', error);
                    alert('Login error: ' + error.message);
                  }
                }}
              >
                Quick Admin Login
              </button>
            )}

            {/* Debug API Button */}
            <button 
              className="btn btn-sm btn-info me-2"
              onClick={async () => {
                try {
                  console.log('Testing API connection...');
                  console.log('API URL:', createApiUrl('/auth/login'));
                  
                  const res = await axios.post(createApiUrl('/auth/login'), {
                    username: 'admin',
                    password: 'admin123'
                  });
                  
                  console.log('Raw API Response:', res);
                  console.log('Response Data:', res.data);
                  alert('API Test Success! Check console for details.');
                } catch (error) {
                  console.error('API Test Error:', error);
                  console.error('Error Response:', error.response?.data);
                  alert('API Test Failed: ' + (error.response?.data?.message || error.message));
                }
              }}
            >
              Test API
            </button>

            {/* User Profile and Logout */}
            {isAuthenticated && (
              <>
                <NavLink 
                  className="btn btn-sm btn-outline-primary me-2" 
                  to="/profile"
                >
                  Profile ({user?.username || user?.name})
                </NavLink>
                <button 
                  className="btn btn-sm btn-secondary me-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}


            <NavLink className="primaryBtn d-none d-sm-inline-block" to="/book-now">
              Book Now
            </NavLink>
            <li className="d-inline-block d-lg-none ms-3 toggle_btn">
              <i className={open ? "bi bi-x-lg" : "bi bi-list"} onClick={toggleMenu}></i>
            </li>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
