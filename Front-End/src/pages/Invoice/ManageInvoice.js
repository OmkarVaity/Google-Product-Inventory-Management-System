import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { URLS } from "../../routes";
import displayToast from "../../utils/displayToast";

function ManageInvoice() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data } = await axios.get(URLS.GET_ALL_INVOICE);
      setInvoices(data);
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };

  return (
    <Container className="container-main">
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col>
          <h3 style={{ fontWeight: 600, color: "#1e293b" }}>Buyers Invoices</h3>
        </Col>
      </Row>

      <Row>
        <Table responsive hover className="mt-3" id="customers">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Company Name</th>
              <th>Total Products</th>
              <th>Total Quantity</th>
              <th>Total Price</th>
              <th>Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((item, index) => {
              const { id, purchaseOrder, paymentDate } = item;
              const { products, buyer = {}, totalAmount } = purchaseOrder;
              const companyName = buyer?.companyName || "";
              const totalQty = products.reduce((acc, p) => acc + p.quantity, 0);

              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{companyName}</td>
                  <td>{products.length}</td>
                  <td>{totalQty}</td>
                  <td>{totalAmount}</td>
                  <td>{paymentDate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default ManageInvoice;
