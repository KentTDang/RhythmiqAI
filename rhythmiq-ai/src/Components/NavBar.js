import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {handleLogin} from '../spotify-components/Spotify.jsx'

import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"))

  useEffect (() => {
    setToken(window.localStorage.getItem("token"))
    console.log(token)
  }, [token])

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

  function logout() {
     window.localStorage.removeItem("token")
     setToken("")
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            {/* Search bar goes here */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#songs" className={activeLink === 'songs' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('songs')}>Songs</Nav.Link>
              <Nav.Link href="#reviews" className={activeLink === 'reviews' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('reviews')}>Reviews</Nav.Link>
            </Nav>
            <span className="navbar-text">

                 {!token ? 
                <button className="vvd" onClick={handleLogin}><span>Login</span></button>
                : <button onClick={logout}> Logout </button> }
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}