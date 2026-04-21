import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/">Orders</NavLink>
      <NavLink to="/filter">Filter</NavLink>
      <NavLink to="/stats">Analytics</NavLink>
    </nav>
  );
};

export default NavBar;
