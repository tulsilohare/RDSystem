import React, { useState } from "react";
import { Modal, Form, Row, Button } from "react-bootstrap";
import axios from "axios";

function AddPassbookEntry({ show, handleClose, refreshData, rid }) {
  const initialState = {
    rdamt: "",
    rddate: "",
    fine_amt: "",
    late_day: "",
    flag: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!rid) {
      alert("RID not found");
      return;
    }

    if (!formData.rdamt || !formData.rddate || !formData.flag) {
      alert("Please fill required fields");
      return;
    }

    const data = {
      rid: rid,
      rdamt: parseInt(formData.rdamt),
      fine_amt: parseInt(formData.fine_amt || 0),
      late_day: parseInt(formData.late_day || 0),
      flag: parseInt(formData.flag),
      rddate: formData.rddate,
    };

    axios
      .post("http://localhost:8080/rdpsave", data)
      .then(() => {
        alert("Passbook Entry Added");

        refreshData();
        setFormData(initialState);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Error saving data");
      });
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>RD Payment Entry</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>RD Amount</Form.Label>
              <Form.Control
                type="number"
                name="rdamt"
                value={formData.rdamt}
                onChange={handleChange}
                placeholder="Enter RD Amount"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>RD Date</Form.Label>
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
                placeholder="Enter Fine"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Late Day</Form.Label>
              <Form.Control
                type="number"
                name="late_day"
                value={formData.late_day}
                onChange={handleChange}
                placeholder="Enter Late Days"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Flag</Form.Label>
              <Form.Select
                name="flag"
                value={formData.flag}
                onChange={handleChange}
              >
                <option value="">Select Flag</option>
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
          Add Passbook
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPassbookEntry;
