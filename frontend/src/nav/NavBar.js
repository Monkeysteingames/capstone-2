import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import UserContext from "../context/UserContext";
import { FaSearch } from "react-icons/fa";
import HomeButton from "../assets/home-button.png"


function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Nav 
    
    >
        <NavItem>
          <NavLink className="nav-link" exact to="/">
          <img
            src={HomeButton}
            alt="logo"
            width="150" 
            height="100"
          />
          </NavLink>
        </NavItem>
        {currentUser ?
        <>
          <NavItem>
            <NavLink className="nav-link" exact to="/profile">profile</NavLink>
          </NavItem>

          <NavItem>
            <Link to="/" className="nav-link" onClick={logout}>sign out</Link>
          </NavItem>   

          <NavItem>
          <NavLink className="nav-link" exact to="/search">search movies <FaSearch/></NavLink>
          </NavItem>

          <NavItem>
            <NavLink className="nav-link" exact to="/liked-movies">{currentUser.username}'s liked movies</NavLink>
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
    </Nav>
  );
}

export default NavBar;