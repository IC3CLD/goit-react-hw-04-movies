import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const NavigationLink = styled(NavLink)`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  padding: 20px;
  font-size: 26px;
  &:hover{
    color:black
  }
`;

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <NavigationLink to="/" className="link">
          Home
        </NavigationLink>
        <NavigationLink to="/movies" className="link">
          Movies
        </NavigationLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
