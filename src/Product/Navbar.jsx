import React, { useEffect, useState } from "react";
import "../style/Navbar.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import api from "./api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BellFill, PersonCircle } from "react-bootstrap-icons";

const AppNavbar = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nm, setName] = useState("");

  useEffect(() => {
    const rid = localStorage.getItem("rid");
    if (rid) {
      api
        .get(`/rduserbyid/${rid}`)
        .then((res) => {
          setName(res.data?.[0]?.name || "User");
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm py-1">
      <Container>
        <Navbar.Brand className="fw-bold fs-4">💰RD Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link as={Link} to="/homepage" className="fw-semibold">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/RDUser" className="fw-semibold">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/Passbook" className="fw-semibold">
              Transactions
            </Nav.Link>

            <Nav.Link as={Link} to="/Reports" className="fw-semibold">
              Reports
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-3">
            <Nav.Link>
              <BellFill size={20} />
            </Nav.Link>

            <NavDropdown
              title={
                <span>
                  <PersonCircle size={22} className="me-2" />
                  {nm}
                </span>
              }
              align="end"
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Settings</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item as="div">
                <button className="btn btn-danger w-100" onClick={logout}>
                  Logout
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
