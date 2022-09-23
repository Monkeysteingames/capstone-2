import React, { useContext, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from "../context/UserContext";
import Modal from 'react-bootstrap/Modal';
import { NavLink, Link } from "react-router-dom";
import { FaSearch,  } from "react-icons/fa";
import HomeButton from "../assets/home-button.png"
import { Button } from "reactstrap";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


function NavBar({ logout, login, signup }) {
  const { currentUser } = useContext(UserContext);
  const [loginShow, setLoginShow] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);

  const buttonStyle = {
    borderColor:'rgba(0,0,0,0)',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,0,0,0)'
};

  const handleClose = () => {
    if (loginShow) {
      setLoginShow(false);
    } else if (signupShow) {
      setSignupShow(false); 
    } else if (profileShow) {
      setProfileShow(false);
    };
  };

  const handleShow = (form) => {
    if (form === "login") {
      setLoginShow(true);
    } else if (form === "signup"){
      setSignupShow(true);
    } else if (form === "profile") {
      setProfileShow(true);
    };
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
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
          <Nav>
            {/* Login Modal */}
            <Button style={buttonStyle} className="nav-link" onClick={() => handleShow("login")}>login</Button>
            <Modal show={loginShow} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body><Login login={login} /></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Sign Up Modal */}
            <Button style={buttonStyle}className="nav-link" onClick={() => handleShow("signup")}>sign up</Button>
            <Modal show={signupShow} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body><Signup signup={signup} /></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Nav>
        </Navbar.Collapse>
        </>
        :
        <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="d-flex">
            <NavLink className="nav-link" exact to="/search">Search Movies <FaSearch/></NavLink>
          </Nav>
          <Nav className="d-flex">
            <NavLink className="nav-link" exact to="/liked-movies">Liked Movies</NavLink>              
          </Nav>
          <Nav className= "offset-sm-6">  
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <NavLink exact to="/profile">Edit Profile</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/" onClick={logout}>Sign Out</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </>
        }
      </Container>
    </Navbar>
  );
}

export default NavBar;