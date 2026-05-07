import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import {
  FaPiggyBank,
  FaMoneyBillWave,
  FaCoins,
  FaHandshake,
} from "react-icons/fa";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [status, setStatus] = useState("ACTIVE");
  const [TotalA, setTotaA] = useState(0);
  const [tra, setUserTra] = useState(0);

  const fetchDashboard = async () => {
    if (!user?.rid) return;
    try {
      const totalRes = await axios.get(`http://localhost:8080/ttl/${user.rid}`);
      setTotaA(totalRes.data?.Total || 0);
      const countRes = await axios.get(
        `http://localhost:8080/count/${user.rid}`,
      );
      setTotalTransactions(countRes.data?.Total || 0);
      setUserTra(countRes.data?.Total || 0);
      const transactionsRes = await axios.get(
        `http://localhost:8080/passbookByid/${user.rid}`,
      );
      setRecentTransactions(transactionsRes.data?.slice(-5).reverse() || []);
      try {
        const statusRes = await axios.get(
          `http://localhost:8080/status/${user.rid}`,
        );
        setStatus(statusRes.data?.status || "ACTIVE");
      } catch {
        setStatus("ACTIVE");
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [user]);

  const shtl = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/close/${user?.rid}`);
      if (res.data.status === "closed_before_maturity") {
        alert("RD Closed Before Maturity");
      } else {
        alert("RD Closed After Maturity");
      }
      alert("Final Amount = ₹ " + res.data.amount);
    } catch (err) {
      console.error("Close error:", err);
    }
  };
  const GetLoan = () => {
    if (tra >= 6) {
      let maxLoan = TotalA * 0.8;
      alert("You are Eligible for Loan");
      alert("Maximum Loan Amount = ₹ " + maxLoan);
    } else {
      alert("Minimum 6 Transactions Required");
    }
  };

  const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px);}
    to { opacity: 1; transform: translateY(0);}
  }
  @keyframes float {
    0% { transform: translateY(0px);}
    50% { transform: translateY(-6px);}
    100% { transform: translateY(0px);}
  }
  `;

  return (
    <>
      <style>{styles}</style>
      <Container
        fluid
        className="p-4"
        style={{
          background: "linear-gradient(135deg,#eef2f3,#dfe9f3)",
          minHeight: "100vh",
          animation: "fadeIn 0.8s ease-in-out",
        }}
      >
        <div
          className="mb-4 text-center"
          style={{ animation: "fadeIn 1s ease-in-out" }}
        >
          <h2>
            Welcome, <span style={{ color: "#007bff" }}>{user?.name}</span>
          </h2>
          <p>Your Financial Dashboard at a Glance</p>
        </div>

        {/* 💳 Cards */}
        <Row className="mb-4 g-4">
          {/* Balance */}
          <Col md={3}>
            <Card
              className="shadow-sm border-0 h-100 text-center"
              style={{
                borderRadius: "18px",
                transition: "0.4s",
                background: "rgba(255,255,255,0.85)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Card.Body>
                <FaPiggyBank
                  size={40}
                  style={{ animation: "float 3s infinite" }}
                />
                <Card.Title>Total Balance</Card.Title>
                <h3>₹ {TotalA}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="shadow-sm border-0 h-100 text-center"
              style={{
                borderRadius: "18px",
                transition: "0.4s",
                background: "rgba(255,255,255,0.85)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Card.Body>
                <FaMoneyBillWave
                  size={40}
                  style={{ animation: "float 3s infinite" }}
                />
                <Card.Title>Transactions</Card.Title>
                <h3>{totalTransactions}</h3>
              </Card.Body>
            </Card>
          </Col>

          {/* Status */}
          <Col md={3}>
            <Card
              className="shadow-sm border-0 h-100 text-center"
              style={{
                borderRadius: "18px",
                transition: "0.4s",
                background: status === "CLOSED" ? "#dc3545" : "#28a745",
                color: "white",
              }}
            >
              <Card.Body>
                <FaCoins size={40} style={{ animation: "float 3s infinite" }} />
                <Card.Title>Status</Card.Title>
                <h3>{status}</h3>
              </Card.Body>
            </Card>
          </Col>

          {/* Actions */}
          <Col md={3}>
            <Card
              className="shadow-sm border-0 h-100 text-center"
              style={{
                borderRadius: "18px",
                background: "rgba(255,255,255,0.85)",
              }}
            >
              <Card.Body>
                <FaHandshake
                  size={40}
                  style={{ animation: "float 3s infinite" }}
                />
                <Card.Title>Quick Actions</Card.Title>

                <Button
                  variant="primary"
                  className="m-1"
                  onClick={shtl}
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  RD Close
                </Button>

                <Button
                  variant="warning"
                  className="m-1"
                  onClick={GetLoan}
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Get Loan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card
          className="shadow-sm"
          style={{ borderRadius: "15px", animation: "fadeIn 1s" }}
        >
          <Card.Header className="bg-primary text-white">
            <h5>Recent Transactions</h5>
          </Card.Header>

          <Card.Body className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>PID</th>
                  <th>RD Amount</th>
                  <th>Fine</th>
                  <th>Late Day</th>
                  <th>Date</th>
                  <th>Flag</th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((tx, index) => (
                    <tr
                      key={index}
                      style={{ transition: "0.3s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f1f1f1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <td>{tx.pid}</td>
                      <td>₹ {tx.rdamt}</td>
                      <td>₹ {tx.fine_amt}</td>
                      <td>{tx.late_day}</td>
                      <td>{tx.rddate}</td>
                      <td>
                        {tx.flag === 0 ? (
                          <span className="text-success">Normal</span>
                        ) : (
                          <span className="text-danger">Late</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No recent transactions
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
