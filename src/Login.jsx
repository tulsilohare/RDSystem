import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Modal, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import api from "./Product/api";
import { AuthContext } from "./Product/AuthContext";
import Table from "react-bootstrap/Table";
import Logo from "./assets/expences.png";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [data, setData] = useState([]);
  const [showTerms, setShowTerms] = useState(false);
  const handleTermsClose = () => setShowTerms(false);
  const handleTermsShow = () => setShowTerms(true);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept Terms & Conditions");
      return;
    }

    const cleanedData = {
      rid: formData.rid ? parseInt(formData.rid) : 0,
      mobile: formData.mobile,
      password: formData.password,
      name: formData.name,
      adder: formData.adder,
      dob: formData.dob ? formData.dob : null,
      gender: formData.gender,
      rddate: formData.rddate ? formData.rddate : null,
      rdamt: formData.rdamt ? parseInt(formData.rdamt) : 0,
      accupation: formData.accupation,
      acno: formData.acno,
      adharno: formData.adharno,
      panno: formData.panno,
      nname: formData.nname,
      naddr: formData.naddr,
      nadharno: formData.nadharno,
      npanno: formData.npanno,
      agree: formData.agree,
    };

    console.log("Sending Data:", cleanedData);

    api
      .post("/rdusave", cleanedData)
      .then((res) => {
        alert("Register Success....!");
        fetchUsers();
        handleClose();
        setIsLoggedIn(true);
        navigate("/RDuser");
      })
      .catch((err) => {
        console.log("SERVER ERROR:", err.response?.data);
      });
  };

  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
  });

  const hndleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

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
        navigate("/RDuser");
      })
      .catch((err) => {
        alert("Login Field.....!");
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [formData, setFormData] = useState({
    rid: "",
    mobile: "",
    password: "",
    name: "",
    adder: "",
    dob: "",
    gender: "",
    rddate: "",
    rdamt: "",
    accupation: "",
    acno: "",
    adharno: "",
    panno: "",
    nname: "",
    naddr: "",
    nadharno: "",
    npanno: "",
    agree: false,
  });

  const fetchUsers = () => {
    const rid = localStorage.getItem("rid");
    if (!rid) return; // stop API call
    api.get(`/rduserbyid/${rid}`).then((res) => {
      {
        "Bearer " + localStorage.getItem("token");
      }
      setData([res.data]);
    });
  };
  // onload
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Modal show={showTerms} onHide={handleTermsClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Rules and Conditions</Modal.Title>
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
          <Button variant="secondary" onClick={handleTermsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* loginPage */}
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={5}>
              <Card
                className="p-4 shadow-lg"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                }}
              >
                <Card.Body>
                  <div className="text-center mb-4">
                    <img
                      src={Logo}
                      alt={Logo}
                      style={{ height: 80, width: 90 }}
                    />
                    <h3>
                      Aman<span style={{ color: "blue" }}>Finance</span>
                    </h3>
                  </div>

                  <Form className="text-center" onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        name="mobile"
                        placeholder="Enter mobile"
                        onChange={hndleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>

                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          name="password"
                          onChange={hndleChange}
                          required
                        />

                        <i
                          className={
                            showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                          }
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "20px",
                            color: "black",
                          }}
                        ></i>
                      </div>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className=""
                      style={{ borderRadius: "10px" }}
                    >
                      SingIn
                    </Button>
                    <br />

                    <center>
                      <h1 style={{ margin: 40 }}>
                        <Button variant="primary" onClick={handleShow}>
                          Sign In ? Register New RD User
                        </Button>
                      </h1>
                    </center>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        <Modal show={show} onHide={handleClose} size="mg">
          <Modal.Header closeButton>
            <Modal.Title>Add New RD User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontSize: "20px",
                      color: "black",
                    }}
                  ></i>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="adder"
                  value={formData.adder}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />

              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>

              <Form.Label>RD Date</Form.Label>
              <Form.Control
                type="date"
                name="rddate"
                value={formData.rddate}
                onChange={handleChange}
                required
              />

              <Form.Label>RD Amount</Form.Label>
              <Form.Control
                type="number"
                name="rdamt"
                value={formData.rdamt}
                onChange={handleChange}
                required
              />

              <Form.Label>Occupation</Form.Label>
              <Form.Control
                name="accupation"
                value={formData.accupation}
                onChange={handleChange}
                required
              />

              <Form.Label>Account No</Form.Label>
              <Form.Control
                name="acno"
                value={formData.acno}
                onChange={handleChange}
                required
              />

              <Form.Label>Aadhar No</Form.Label>
              <Form.Control
                name="adharno"
                value={formData.adharno}
                onChange={handleChange}
                required
              />

              <Form.Label>PAN No</Form.Label>
              <Form.Control
                name="panno"
                value={formData.panno}
                onChange={handleChange}
                required
              />

              <hr />

              <h5 style={{ fontWeight: "bold", textAlign: "center" }}>
                Nominee Details
              </h5>

              <Form.Label>Nominee Name</Form.Label>
              <Form.Control
                name="nname"
                value={formData.nname}
                onChange={handleChange}
                required
              />

              <Form.Label>Nominee Address</Form.Label>
              <Form.Control
                name="naddr"
                value={formData.naddr}
                onChange={handleChange}
                required
              />

              <Form.Label>Nominee Aadhar</Form.Label>
              <Form.Control
                name="nadharno"
                value={formData.nadharno}
                onChange={handleChange}
                required
              />

              <Form.Label>Nominee PAN</Form.Label>
              <Form.Control
                name="npanno"
                value={formData.npanno}
                onChange={handleChange}
                required
              />

              <hr />
              <p
                style={{ cursor: "pointer", color: "blue" }}
                onClick={handleTermsShow}
              >
                Read Terms & Conditions
              </p>
              <Form.Check
                type="checkbox"
                label="I agree to Terms & Conditions"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />

              <div className="mt-3 text-end">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>{" "}
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Login;
