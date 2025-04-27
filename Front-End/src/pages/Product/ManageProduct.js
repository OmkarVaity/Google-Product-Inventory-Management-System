import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button, Col, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { URLS } from "../../routes";
import displayToast from "../../utils/displayToast";
import "./ManageProduct.css";
 
function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [show, setShow] = useState(false);
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  const handleClose = () => {
    setShow(false);
    setCurrentProduct(null);
  };
 
  const handleShow = () => setShow(true);
 
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(URLS.GET_ALL_PRODUCTS);
      setProducts(data);
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };
 
  const deleteProductConfirmation = (product) => {
    setCurrentProduct(product);
    handleShow();
  };
 
  const deleteProduct = async () => {
    try {
      await axios.delete(URLS.DELETE_PRODUCT + currentProduct.id);
      handleClose();
      displayToast({ type: "success", msg: "Product deleted successfully!" });
      fetchProducts();
    } catch (error) {
      console.log(error);
      displayToast({ type: "error", msg: "Oops! Something went wrong" });
    }
  };
 
  return (
    <Container className="container-main">
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col>
          <h3 style={{ fontWeight: 600, color: "#1e293b" }}>Products</h3>
        </Col>
        <Col className="text-end">
          <Link to="/add-product">
            <Button style={{ backgroundColor: "#3b82f6", color: "white", fontWeight: 500 }}>
              + Add Product
            </Button>
          </Link>
        </Col>
      </Row>
 
      <Row>
        <Table responsive hover className="mt-3" id="customers">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const { id, productName, quantity, price = 0 } = product;
 
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{productName}</td>
                  <td>{price}</td>
                  <td>{quantity}</td>
                  <td>
                    <Link to={`/edit-product/?id=${id}`}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => deleteProductConfirmation(product)}
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
          <strong>{currentProduct ? currentProduct.productName : ""}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
 
export default ManageProduct;