// Axios is for HTTP requests
import axios from "axios";

// React Bootstrap UI components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// React hooks
import { useState, useEffect } from "react";

// Main component
export default function API() {
  // ================= ADD PASSBOOK MODAL STATE =================
  const [show, setShow] = useState(false); // controls Add modal visibility
  const handleClose = () => setShow(false); // close modal
  const handleShow = () => setShow(true); // open modal

  // ================= DATA STATE =================
  const [data, SetData] = useState([]); // stores passbook entries from API

  // ================= ADD PASSBOOK FORM STATE =================
  const [rid, Setrid] = useState(""); // RD user id
  const [rddate, SetRDdate] = useState(""); // RD date
  const [rdamt, SetRDamt] = useState(""); // RD amount
  const [famt, Setfamt] = useState(""); // fixed amount
  const [lday, Setlday] = useState(""); // late day
  const [flag, Setflag] = useState(""); // status flag

  // ================= ADD FORM HANDLERS =================
  let hndlrid = (e) => Setrid(e.target.value); // update rid
  let hndlrddt = (e) => SetRDdate(e.target.value); // update rddate
  let hndlrdamt = (e) => SetRDamt(e.target.value); // update rdamt
  let hndlfamt = (e) => Setfamt(e.target.value); // update famt
  let hndllday = (e) => Setlday(e.target.value); // update lday
  let hndlflag = (e) => Setflag(e.target.value); // update flag

  // ================= UPDATE FORM STATE =================
  const [ushow, setuShow] = useState(false); // Update modal visibility
  const uhandleClose = () => setuShow(false);
  const uhandleShow = () => setuShow(true);

  const [pid, Setpid] = useState(""); // Passbook entry id

  const [urid, Seturid] = useState(""); // RD user id for update
  const [urddate, SetuRDdate] = useState(""); // RD date for update
  const [urdamt, SetuRDamt] = useState(""); // RD amount for update
  const [ufamt, Setufamt] = useState(""); // fixedzz amount for update
  const [ulday, Setulday] = useState(""); // late day for update
  const [uflag, Setuflag] = useState(""); // flag for update

  // ================= UPDATE FORM HANDLERS =================
  let hndlpid = (e) => Setpid(e.target.value);
  let hndlurid = (e) => Seturid(e.target.value);
  let hndlurddt = (e) => SetuRDdate(e.target.value);
  let hndlurdamt = (e) => SetuRDamt(e.target.value);
  let hndlufamt = (e) => Setufamt(e.target.value);
  let hndlulday = (e) => Setulday(e.target.value);
  let hndluflag = (e) => Setuflag(e.target.value);

  const getdata = (rid, pid, famt, flag, lday, rddate, rdamt) => {
    // This function fills the update form with selected row data
    // but the order of arguments is confusing: pid should be first.
    Setpid(pid); // set passbook id
    Seturid(rid); // set user id
    Setufamt(famt); // set fixed amount
    Setuflag(flag); // set flag
    Setulday(lday); // set late day
    SetuRDdate(rddate); // set RD date
    SetuRDamt(rdamt); // set RD amount
  };

  const api = () => {
    // Fetch all passbook entries
    axios.get("http://localhost:8080/puser").then((res) => {
      console.log(res.data);
      SetData(res.data);
    });
  };

  const addPass = () => {
    const dt = {
      rid,
      rdamt,
      rddate,
      famt,
      lday,
      flag,
    };
    // POST new entry
    axios.post("http://localhost:8080/psave", dt).then(() => {
      alert("Success");
      api(); // refresh table
      setShow(false); // close modal
    });
  };
  const updtpass = () => {
    const dt = {
      pid,
      rid: urid,
      rdamt: urdamt,
      rddate: urddate,
      famt: ufamt,
      lday: ulday,
      flag: uflag,
    };

    axios
      .put("http://localhost:8080/pupdt", dt)
      .then(() => {
        alert("Update Successful!");
        api(); // refresh table
        setuShow(false); // close update modal
      })
      .catch(() => {
        alert("Update failed");
      });
  };

  const del = (pid) => {
    if (!window.confirm("Delete this record?")) return;

    axios
      .delete(`http://localhost:8080/pdlt/${pid}`)
      .then((res) => {
        alert(res.data);
        api(); // refresh table
      })
      .catch((err) => {
        console.error(err.response?.data || err);
        alert(err.response?.data || "Something went wrong!");
      });
  };
  useEffect(() => {
    api(); // fetch all passbook entries when component mounts
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className=" bi bi-person "></i> ADD Passbook entry
      </Button>
      <br />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD Passbook entries</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="sm"
            readOnly={true}
            value={rid}
            onChange={hndlrid}
            type="number"
            placeholder="Rid"
          />
          <br />
          <Form.Control
            type="number"
            size="sm"
            value={rdamt}
            onChange={hndlrdamt}
            placeholder="Enter a RD Amount:"
          />
          <br />
          <Form.Control
            type="date"
            size="sm"
            value={rddate}
            onChange={hndlrddt}
            placeholder="Enter a RD Date:"
          />
          <br />
          <Form.Control
            type="number"
            size="sm"
            value={famt}
            onChange={hndlfamt}
            placeholder="Fix Amount"
          />
          <br />
          <Form.Control
            type="number"
            size="sm"
            value={lday}
            onChange={hndllday}
            placeholder="Late Day"
          />
          <br />
          <Form.Control
            type="text"
            size="sm"
            value={flag}
            onChange={hndlflag}
            placeholder="flag"
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPass}>
            Add Passbook
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={ushow} onHide={uhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Passbook entries</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={pid}
            size="sm"
            onChange={hndlpid}
            type="number"
            placeholder="Pid"
          />
          <br />
          <Form.Control
            value={urid}
            size="sm"
            onChange={hndlurid}
            type="number"
            placeholder="Rid"
          />
          <br />
          <Form.Control
            type="number"
            size="sm"
            value={urdamt}
            onChange={hndlurdamt}
            placeholder="Enter a RD Amount:"
          />
          <br />
          <Form.Control
            type="date"
            size="sm"
            value={urddate}
            onChange={hndlurddt}
            placeholder="Enter a RD Date:"
          />
          <br />
          <Form.Control
            type="number"
            size="sm"
            value={ufamt}
            onChange={hndlufamt}
            placeholder="Fine Amount"
          />
          <br />
          <Form.Control
            type="number"
            size="sm"
            value={ulday}
            onChange={hndlulday}
            placeholder="Late Day"
          />
          <br />
          <Form.Control
            type="text"
            size="sm"
            value={uflag}
            onChange={hndluflag}
            placeholder="flag"
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={uhandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updtpass}>
            <i className="bi bi-save"></i>Update Change
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table table-dark">
        <thead>
          <tr>
            <td scope="col">pid</td>
            <td scope="col">rid</td>
            <td scope="col">rdamt</td>
            <td scope="col">rddate</td>
            <td scope="col">famt</td>
            <td scope="col">lday</td>
            <td scope="col">flag</td>
            <td scope="col">Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.pid}>
              <td>{item.pid}</td>
              <td>{item.rid}</td>
              <td>{item.rdamt}</td>
              <td>{item.rddate}</td>
              <td>{item.famt}</td>
              <td>{item.lday}</td>
              <td>{item.flag}</td>

              <Button
                title="Delete RD user"
                variant="danger"
                onClick={() => del(item.pid)}
              >
                <i className="bi bi-trash"></i>
              </Button>
              <Button
                title="Update Passbook user"
                variant="warning"
                onClick={() => {
                  getdata(
                    item.rid,
                    item.pid,
                    item.famt,
                    item.flag,
                    item.lday,
                    item.rddate,
                    item.rdamt,
                  );
                  uhandleShow(); // show update modal
                }}
              >
                <i className="bi bi-pencil-square"></i>
              </Button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
