import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from "../context/UserContext";
import { NavLink, Link } from "react-router-dom";
import { FaSearch,  } from "react-icons/fa";
import HomeButton from "../assets/home-button.png"


function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="bg" >
      <Container>
        <Navbar.Brand>
          <NavLink className="nav-link" exact to="/">
            <img
                src={HomeButton}
                alt="logo"
                width="125" 
                height="75"
              />
          </NavLink>
        </Navbar.Brand>
        {!currentUser ?
        <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">  
          </Nav>
          <Nav>
            <NavLink className="nav-link" exact to="/login">login</NavLink>
            <NavLink className="nav-link"exact to="/signup">sign up</NavLink>
          </Nav>
        </Navbar.Collapse>
        </>
        :
        <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">  
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <NavLink exact to="/profile">Edit</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink exact to="/liked-movies">Liked Movies</NavLink>              
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/" onClick={logout}>Sign Out</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="d-flex">
            <NavLink className="nav-link" exact to="/search">Search Movies <FaSearch/></NavLink>
          </Nav>
        </Navbar.Collapse>
        </>
        }
      </Container>
    </Navbar>
  );
}

export default NavBar;