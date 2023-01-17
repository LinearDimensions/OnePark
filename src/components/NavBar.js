import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Welcome, Daniel Li</Nav.Link>
              <Nav.Link href="#carparks" className={activeLink === 'carparks' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('carparks')}>Carparks</Nav.Link>
              <Nav.Link href="#report_fault" className={activeLink === 'report_fault' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('report_fault')}>Report a Fault</Nav.Link>
              <Nav.Link href="#faults" className={activeLink === 'faults' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('report_fault')}>Faults</Nav.Link>
              <div className='statusBarWhite'> 100💎</div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
