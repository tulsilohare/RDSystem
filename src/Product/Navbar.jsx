import React, { useEffect, useState } from "react";
import "../style/Navbar.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import api from "./api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BellFill, PersonCircle } from "react-bootstrap-icons";

const AppNavbar = ({ setIsLoggedIn }) => {
  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }

  const [nm, setName] = useState("");
  let nameFatch = () => {
    const rid = localStorage.getItem("rid");

    api.get(`/rduserbyid/${rid}`).then((res) => {
      // 🔍 check response
      setName(res.data[0].name);
    });
  };

  useEffect(() => {
    nameFatch();
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="shadow-sm py-1"
      >
        <Container>
          {/* Logo Section */}
          <Navbar.Brand href="#" className="fw-bold fs-4">
          Tulsi Finance
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left Menu */}
            <Nav className="me-auto ms-4">
              <Nav.Link as={Link} to="/homepage" className="fw-semibold">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/RDUser" className="fw-semibold">
                Dashboard
              </Nav.Link>

              <Nav.Link as={Link} to="/RDPassbook" className="fw-semibold">
                Transactions
              </Nav.Link>

              <Nav.Link as={Link} to="/Reports" className="fw-semibold">
                Reports
              </Nav.Link>
            </Nav>

            {/* Right Section */}
            <Nav className="align-items-center gap-3">
              {/* Notification */}
              <Nav.Link href="#">
                <BellFill size={20} />
              </Nav.Link>

              {/* Profile Dropdown */}
              <NavDropdown
                title={
                  <span>
                    <PersonCircle size={22} className="me-2" />
                    {nm}
                  </span>
                }
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
