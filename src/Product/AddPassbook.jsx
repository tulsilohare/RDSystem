import React, { useState, useContext } from "react";
import { Modal, Form, Row, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function AddPassbookEntry({ show, handleClose, refreshData }) {
  const { user } = useContext(AuthContext);
  const initialState = {
    fine_amt: "",
    flag: "",
    late_day: "",
    rdamt: "",
    rddate: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!user || !user.rid) {
      alert("User not found. Please login again.");
      return;
    }
    if (!formData.rdamt || !formData.rddate || formData.flag === "") {
      alert("Please fill all required fields");
      return;
    }
    const data = {
      rid: user.rid,
      rdamt: Number(formData.rdamt),
      fine_amt: formData.fine_amt ? Number(formData.fine_amt) : 0,
      late_day: formData.late_day ? Number(formData.late_day) : 0,
      flag: Number(formData.flag),
      rddate: formData.rddate,
    };

    console.log("Sending Data:", data);
    try {
      await axios.post("http://localhost:8080/psave", data);
      alert("Passbook Entry Added");
      if (refreshData) refreshData();
      setFormData(initialState);
      handleClose();
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert("Error: " + err.response.data.message);
      } else {
        alert("Server not responding ❌");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>RD Payment Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>RD Amount *</Form.Label>
              <Form.Control
                type="number"
                name="rdamt"
                value={formData.rdamt}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>RD Date *</Form.Label>
              <Form.Control
                type="date"
                name="rddate"
                value={formData.rddate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fine Amount</Form.Label>
              <Form.Control
                type="number"
                name="fine_amt"
                value={formData.fine_amt}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Late Day</Form.Label>
              <Form.Control
                type="number"
                name="late_day"
                value={formData.late_day}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Flag *</Form.Label>
              <Form.Select
                name="flag"
                value={formData.flag}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="0">Normal</option>
                <option value="1">Late</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          ADD PASSBOOK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddPassbookEntry;
