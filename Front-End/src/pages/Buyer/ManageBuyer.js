import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button, Col, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { URLS } from "../../routes";
import displayToast from "../../utils/displayToast";
import "./ManageBuyers.css";
 
function ManageBuyer() {
  const [buyers, setBuyers] = useState([]);
  const [currentBuyer, setCurrentBuyer] = useState(null);
  const [show, setShow] = useState(false);
 
  const handleClose = () => {
    setShow(false);
    setCurrentBuyer(null);
  };
 
  const handleShow = () => setShow(true);
 
  useEffect(() => {
    fetchBuyers();
  }, []);
 
  const fetchBuyers = async () => {
    try {
      const { data } = await axios.get(URLS.GET_ALL_BUYERS);
      setBuyers(data);
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };
 
  const deleteBuyerConfirmation = (buyer) => {
    setCurrentBuyer(buyer);
    handleShow();
  };
 
  const deleteBuyer = async () => {
    try {
      await axios.delete(URLS.DELETE_BUYER + currentBuyer.id);
      handleClose();
      displayToast({ type: "success", msg: "Buyer deleted successfully!" });
      fetchBuyers();
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };
 
  return (
    <Container className="container-main">
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col>
          <h3 style={{ fontWeight: 600, color: "#1e293b" }}>Buyers</h3>
        </Col>
        <Col className="text-end">
          <Link to="/add-buyer">
            <Button style={{ backgroundColor: "#3b82f6", color: "white", fontWeight: 500 }}>
              + Add Buyer
            </Button>
          </Link>
        </Col>
      </Row>
 
      <Row>
        <Table responsive hover className="mt-3" id="customers">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Owner Name</th>
              <th>Company Name</th>
              <th>Zipcode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => {
              const { id, ownerName, companyName, zipcode } = buyer;
 
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{ownerName}</td>
                  <td>{companyName}</td>
                  <td>{zipcode}</td>
                  <td>
                    <Link to={`/edit-buyer/?id=${id}`}>
                      <Button variant="outline-secondary" size="sm" className="me-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => deleteBuyerConfirmation(buyer)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{currentBuyer ? currentBuyer.ownerName : ""}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteBuyer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
 
export default ManageBuyer;