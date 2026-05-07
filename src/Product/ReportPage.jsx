import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
} from "react-bootstrap";
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
  }, [user?.rid]);

  const styles = `
  @keyframes fadeIn {
    from {opacity:0; transform: translateY(20px);}
    to {opacity:1; transform: translateY(0);}
  }

  @keyframes zoomIn {
    from {transform: scale(0.9); opacity:0;}
    to {transform: scale(1); opacity:1;}
  }

  .report-header {
    animation: fadeIn 1s ease;
    font-weight: bold;
    color: #2c67d8;
  }

  .report-card {
    border-radius: 15px;
    transition: 0.4s;
    animation: zoomIn 0.8s ease;
  }

  .report-card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  }

  .report-table {
    animation: fadeIn 1s ease;
  }

  .report-table tbody tr {
    transition: 0.3s;
  }

  .report-table tbody tr:hover {
    background: #f5f9ff;
    transform: scale(1.01);
  }

  .report-btn {
    transition: 0.3s;
  }

  .report-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
  `;

  return (
    <>
      <style>{styles}</style>

      <Container fluid className="mt-4">
        <h1 className="text-center mb-4 report-header">RD Passbook Report</h1>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm text-center p-3 report-card">
              <FaFileInvoiceDollar size={40} className="mb-2 text-primary" />
              <h5>Total Amount</h5>
              <h3>₹ {totalAmount}</h3>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm text-center p-3 report-card">
              <FaMoneyBillWave size={40} className="mb-2 text-success" />
              <h5>Total Transactions</h5>
              <h3>{totalTransactions}</h3>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm text-center p-3 report-card">
              <FaChartLine size={40} className="mb-2 text-warning" />
              <h5>Status</h5>
              <h3>
                {totalTransactions >= 12 ? (
                  <Badge bg="success">Matured</Badge>
                ) : (
                  <Badge bg="warning">Active</Badge>
                )}
              </h3>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm p-3 report-card">
          <h4 className="mb-3">Passbook Entries</h4>

          <Table
            striped
            bordered
            hover
            responsive
            className="report-table text-center"
          >
            <thead className="table-dark">
              <tr>
                <th>RID</th>
                <th>PID</th>
                <th>RD Amount</th>
                <th>Fine</th>
                <th>Late Days</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-danger">
                    No Transactions Found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
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
                        <Badge bg="danger">Late</Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          <div className="text-end mt-3">
            <Button
              variant="primary"
              className="report-btn"
              onClick={() => window.print()}
            >
              🖨️ Print Report
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
}
