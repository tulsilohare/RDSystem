import axios from "axios";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import {
  Container,
  Table,
  Card,
  Modal,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import AddPassbookEntry from "./AddPassbook";
export default function RDPassbook() {
  const { user } = useContext(AuthContext);

  const [status, setStatus] = useState("");

  const [data, setData] = useState([]);
  const fetchRDData = async () => {
    if (!user?.rid) return;
    try {
      try {
        // 1️⃣ Passbook entries
        const passbookRes = await axios.get(
          `http://localhost:8080/passbookByid/${user.rid}`,
        );
        setData(passbookRes.data);

        // 2️⃣ RD Close status (ACTIVE / CLOSED) + Final Amount
        const closeRes = await axios.get(
          `http://localhost:8080/close/${user.rid}`,
        );
        setStatus(closeRes.data.userStatus); // <-- UPDATED
        setTotaA(closeRes.data.amount); // final amount from backend
        setUserTra(closeRes.data.months); // total transactions
      } catch (err) {
        console.log(err);
      }

      // 3️⃣ Total transactions
      const getTAmount = () => {
        if (!user?.rid) return;

        axios
          .get(`http://localhost:8080/count/${user.rid}`)
          .then((res) => {
            setUserTra(res.data.Total);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      // 4️⃣ Total amount
      const totalRes = await axios.get(`http://localhost:8080/ttl/${user.rid}`);
      setTotaA(totalRes.data.Total);
    } catch (err) {
      console.log(err);
    }
  };

  // update api
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

  const updateUser = () => {
    axios
      .put("http://localhost:8080/pupdate", editUser)
      .then(() => {
        alert("Passbook Updated Successfully");
        setShowUpdate(false);
        fetchRDData();
        getTotalAmount();
        getTAmount();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const [tra, setUserTra] = useState(0);

  const getTAmount = () => {
    axios
      .get(`http://localhost:8080/count/${user?.rid}`)
      .then((res) => {
        setUserTra(res.data.Total);
        console.log("Total API:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [TotalA, setTotaA] = useState(0);

  const getTotalAmount = () => {
    axios
      .get(`http://localhost:8080/ttl/${user?.rid}`)
      .then((res) => {
        setTotaA(res.data.Total);
        console.log("Total API:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (user?.rid) {
      fetchRDData();
      getTotalAmount();
      getTAmount();
    }
  }, [user]);

  // deletUser api
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/pdelete/${pid}`)
      .then(() => {
        alert("Deleted Successfully");
        fetchRDData();
        getTotalAmount();
        getTAmount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //sattle amount
  const shtl = () => {
    axios
      .get(`http://localhost:8080/close/${rid}`)
      .then((res) => {
        if (res.data.status === "closed_before_maturity") {
          alert("RD Closed Before Maturity");
        } else {
          alert("RD Closed After Maturity");
        }
        alert("Final Amount = ₹ " + res.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GetLoan
  const GetLoan = () => {
    //  let tra=6
    alert("Chack Eligible and Not ");
    if (tra >= 6) {
      let maxLoan = TotalA * 0.8;
      alert("You are Eligible for Loan");
      alert("Maximum Loan Amount = " + maxLoan);
    } else {
      alert("Minimum 6 Transactions Required");
    }
  };

  // Add passbook data
  const [showPassbook, setShowPassbook] = useState(false);
  // view state
  const [showView, setShowView] = useState(false);
  const [viewUser, setViewUser] = useState({});
  const handleView = (user) => {
    setViewUser(user);
    setShowView(true);
  };

  return (
    <>
      {/* update */}
      <Modal show={showUpdate} onHide={() => setShowUpdate(false)} size="mg">
        <Modal.Header closeButton>
          <Modal.Title>Update RD User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Label>RD Amount</Form.Label>
            <Form.Control
              name="rdamt"
              value={editUser.rdamt || ""}
              onChange={handleUpdateChange}
            />
            <Form.Label>RD Date</Form.Label>
            <Form.Control
              name="rddate"
              value={editUser.rddate || ""}
              onChange={handleUpdateChange}
            />
            <Form.Label>Fine Amount</Form.Label>
            <Form.Control
              name="fine_amt"
              value={editUser.fine_amt || ""}
              onChange={handleUpdateChange}
            />
            <Form.Label>Late Day</Form.Label>
            <Form.Control
              name="late_day"
              value={editUser.late_day || ""}
              onChange={handleUpdateChange}
            />
            <Form.Label>Flag</Form.Label>
            <Form.Select
              name="flag"
              value={editUser.flag || ""}
              onChange={handleUpdateChange}
            >
              <option value="">Select Flag</option>
              <option value="0">Normal</option>
              <option value="1">Late</option>
            </Form.Select>

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
      {/* 
view modal */}

      <Modal show={showView} onHide={() => setShowView(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>RD Wise Passbook Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>RID:</strong> {user?.rid}
          </p>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Total Amount:</strong> {TotalA}
          </p>
          <p>
            <strong>Transiction:</strong> {tra}
          </p>

          <p>
            <strong>Status:</strong> {status === "ACTIVE" ? "Active" : "Closed"}
          </p>
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>RID</th>
                <th>PID</th>
                <th>RD Amount</th>
                <th>Fine</th>
                <th>Late Day</th>
                <th>Date</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.rid}</td>
                  <td>{item.pid}</td>
                  <td>₹ {item.rdamt}</td>
                  <td>₹ {item.fine_amt}</td>
                  <td>{item.late_day}</td>
                  <td>{item.rddate}</td>
                  <td>
                    {item.flag === 0 ? (
                      <span className="text-success">Normal</span>
                    ) : (
                      <span className="text-danger">Late</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={shtl}>
            Sattle Amount
          </Button>
          <Button variant="primary" onClick={GetLoan}>
            Get Loan
          </Button>
          <Button variant="secondary" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid>
        <div className="card shadow-sm mt-3 p-3">
          <h1 className="text-center mb-3">PASSBOOK HISTORY</h1>
          <div className="card-body table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>RID</th>
                  <th>PID</th>
                  <th>RD Amount</th>
                  <th>Fine</th>
                  <th>Late Day</th>
                  <th>Date</th>
                  <th>Flag</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.rid}</td>
                    <td>{item.pid}</td>
                    <td>₹ {item.rdamt}</td>
                    <td>₹ {item.fine_amt}</td>
                    <td>{item.late_day}</td>
                    <td>{item.rddate}</td>
                    <td>
                      {item.flag === 0 ? (
                        <span className="text-success">Normal</span>
                      ) : (
                        <span className="text-danger">Late</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {status === "ACTIVE" && (
                          <>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => setShowPassbook(true)}
                            >
                              Add RDPassbook
                            </Button>
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => deleteUser(item.pid)}
                            >
                              Delete
                            </Button>
                          </>
                        )}

                        <Button
                          size="sm"
                          variant="info"
                          onClick={() => handleView(item)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <AddPassbookEntry
              show={showPassbook}
              handleClose={() => setShowPassbook(false)}
              refreshData={fetchRDData}
              rid={user?.rid}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
