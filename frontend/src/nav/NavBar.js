import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, NavItem, Input } from "reactstrap";
import UserContext from "../context/UserContext";
import { FaSearch } from "react-icons/fa";


function NavBar({ logout, queryMovies }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Nav 
    fill
    pills
    >
        <NavItem>
          <NavLink className="nav-link" exact to="/">home</NavLink>
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
            <Link to="/" className="nav-link">{currentUser.username}'s liked movies</Link>
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