import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import api from "./api";
import {
  Container,
  Card,
  Modal,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import axios from "axios";

function RDUser() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [editUser, setEditUser] = useState({});

  const handleEdit = (user) => {
    setEditUser(user);
    setShowUpdate(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    setEditUser({
      ...editUser,
      [name]: value,
    });
  };

  const [data, setData] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const fetchData = () => {
    const rid = localStorage.getItem("rid");
    api.get(`/rduserbyid/${rid}`).then((res) => {
      setData(res.data); // ✅ direct array
      let sum = 0;
      res.data.forEach((item) => {
        sum = sum + item.rdamt;
      });
      setTotalMoney(sum);
    });
  };

  const deleteUser = (id) => {
    api
      .delete(`/rdudelete/${id}`)
      .then(() => {
        alert("Deleted Successfully");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    api
      .put("http://localhost:8080/rduserupdate", editUser)

      .then(() => {
        alert("User Updated Successfully");
        setShowUpdate(false);
        fetchData();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const [showView, setShowView] = useState(false);
  const [viewUser, setViewUser] = useState({});

  const handleView = (user) => {
    setViewUser(user);
    setShowView(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* viewModal */}
      <Modal show={showView} onHide={() => setShowView(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>RD User Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={6}>
              <p>
                <b>ID:</b> {viewUser.rid}
              </p>
              <p>
                <b>Name:</b> {viewUser.name}
              </p>
              <p>
                <b>Mobile:</b> {viewUser.mobile}
              </p>
              <p>
                <b>Password:</b> {viewUser.password}
              </p>
              <p>
                <b>Gender:</b> {viewUser.gender}
              </p>
              <p>
                <b>DOB:</b> {viewUser.dob}
              </p>
            </Col>

            <Col md={6}>
              <p>
                <b>Address:</b> {viewUser.adder}
              </p>
              <p>
                <b>Occupation:</b> {viewUser.accupation}
              </p>
              <p>
                <b>Account No:</b> {viewUser.acno}
              </p>
              <p>
                <b>Aadhar No:</b> {viewUser.adharno}
              </p>
              <p>
                <b>PAN No:</b> {viewUser.panno}
              </p>
            </Col>
          </Row>

          <hr />

          <h5>RD Details</h5>

          <Row>
            <Col md={6}>
              <p>
                <b>RD Date:</b> {viewUser.rddate}
              </p>
            </Col>

            <Col md={6}>
              <p>
                <b>RD Amount:</b> ₹ {viewUser.rdamt}
              </p>
            </Col>
          </Row>

          <hr />

          <h5>Nominee Details</h5>

          <Row>
            <Col md={6}>
              <p>
                <b>Nominee Name:</b> {viewUser.nname}
              </p>
              <p>
                <b>Nominee Address:</b> {viewUser.naddr}
              </p>
            </Col>

            <Col md={6}>
              <p>
                <b>Nominee Aadhar:</b> {viewUser.nadharno}
              </p>
              <p>
                <b>Nominee PAN:</b> {viewUser.npanno}
              </p>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* rduserupadate */}
      <Modal show={showUpdate} onHide={() => setShowUpdate(false)} size="mg">
        <Modal.Header closeButton>
          <Modal.Title>Update RD User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  name="mobile"
                  value={editUser.mobile || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={editUser.password || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={editUser.name || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="adder"
                  value={editUser.adder || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={editUser.dob || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  name="gender"
                  value={editUser.gender || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Label>RD Date</Form.Label>
                <Form.Control
                  type="date"
                  name="rddate"
                  value={editUser.rddate || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>RD Amount</Form.Label>
                <Form.Control
                  name="rdamt"
                  value={editUser.rdamt || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  name="accupation"
                  value={editUser.accupation || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Account No</Form.Label>
                <Form.Control
                  name="acno"
                  value={editUser.acno || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Label>Aadhar</Form.Label>
                <Form.Control
                  name="adharno"
                  value={editUser.adharno || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>PAN</Form.Label>
                <Form.Control
                  name="panno"
                  value={editUser.panno || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <hr />

            <h5>Nominee Details</h5>

            <Row>
              <Col md={6}>
                <Form.Label>Nominee Name</Form.Label>
                <Form.Control
                  name="nname"
                  value={editUser.nname || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Nominee Address</Form.Label>
                <Form.Control
                  name="naddr"
                  value={editUser.naddr || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Label>Nominee Aadhar</Form.Label>
                <Form.Control
                  name="nadharno"
                  value={editUser.nadharno || ""}
                  onChange={handleUpdateChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Nominee PAN</Form.Label>
                <Form.Control
                  name="npanno"
                  value={editUser.npanno || ""}
                  onChange={handleUpdateChange}
                />
              </Col>
            </Row>

            <div className="mt-3 text-end">
              <Button
                className="m-3"
                variant="secondary"
                onClick={() => setShowUpdate(false)}
              >
                Cancel
              </Button>

              <Button variant="success" onClick={updateUser}>
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Container fluid>
        {/* HEADER */}
        <div
          style={{
            background: "#2c67d8",
            padding: "20px",
            color: "white",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Row>
            <Col md={8}>
              <h3>RD MANAGEMENT SYSTEM</h3>
              <p>Recurring Deposit Dashboard</p>
            </Col>

            <Col md={2}>
              <Card className="text-center">
                <Card.Body>
                  <h6>Total Users</h6>
                  <h4>{data.length}</h4>
                </Card.Body>
              </Card>
            </Col>

            <Col md={2}>
              <Card className="text-center">
                <Card.Body>
                  <h6>Total Money</h6>
                  <h4>₹ {totalMoney}</h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* TABLE */}

        <div className="card shadow-sm mt-3">
          <h1 className="flex text-center m-3">USER HISTORY</h1>
          <div className="card-body table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Occupation</th>
                  <th>Account</th>
                  <th>Aadhar</th>
                  <th>PAN</th>
                  <th>RD Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.rid}</td>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.accupation}</td>
                    <td>{item.acno}</td>
                    <td>{item.adharno}</td>
                    <td>{item.panno}</td>
                    <td>{item.rdamt}</td>
                    <td>{item.rddate}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleView(item)}
                      >
                        View
                      </Button>

                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Update
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteUser(item.rid)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
}

export default RDUser;
