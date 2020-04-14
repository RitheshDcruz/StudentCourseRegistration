import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/login" activeStyle={activeStyle}>
        Login
      </NavLink>
      {" | "}
      <NavLink to="/register" activeStyle={activeStyle}>
        Register
      </NavLink>
      {" | "}
      <NavLink to="/viewallstudents" activeStyle={activeStyle}>
        View all users
      </NavLink>
      {" | "}
      <NavLink to="/viewallcourses" activeStyle={activeStyle}>
        View all courses
      </NavLink>
    </nav>
  );
};

export default Header;
