// Axios is used to make HTTP requests (GET, POST, PUT, DELETE)
import axios from "axios";

// React Bootstrap components for UI
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// React hooks
import { useEffect, useState } from "react";
import Home from "./Home";
// import API from "./API";

// Main component
export default function Product() {
  // ================= ADD USER MODAL STATE =================

  // Controls visibility of Add User modal
  const [show, setShow] = useState(false);

  // Close modal
  const handleClose = () => setShow(false);

  // Open modal
  const handleShow = () => setShow(true);

  // Stores list of users fetched from backend
  const [data, SetData] = useState([]);

  // ================= ADD USER FORM STATES =================

  // Individual form fields
  const [name, SetName] = useState("");
  const [addr, SetAddress] = useState("");
  const [dob, SetDOB] = useState("");
  const [gender, SetGender] = useState("");
  const [rddate, SetRDdate] = useState("");
  const [rdamt, SetRDamt] = useState("");
  const [accupation, SetAccupation] = useState("");
  const [acno, SetAccountno] = useState("");
  const [adharno, SetAdharNo] = useState("");
  const [panno, SetPanno] = useState("");
  const [nname, SetNname] = useState("");
  const [naddr, SetNAddress] = useState("");
  const [nadharno, SetNAdharno] = useState("");
  const [npanno, SetNPanno] = useState("");
  const [agree, SetAgree] = useState("");

  // ================= ADD USER INPUT HANDLERS =================

  // Each handler updates state when user types
  let hndlname = (e) => SetName(e.target.value);
  let hndladdr = (e) => SetAddress(e.target.value);
  let hndldob = (e) => SetDOB(e.target.value);
  let hndlgen = (e) => SetGender(e.target.value);
  let hndlrddt = (e) => SetRDdate(e.target.value);
  let hndlrdamt = (e) => SetRDamt(e.target.value);
  let hndlaccup = (e) => SetAccupation(e.target.value);
  let hndlacno = (e) => SetAccountno(e.target.value);
  let hndladharno = (e) => SetAdharNo(e.target.value);
  let hndlpanno = (e) => SetPanno(e.target.value);
  let hndlnname = (e) => SetNname(e.target.value);
  let hndlnaddr = (e) => SetNAddress(e.target.value);
  let hndlnadharno = (e) => SetNAdharno(e.target.value);
  let hndlnpanno = (e) => SetNPanno(e.target.value);

  // Checkbox uses `checked` instead of `value`
  let hndlagree = (e) => SetAgree(e.target.checked);

  // ================= UPDATE USER MODAL STATE =================

  // Controls visibility of Update modal
  const [ushow, setuShow] = useState(false);

  const uhandleClose = () => setuShow(false);
  const uhandleShow = () => setuShow(true);

  // ================= UPDATE USER STATES =================

  const [rid, Setrid] = useState("");
  const [uname, SetuName] = useState("");
  const [uaddr, SetuAddress] = useState("");
  const [udob, SetuDOB] = useState("");
  const [ugender, SetuGender] = useState("");
  const [urddate, SetuRDdate] = useState("");
  const [urdamt, SetuRDamt] = useState("");
  const [uaccupation, SetuAccupation] = useState("");
  const [uacno, SetuAccountno] = useState("");
  const [uadharno, SetuAdharNo] = useState("");
  const [upanno, SetuPanno] = useState("");
  const [unname, SetuNname] = useState("");
  const [unaddr, SetuNAddress] = useState("");
  const [unadharno, SetuNAdharno] = useState("");
  const [unpanno, SetuNPanno] = useState("");
  const [uagree, SetuAgree] = useState("false");

  // ================= UPDATE FORM HANDLERS =================

  let uhndlrid = (e) => Setrid(e.target.value);
  let uhndlname = (e) => SetuName(e.target.value);
  let uhndladdr = (e) => SetuAddress(e.target.value);
  let uhndldob = (e) => SetuDOB(e.target.value);
  let uhndlgen = (e) => SetuGender(e.target.value);
  let uhndlrddt = (e) => SetuRDdate(e.target.value);
  let uhndlrdamt = (e) => SetuRDamt(e.target.value);
  let uhndlaccup = (e) => SetuAccupation(e.target.value);
  let uhndlacno = (e) => SetuAccountno(e.target.value);
  let uhndladharno = (e) => SetuAdharNo(e.target.value);
  let uhndlpanno = (e) => SetuPanno(e.target.value);
  let uhndlnname = (e) => SetuNname(e.target.value);
  let uhndlnaddr = (e) => SetuNAddress(e.target.value);
  let uhndlnadharno = (e) => SetuNAdharno(e.target.value);
  let uhndlnpanno = (e) => SetuNPanno(e.target.value);
  let uhndlagree = (e) => SetuAgree(e.target.checked);

  // ================= VIEW USER MODAL STATE =================
  const [vshow, setvShow] = useState(false);
  const vhandleClose = () => setvShow(false);
  const vhandleShow = () => setvShow(true);

  // Store selected row data for VIEW
  const [viewData, setViewData] = useState({});

  // ================= LOAD DATA INTO UPDATE FORM =================

  // This function fills update modal with selected row data
  const getdata = (
    rid,
    name,
    addr,
    dob,
    gender,
    rddate,
    rdamt,
    accupation,
    acno,
    adharno,
    panno,
    nname,
    naddr,
    nadharno,
    npanno,
    agree,
  ) => {
    Setrid(rid);
    SetuName(name);
    SetuAddress(addr);
    SetuDOB(dob);
    SetuGender(gender);
    SetuRDdate(rddate);
    SetuRDamt(rdamt);
    SetuAccupation(accupation);
    SetuAccountno(acno);
    SetuAdharNo(adharno);
    SetuPanno(panno);
    SetuNname(nname);
    SetuNAddress(naddr);
    SetuNAdharno(nadharno);
    SetuNPanno(npanno);
    SetuAgree(Boolean(agree));
  };

  // ================= FETCH DATA =================

  // Get all users from backend
  let api = () => {
    axios.get("http://localhost:8080/rduser").then((res) => {
      // SetData(res.data);
      //Sort data in ascending order by rid (ID)
      const sortedData = res.data.sort((a, b) => a.rid - b.rid);

      //Set sorted data to state
      SetData(sortedData);
    });
  };

  // ================= ADD USER =================

  let addUser = () => {
    const dt = {
      name,
      addr,
      dob,
      gender,
      rddate,
      rdamt,
      accupation,
      acno,
      adharno,
      panno,
      nname,
      naddr,
      nadharno,
      npanno,
      agree,
    };

    axios.post("http://localhost:8080/save", dt).then(() => {
      alert("Success");
      api(); // refresh table
      setShow(false); // close modal
    });
  };

  // ================= UPDATE USER =================

  let updtuser = () => {
    const dt = {
      rid,
      name: uname,
      addr: uaddr,
      dob: udob,
      gender: ugender,
      rddate: urddate,
      rdamt: urdamt,
      accupation: uaccupation,
      acno: uacno,
      adharno: uadharno,
      panno: upanno,
      nname: unname,
      naddr: unaddr,
      nadharno: unadharno,
      npanno: unpanno,
      agree: Boolean(uagree),
    };

    axios.put("http://localhost:8080/updtp", dt).then(() => {
      alert("Update Success");
      api();
      setuShow(false);
    });
  };

  // ================= DELETE USER =================

  let del = (rid) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    axios.delete(`http://localhost:8080/del/${rid}`).then(() => {
      alert("Delete Success");
      api();
    });
  };

  // ================= LOAD DATA ON PAGE LOAD =================

  useEffect(() => {
    api();
  }, []);

  // ================= JSX UI =================
  return (
    <>
      {/* UI code continues... */}
      <Button variant="primary" onClick={handleShow}>
        Add New User <i className="bi bi-person-plus"></i>
      </Button>
      <br />
      {/* save */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={name}
            onChange={hndlname}
            placeholder="Enter a Name:"
          />
          <br />
          <Form.Control
            type="text"
            value={addr}
            onChange={hndladdr}
            placeholder="Enter a Address:"
          />
          <br />
          <Form.Control
            type="date"
            value={dob}
            onChange={hndldob}
            placeholder="Enter a Date Of Birth:"
          />
          <br />
          <Form.Control
            type="text"
            value={gender}
            onChange={hndlgen}
            placeholder="Enter a Gender:"
          />
          <br />
          <Form.Control
            type="date"
            value={rddate}
            onChange={hndlrddt}
            placeholder="Enter a RD Date:"
          />
          <br />
          <Form.Control
            type="number"
            value={rdamt}
            onChange={hndlrdamt}
            placeholder="Enter a RD Amount:"
          />
          <br />
          <Form.Control
            type="text"
            value={accupation}
            onChange={hndlaccup}
            placeholder="Enter a Accupation:"
          />
          <br />
          <Form.Control
            type="number"
            value={acno}
            onChange={hndlacno}
            placeholder="Enter a Acount Number:"
          />
          <br />
          <Form.Control
            type="number"
            value={adharno}
            onChange={hndladharno}
            placeholder="Enter a Adhar Card Number:"
          />
          <br />
          <Form.Control
            type="number"
            value={panno}
            onChange={hndlpanno}
            placeholder="Enter a PAN Card Number:"
          />
          <br />
          <Form.Control
            type="text"
            value={nname}
            onChange={hndlnname}
            placeholder="Enter a Nomination Name:"
          />
          <br />
          <Form.Control
            type="text"
            value={naddr}
            onChange={hndlnaddr}
            placeholder="Enter a Nomination Address:"
          />
          <br />
          <Form.Control
            type="number"
            value={nadharno}
            onChange={hndlnadharno}
            placeholder="Enter a Nomination Aadhar No.:"
          />
          <br />
          <Form.Control
            type="number"
            value={npanno}
            onChange={hndlnpanno}
            placeholder="Enter a Nomination PAN No.:"
          />
          <br />
          <Form.Check
            type="checkbox"
            label="Agree"
            checked={agree}
            onChange={hndlagree}
            placeholder="Enter a Agree:"
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            <i className="bi bi-save"></i> Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* update */}
      <Modal show={ushow} onHide={uhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            readOnly={true}
            value={rid}
            onChange={uhndlrid}
            placeholder="Enter a rid:"
          />
          <Form.Control
            type="text"
            value={uname}
            onChange={uhndlname}
            placeholder="Enter a Name:"
          />
          <br />
          <Form.Control
            type="text"
            value={uaddr}
            onChange={uhndladdr}
            placeholder="Enter a Address:"
          />
          <br />
          <Form.Control
            type="date"
            value={udob}
            onChange={uhndldob}
            placeholder="Enter a Date Of Birth:"
          />
          <br />
          <Form.Control
            type="text"
            value={ugender}
            onChange={uhndlgen}
            placeholder="Enter a Gender:"
          />
          <br />
          <Form.Control
            type="date"
            value={urddate}
            onChange={uhndlrddt}
            placeholder="Enter a RD Date:"
          />
          <br />
          <Form.Control
            type="number"
            value={urdamt}
            onChange={uhndlrdamt}
            placeholder="Enter a RD Amount:"
          />
          <br />
          <Form.Control
            type="text"
            value={uaccupation}
            onChange={uhndlaccup}
            placeholder="Enter a Accupation:"
          />
          <br />
          <Form.Control
            type="number"
            value={uacno}
            onChange={uhndlacno}
            placeholder="Enter a Acount Number:"
          />
          <br />
          <Form.Control
            type="number"
            value={uadharno}
            onChange={uhndladharno}
            placeholder="Enter a Adhar Card Number:"
          />
          <br />
          <Form.Control
            type="number"
            value={upanno}
            onChange={uhndlpanno}
            placeholder="Enter a PAN Card Number:"
          />
          <br />
          <Form.Control
            type="text"
            value={unname}
            onChange={uhndlnname}
            placeholder="Enter a Nomination Name:"
          />
          <br />
          <Form.Control
            type="text"
            value={unaddr}
            onChange={uhndlnaddr}
            placeholder="Enter a Nomination Address:"
          />
          <br />
          <Form.Control
            type="number"
            value={unadharno}
            onChange={uhndlnadharno}
            placeholder="Enter a Nomination Aadhar No.:"
          />
          <br />
          <Form.Control
            type="number"
            value={unpanno}
            onChange={uhndlnpanno}
            placeholder="Enter a Nomination PAN No.:"
          />
          <br />
          <Form.Check
            type="checkbox"
            label="Agree"
            onChange={uhndlagree}
            checked={uagree}
            placeholder="Enter a Agree:"
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={uhandleClose}>
            Close
            <i className="bi bi-x"></i>
          </Button>
          <Button variant="primary" onClick={updtuser}>
            <i className="bi bi-save"></i> Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ================= VIEW USER MODAL ================= */}
      <Modal show={vshow} onHide={vhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>RD users</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* RID */}
          <p>
            <b>RID:</b> {viewData.rid}
          </p>
          {/* NAME */}
          <p>
            <b>Name:</b> {viewData.name}
          </p>
          {/* TOTAL AMOUNT */}
          <p>
            <b>Total Amount:</b> {viewData.rdamt}
          </p>
          <Home />;
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={vhandleClose}>
            <Button variant="secondary">Close</Button>
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">DOB</th>
            <th scope="col">Gender</th>
            <th scope="col">RDdate</th>
            <th scope="col">RDamount</th>
            <th scope="col">Accupation</th>
            <th scope="col">AccountNo</th>
            <th scope="col">AdharCardNo</th>
            <th scope="col">PanCardNo</th>
            <th scope="col">NName</th>
            <th scope="col">Naddress</th>
            <th scope="col">NAdharCardNo</th>
            <th scope="col">NPancardNo</th>
            <th scope="col">Agreee</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.addr !== null)
            .map((item) => {
              return (
                <tr key={item.rid}>
                  <td>{item.rid}</td>
                  <td>{item.name}</td>
                  <td>{item.addr}</td>
                  <td>{item.dob}</td>
                  <td>{item.gender}</td>
                  <td>{item.rddate}</td>
                  <td>{item.rdamt}</td>
                  <td>{item.accupation}</td>
                  <td>{item.acno}</td>
                  <td>{item.adharno}</td>
                  <td>{item.panno}</td>
                  <td>{item.nname}</td>
                  <td>{item.naddr}</td>
                  <td>{item.nadharno}</td>
                  <td>{item.npanno}</td>
                  <td>{item.agree}</td>

                  <Button variant="danger" onClick={() => del(item.rid)}>
                    <i className="bi bi-trash"></i>
                  </Button>

                  <Button
                    variant="warning"
                    onClick={() => {
                      getdata(
                        item.rid,
                        item.name,
                        item.addr,
                        item.dob,
                        item.gender,
                        item.rddate,
                        item.rdamt,
                        item.accupation,
                        item.acno,
                        item.adharno,
                        item.panno,
                        item.nname,
                        item.naddr,
                        item.nadharno,
                        item.npanno,
                        item.agree,
                      );
                      uhandleShow();
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>

                  <Button
                    variant="info"
                    onClick={() => {
                      setViewData(item);
                      vhandleShow();
                    }}
                  >
                    <i className="bi bi-eye"></i>
                  </Button>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Button variant="outline-info">PassBook</Button>
      <Button variant="outline-success">close</Button>
    </>
  );
}
