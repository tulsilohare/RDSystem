import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Container, Table, Modal, Form, Button, Badge } from "react-bootstrap";
import AddPassbookEntry from "./AddPassbook";
import API from "./api"; // ✅ IMPORTANT

// Icons
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsBank } from "react-icons/bs";

export default function Passbook() {
  const { user } = useContext(AuthContext);

  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [tra, setUserTra] = useState(0);
  const [TotalA, setTotaA] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [showPassbook, setShowPassbook] = useState(false);

  // ✅ FETCH DATA
  const fetchRDData = async () => {
    if (!user?.rid) return;

    try {
      const res = await API.get(`/passbookByid/${user.rid}`);
      setData(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error("Fetch passbook error:", err);
      setData([]);
    }

    try {
      const closeRes = await API.get(`/close/${user.rid}`);
      setStatus(closeRes.data?.userStatus || "ACTIVE");
      setTotaA(closeRes.data?.amount || 0);
      setUserTra(closeRes.data?.months || 0);
    } catch (err) {
      console.error("Close API error:", err);
      setStatus("ACTIVE");
      setTotaA(0);
      setUserTra(0);
    }
  };

  // ✅ FIXED useEffect
  useEffect(() => {
    if (user && user.rid) {
      fetchRDData();
    }
  }, [user]);

  // EDIT
  const handleEdit = (item) => {
    setEditUser(item);
    setShowUpdate(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const updateUser = async () => {
    try {
      await API.put("/pupdate", editUser);
      alert("Updated Successfully");
      setShowUpdate(false);
      fetchRDData();
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  // DELETE
  const deleteUser = async (id) => {
    try {
      await API.delete(`/pdelete/${id}`);
      alert("Deleted Successfully");
      fetchRDData();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  return (
    <>
      {/* UPDATE MODAL */}
      <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Entry</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-2"
              name="rdamt"
              value={editUser.rdamt || ""}
              onChange={handleUpdateChange}
              placeholder="Amount"
            />

            <Form.Control
              className="mb-2"
              type="date"
              name="rddate"
              value={editUser.rddate || ""}
              onChange={handleUpdateChange}
            />

            <Form.Control
              className="mb-2"
              name="fine_amt"
              value={editUser.fine_amt || ""}
              onChange={handleUpdateChange}
              placeholder="Fine"
            />

            <Form.Control
              className="mb-2"
              name="late_day"
              value={editUser.late_day || ""}
              onChange={handleUpdateChange}
              placeholder="Late Days"
            />

            <Form.Select
              name="flag"
              value={editUser.flag || ""}
              onChange={handleUpdateChange}
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">Late</option>
            </Form.Select>

            <div className="text-end mt-3">
              <Button onClick={updateUser}>Update</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MAIN UI */}
      <Container fluid>
        <div className="card shadow-lg mt-4 p-4">
          <h2 className="text-center text-primary mb-4">
            <BsBank className="me-2" />
            PASSBOOK
          </h2>

          <div className="d-flex justify-content-between mb-3">
            <span>Total Amount: ₹ {TotalA}</span>
            <span>Months: {tra}</span>
            <span>
              {status === "ACTIVE" ? (
                <Badge bg="success">Active</Badge>
              ) : (
                <Badge bg="danger">Closed</Badge>
              )}
            </span>
          </div>

          <div className="d-flex justify-content-end mb-3">
            <Button onClick={() => setShowPassbook(true)}>
              <FaPlusCircle className="me-2" />
              Passbook Entry
            </Button>
          </div>

          {/* TABLE */}
          <Table striped bordered hover className="text-center">
            <thead className="table-dark">
              <tr>
                <th>RID</th>
                <th>PID</th>
                <th>Amount</th>
                <th>Fine</th>
                <th>Late</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.pid || index}>
                    <td>{item.rid}</td>
                    <td>{item.pid}</td>
                    <td>₹ {item.rdamt}</td>
                    <td>₹ {item.fine_amt}</td>
                    <td>{item.late_day}</td>
                    <td>{item.rddate}</td>

                    <td>
                      {item.flag === 0 ? (
                        <Badge bg="success">Normal</Badge>
                      ) : (
                        <Badge bg="warning">Late</Badge>
                      )}
                    </td>

                    <td>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteUser(item.pid)}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No Data Found</td>
                </tr>
              )}
            </tbody>
          </Table>

          <AddPassbookEntry
            show={showPassbook}
            handleClose={() => setShowPassbook(false)}
            refreshData={fetchRDData}
          />
        </div>
      </Container>
    </>
  );
}
