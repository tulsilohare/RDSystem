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
import { FaEye, FaEdit, FaUser } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";

function RDUser() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [data, setData] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [showView, setShowView] = useState(false);
  const [viewUser, setViewUser] = useState({});

  const handleEdit = (user) => {
    setEditUser(user);
    setShowUpdate(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const fetchData = () => {
    const rid = localStorage.getItem("rid");
    api.get(`/rduserbyid/${rid}`).then((res) => {
      setData(res.data);
      let sum = 0;
      res.data.forEach((item) => {
        sum = sum + item.rdamt;
      });
      setTotalMoney(sum);
    });
  };

  const deleteUser = (id) => {
    api.delete(`/rdudelete/${id}`).then(() => {
      alert("Deleted Successfully");
      fetchData();
    });
  };

  const updateUser = () => {
    api.put("http://localhost:8080/rduserupdate", editUser).then(() => {
      alert("User Updated Successfully");
      setShowUpdate(false);
      fetchData();
    });
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowView(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px);}
    to { opacity: 1; transform: translateY(0);}
  }

  @keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0;}
    to { transform: scale(1); opacity: 1;}
  }

  .rd-header {
    animation: fadeIn 1s ease-in-out;
    background: linear-gradient(135deg,#2c67d8,#4facfe);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  .rd-card {
    border-radius: 15px;
    transition: 0.4s;
  }

  .rd-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  }

  .rd-table {
    animation: zoomIn 0.8s ease;
  }

  .rd-table tbody tr {
    transition: 0.3s;
  }

  .rd-table tbody tr:hover {
    background-color: #f1f1f1;
    transform: scale(1.01);
  }

  .rd-btn {
    transition: 0.3s;
  }

  .rd-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
  }

  .rd-icon {
    transition: 0.3s;
  }

  .rd-icon:hover {
    transform: scale(1.2);
    color: #007bff;
  }

  .rd-modal .modal-content {
    border-radius: 15px;
    animation: zoomIn 0.5s ease;
  }

  .rd-input {
    border-radius: 10px;
  }

  .rd-input:focus {
    box-shadow: 0 0 10px #4facfe;
  }
  `;

  return (
    <>
      <style>{styles}</style>

      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        size="lg"
        className="rd-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaEye className="me-2" />
            RD User Details
          </Modal.Title>
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

      <Modal
        show={showUpdate}
        onHide={() => setShowUpdate(false)}
        size="mg"
        className="rd-modal"
      >
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
          className="rd-header"
          style={{
            padding: "20px",
            color: "white",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Row>
            <Col md={8}>
              <h3>
                <RiUserSettingsFill className="me-2" />
                RD MANAGEMENT SYSTEM
              </h3>
              <p>Recurring Deposit Dashboard</p>
            </Col>

            <Col md={2}>
              <Card className="text-center rd-card">
                <Card.Body>
                  <FaUser className="mb-1" />
                  <h6>Total Users</h6>
                  <h4>{data.length}</h4>
                </Card.Body>
              </Card>
            </Col>

            <Col md={2}>
              <Card className="text-center">
                <Card.Body>
                  <FaEye className="mb-1" />
                  <h6>Total Money</h6>
                  <h4>₹ {totalMoney}</h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="card shadow-sm mt-3">
          <h1 className="flex text-center m-3">USER HISTORY</h1>
          <div className="card-body table-responsive">
            <Table striped bordered hover className="rd-table">
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
                        className="me-2 rd-btn"
                        onClick={() => handleView(item)}
                      >
                        <FaEye className="rd-icon me-1" />
                        View
                      </Button>

                      <Button
                        variant="success"
                        size="sm"
                        className="me-2 rd-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit className="rd-icon me-1" />
                        Update
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="rd-btn"
                        onClick={() => deleteUser(item.rid)}
                      >
                        <MdDelete className="rd-icon me-1" />
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
