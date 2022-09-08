import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, Navbar, NavItem, Input } from "reactstrap";
import UserContext from "../context/UserContext";

function NavBar({ logout, getMoviesByQuery }) {
  const { currentUser } = useContext(UserContext);
  
  // if we're not logged in we only want to show the login and signup options 
  // the landing page nav will be visible at all times
  const [formData, setFormData] = useState({
    query : ""
  });

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      [name]: value
    }));
  }



  return (
    <Nav >
      <Navbar>
        <NavItem >
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

          <NavItem>
            <div class="input-group mb-3">
              <Input
                type="search"
              />
            </div>
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