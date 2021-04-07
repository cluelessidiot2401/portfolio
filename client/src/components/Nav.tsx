import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Login from "./Login";
import logo from "../static-files/imgs/mern-logo.png";

const Navigation = () => {
  const { user, logOut } = useContext(GlobalContext);
  const history = useHistory();

  const logOutAndRedirect = () => {
    logOut();
    history.push("/");
  };

  const componentsToRender = (): JSX.Element => {
    return (
      <>
        {(!user || user.registrationStatus === "onboarded") && (
          <Link to="/register">
            <h3>Register</h3>
          </Link>
        )}
        {!user && <Login />}
        {user && user.registrationStatus === "approved" && (
          <Link to="/profile">
            <h3>Profile</h3>
          </Link>
        )}
        {user && (
          <button className="navlink-btn" onClick={() => logOutAndRedirect()}>
            <h3>Logout</h3>
          </button>
        )}
      </>
    );
  };

  return (
    <Navbar className="navbar" bg="dark" variant="dark" sticky="top">
      <Link to="/">
        <Navbar.Brand id="nav-title">
          <img className="nav-logo" src={logo} alt="" /> My App
        </Navbar.Brand>
      </Link>
      <Nav className="nav-items">
        <Link to="/home">
          <h3>Home</h3>
        </Link>
        {componentsToRender()}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
