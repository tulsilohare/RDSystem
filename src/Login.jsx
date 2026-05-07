import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Modal,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "./Product/api";
import { AuthContext } from "./Product/AuthContext";
import Logo from "./assets/expences.png";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    name: "",
    agree: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    api
      .post("/login", loginData)
      .then((res) => {
        alert("Login Success");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("rid", res.data.rid);
        localStorage.setItem("name", res.data.name);

        setUser({
          rid: res.data.rid,
          name: res.data.name,
        });

        setIsLoggedIn(true);
        navigate("/RDUser");
      })
      .catch(() => alert("Invalid credentials"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Accept Terms first");
      return;
    }

    api
      .post("/rdusave", formData)
      .then(() => {
        alert("Register Success");
        setShowRegister(false);
      })
      .catch(() => alert("Error in registration"));
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <Modal show={showTerms} onHide={() => setShowTerms(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>RD Rules</h5>
          <ul>
            <li>
              The R.D. installment must be paid within the first week of the
              month.
            </li>
            <li>
              The R.D. installment must be paid by the 5th of every month.
            </li>
            <li>After this date, a late fee of ₹5 per day will be charged.</li>
            <li>
              Once an R.D. account is opened, it cannot be closed before the
              completion of six months.
            </li>
            <li>
              If it is closed earlier, <b>40% of the deposited amount</b> will
              be deducted as administrative charges.
            </li>
          </ul>
          <hr />
          <h5>Loan Rules</h5>
          <ul>
            <li>A loan can be given only against the R.D. passbook.</li>
            <li>
              The R.D. account must be at least six months old and active.
            </li>
            <li>
              To take a loan, two guarantors with R.D. passbooks are required.
            </li>
          </ul>
          <hr />
          <h5>Loan Amount Details</h5>
          <ul>
            <li>R.D. Amount ₹1000 → Loan Amount ₹10,000</li>
            <li>R.D. Amount ₹2000 → Loan Amount ₹20,000</li>
            <li>R.D. Amount ₹3000 → Loan Amount ₹30,000 to ₹40,000</li>
          </ul>
          <hr />
          <p>
            <b>Declaration:</b>
            <br />I confirm that I have read and understood all the rules and
            conditions mentioned above. No force or pressure was used while
            taking this loan. I am taking this loan of my own free will.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTerms(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#1e3c72,#2a5298)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={5}>
              <Card className="p-4 shadow-lg" style={{ borderRadius: "20px" }}>
                <Card.Body>
                  <div className="text-center mb-3">
                    <img src={Logo} alt="logo" height={70} />
                    <h4>Tulsi Finance</h4>
                  </div>

                  <Form onSubmit={handleLogin}>
                    <Form.Control
                      className="mb-3"
                      name="mobile"
                      placeholder="Mobile"
                      onChange={handleLoginChange}
                      required
                    />

                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={handleLoginChange}
                        required
                      />
                      <i
                        className={
                          showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: 10,
                          cursor: "pointer",
                        }}
                      ></i>
                    </div>

                    <Button type="submit" className="mt-3 w-100">
                      Login
                    </Button>

                    <p className="mt-3 text-center">
                      New user?{" "}
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => setShowRegister(true)}
                      >
                        Register
                      </span>
                    </p>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="mb-2"
              name="mobile"
              placeholder="Mobile"
              onChange={handleChange}
              required
            />

            <Form.Control
              className="mb-2"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <Form.Control
              className="mb-2"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <Form.Check
              className="mt-2"
              type="checkbox"
              label="Agree Terms"
              name="agree"
              onChange={handleChange}
            />

            <p
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setShowTerms(true)}
            >
              Read Terms
            </p>

            <Button type="submit" className="mt-2 w-100">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
