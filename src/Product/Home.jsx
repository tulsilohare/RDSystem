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

export default function FinanceHome() {
  const { user } = useContext(AuthContext);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [status, setStatus] = useState("");
  const [TotalA, setTotaA] = useState(0);
  const [tra, setUserTra] = useState(0);

  const fetchDashboard = async () => {
    if (!user?.rid) return;

    try {
      // RD Close summary
      const res = await axios.get(`http://localhost:8080/close/${user.rid}`);
      setTotalBalance(res.data.amount);
      setStatus(res.data.userStatus || "ACTIVE");
      setTotalTransactions(res.data.months || 0);

      // Recent Transactions
      const transactionsRes = await axios.get(
        `http://localhost:8080/passbookByid/${user.rid}`,
      );
      setRecentTransactions(transactionsRes.data.slice(-5).reverse());

      // Total Amount
      const totalRes = await axios.get(`http://localhost:8080/ttl/${user.rid}`);
      setTotaA(totalRes.data.Total);

      // Transaction Count
      const countRes = await axios.get(
        `http://localhost:8080/count/${user.rid}`,
      );
      setUserTra(countRes.data.Total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [user]);

  // RD Close
  const shtl = () => {
    axios
      .get(`http://localhost:8080/close/${user?.rid}`)
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

  // Loan Eligibility
  const GetLoan = () => {
    if (tra >= 6) {
      let maxLoan = TotalA * 0.8;

      alert("You are Eligible for Loan");
      alert("Maximum Loan Amount = ₹ " + maxLoan);
    } else {
      alert("Minimum 6 Transactions Required");
    }
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}
    >
      <div className="mb-4 text-center">
        <h2>
          Welcome, <span style={{ color: "#007bff" }}>{user?.name}</span>
        </h2>
        <p>Your Financial Dashboard at a Glance</p>
      </div>

      {/* Dashboard Cards */}
      <Row className="mb-4 g-4">
        <Col md={3}>
          <Card className="shadow-sm border-0 h-100 text-center">
            <Card.Body>
              <FaPiggyBank size={40} color="#17a2b8" />
              <Card.Title className="mt-2">Total Balance</Card.Title>
              <h3>₹ {TotalA}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 h-100 text-center">
            <Card.Body>
              <FaMoneyBillWave size={40} color="#28a745" />
              <Card.Title className="mt-2">Transactions</Card.Title>
              <h3>{tra}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card
            className={`shadow-sm border-0 h-100 text-center ${status === "CLOSED" ? "bg-danger text-white" : "bg-success text-white"}`}
          >
            <Card.Body>
              <FaCoins size={40} />
              <Card.Title className="mt-2">Status</Card.Title>
              <h3>{status}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 h-100 text-center">
            <Card.Body>
              <FaHandshake size={40} color="#ffc107" />
              <Card.Title className="mt-2">Quick Actions</Card.Title>

              <Button variant="primary" className="m-1" onClick={shtl}>
                RD Close
              </Button>

              <Button variant="warning" className="m-1" onClick={GetLoan}>
                Get Loan
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Transactions Table */}

      <Card className="shadow-sm">
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
                  <tr key={index}>
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
  );
}
