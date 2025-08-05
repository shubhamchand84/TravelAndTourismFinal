import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../Header/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // <-- Add this

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    window.addEventListener("scroll", isSticky);
    return ()=>{
      window.removeEventListener("scroll", isSticky)
    }
  })

  // sticky Header 
  const isSticky=(e)=>{
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 120 ? header.classList.add('is-sticky') :
    header.classList.remove('is-sticky')
  }

  // Add a class if not on home page
  const isHome = location.pathname === "/";

  return (
    <header className={`header-section${!isHome ? " header-black" : ""}`}>
      <Container>
        <Navbar expand="lg" className="p-0">
          {/* Logo Section  */}
          <Navbar.Brand>
            <NavLink to="/"> Weekendmonks</NavLink>
          </Navbar.Brand>
          {/* End Logo Section  */}

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={open}
          >
            {/*mobile Logo Section  */}
            <Offcanvas.Header>
              <h1 className="logo">Weekendmonks</h1>
              <span className="navbar-toggler ms-auto"  onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>
            {/*end mobile Logo Section  */}
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/about">
                  ABOUT US
                </NavLink>
                <NavLink className="nav-link" to="/tour-listings">
                  TOURS
                </NavLink>
                <NavDropdown
                  title="DESTINATION"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavLink className="nav-link text-dark" to="/destination">
                    SPAIN TOURS
                  </NavLink>
                </NavDropdown>
                <NavLink className="nav-link" to="/gallery">
                  GALLERY
                </NavLink>
                <NavLink className="nav-link" to="/contact">
                  CONTACT
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        
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