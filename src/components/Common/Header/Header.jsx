import React, { useEffect, useState } from "react";
import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../Header/header.css";
import logo from "../../../assets/images/logo/logo.jpg"; // Adjust this path if needed
import { useAuth } from "../../../context/AuthContext"; // Import auth context

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

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
    { path: "/gallery", label: "GALLERY" },
    { path: "/contact", label: "CONTACT" },
  ];
  
  // Add admin link conditionally
  console.log('Checking admin status:', { 
    isAuthenticated, 
    user, 
    userIsAdmin: user?.isAdmin,
    userIsAdminType: typeof user?.isAdmin,
    userObject: JSON.stringify(user)
  });
  
  // Force boolean evaluation and add admin link if user is admin
  const userIsAdmin = Boolean(user?.isAdmin);
  if (isAuthenticated && userIsAdmin) {
    console.log('Adding ADMIN link to menu');
    menuLinks.push({ path: "/admin", label: "ADMIN" });
  }
  
  // Log authentication state for debugging
  console.log('Auth state in Header:', { 
    isAuthenticated, 
    user, 
    userIsAdmin,
    hasAdminLink: menuLinks.some(link => link.label === "ADMIN"),
    token: localStorage.getItem('token')
  });

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
                    className="nav-link"
                    to={link.path}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Book Now & Mobile Toggle */}
          <div className="ms-md-4 ms-2">
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
