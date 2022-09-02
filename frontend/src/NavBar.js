import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";
import UserContext from "./UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  
  // if we're not logged in we only want to show the login and signup options 
  // the landing page nav will be visible at all times

  return (
    <Nav>
      <Navbar>
        <NavItem>
          <NavLink className="nav-link" exact to="/">Movie Check</NavLink>
        </NavItem>
        {currentUser ?
        <>
          <NavItem>
            <NavLink className="nav-link" exact to="/profile">profile</NavLink>
          </NavItem>

          <NavItem>
            <Link to="/" onClick={logout}>Log out {currentUser.username}</Link>
          </NavItem>    
        </>
        :
        <>
          <NavItem>
            <NavLink className="nav-link" exact to="/login">login</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink className="nav-link"exact to="/signup">sign up</NavLink>
          </NavItem>
        </>
        }
      </Navbar>
    </Nav>
  );
}

export default NavBar;