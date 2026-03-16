import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import {
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

export default function ReportPage() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  // Fetch RD passbook data
  const fetchReportData = async () => {
    try {
      if (!user?.rid) return;

      const passbookRes = await axios.get(
        `http://localhost:8080/passbookByid/${user.rid}`,
      );
      setData(passbookRes.data);

      const totalRes = await axios.get(`http://localhost:8080/ttl/${user.rid}`);
      setTotalAmount(totalRes.data.Total);

      const countRes = await axios.get(
        `http://localhost:8080/count/${user.rid}`,
      );
      setTotalTransactions(countRes.data.Total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <Container fluid className="mt-4">
      <h1 className="text-center mb-4">RD Passbook Report</h1>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <FaFileInvoiceDollar size={40} className="mb-2 text-primary" />
            <h5>Total Amount</h5>
            <h3>₹ {totalAmount}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <FaMoneyBillWave size={40} className="mb-2 text-success" />
            <h5>Total Transactions</h5>
            <h3>{totalTransactions}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <FaChartLine size={40} className="mb-2 text-warning" />
            <h5>Status</h5>
            <h3>{totalTransactions >= 12 ? "Matured" : "Active"}</h3>
          </Card>
        </Col>
      </Row>

      {/* Passbook Table */}
      <Card className="shadow-sm p-3">
        <h4 className="mb-3">Passbook Entries</h4>
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>RID</th>
              <th>PID</th>
              <th>RD Amount</th>
              <th>Fine</th>
              <th>Late Days</th>
              <th>Date</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx}>
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
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="text-end mt-3">
          <Button variant="primary" onClick={() => window.print()}>
            Print Report
          </Button>
        </div>
      </Card>
    </Container>
  );
}
