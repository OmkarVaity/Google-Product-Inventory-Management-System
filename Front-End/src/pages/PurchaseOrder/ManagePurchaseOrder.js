import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button, Col, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { URLS } from "../../routes";
import displayToast from "../../utils/displayToast";

function ManagePurchaseOrder() {
  const [pos, setPos] = useState([]);
  const [currentPo, setCurrentPo] = useState(null);
  const [currentPo1, setCurrentPo1] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  useEffect(() => {
    fetchPos();
  }, []);

  const fetchPos = async () => {
    try {
      const { status, data } = await axios.get(URLS.GET_ALL_PURCHASE_ORDERS);
      if (status === 200) {
        setPos(data);
      }
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };

  const handleClose = () => {
    setShow(false);
    setCurrentPo(null);
  };

  const handleClose1 = () => {
    setShow1(false);
    setCurrentPo1(null);
  };

  const deletePoConfirmation = (po) => {
    setCurrentPo(po);
    setShow(true);
  };

  const generateInvoiceConfirmation = (po) => {
    setCurrentPo1(po);
    setShow1(true);
  };

  const deletePurchaseOrder = async () => {
    try {
      await axios.delete(URLS.DELETE_PURCHASE_ORDER + currentPo.id);
      handleClose();
      displayToast({
        type: "success",
        msg: "Purchase Order deleted successfully!",
      });
      fetchPos();
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };

  const makePayment = async () => {
    try {
      const url = URLS.GENERATE_INVOICE + currentPo1.id;
      const response = await axios.post(url);
      if (response.status === 200) {
        handleClose1();
        displayToast({ type: "success", msg: "Invoice generated successfully!" });
        fetchPos();
      } else {
        displayToast({ type: "error", msg: "Oops! Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };

  return (
    <Container className="container-main">
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col>
          <h3 style={{ fontWeight: 600, color: "#1e293b" }}>Purchase Orders</h3>
        </Col>
        <Col className="text-end">
          <Link to="/add-purchase-order">
            <Button style={{ backgroundColor: "#3b82f6", color: "white", fontWeight: 500 }}>
              + Add Order
            </Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Table responsive hover className="mt-3" id="customers">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Company Name</th>
              <th>Total Products</th>
              <th>Total Price</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pos.map((item, index) => {
              const {
                id,
                products,
                paymentDueDate,
                paid,
                buyer = {},
                totalAmount,
              } = item;

              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{buyer.companyName || ""}</td>
                  <td>{products.length}</td>
                  <td>{totalAmount}</td>
                  <td>{paymentDueDate}</td>
                  <td>
                    <span style={{ color: paid ? "green" : "red", fontWeight: 500 }}>
                      {paid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td>
                    {paid ? (
                      "-"
                    ) : (
                      <>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => generateInvoiceConfirmation(item)}
                          className="me-2"
                        >
                          Generate Invoice
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deletePoConfirmation(item)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Purchase Order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePurchaseOrder}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Invoice Confirmation Modal */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to generate the invoice and mark the order as paid. Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="info" onClick={makePayment}>
            Yes, Generate
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManagePurchaseOrder;
