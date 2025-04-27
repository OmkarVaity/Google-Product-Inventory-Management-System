import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { URLS } from "../../routes";
import displayToast from "../../utils/displayToast";
import { validateInputField } from "../../utils/validations";
import { useHistory, useLocation } from "react-router";
 
const initialState = {
  productName: "",
  quantity: 0,
  price: 0,
  id: -1,
};
 
const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_NAME":
      return { ...state, productName: action.productName };
    case "PRODUCT_QUANTITY":
      return { ...state, quantity: action.quantity };
    case "PRODUCT_PRICE":
      return { ...state, price: action.price };
    case "RESET":
      return initialState;
    case "UPDATE_ALL_FIELDS":
      return action.state;
    default:
      return state;
  }
};
 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
 
function AddProduct() {
  const query = useQuery();
  const productId = query.get("id");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { productName, quantity, price, id } = state;
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const isPageUpdate = !!productId;
    setIsUpdate(isPageUpdate);
    if (isPageUpdate) {
      fetchProduct();
    } else {
      setIsLoading(false);
    }
  }, []);
 
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${URLS.GET_PRODUCT_DETAILS}/${productId}`);
      dispatch({ type: "UPDATE_ALL_FIELDS", state: data });
    } catch (error) {
      displayToast({ type: "error", msg: error.msg });
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleChange = (type) => (e) => {
    dispatch({ type, [type === "PRODUCT_NAME" ? "productName" : type === "PRODUCT_QUANTITY" ? "quantity" : "price"]: e.target.value });
  };
 
  const resetForm = () => dispatch({ type: "RESET" });
 
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
 
    if (
      validateInputField({ field: productName, fieldName: "product name" }) &&
      validateInputField({ field: quantity, fieldName: "quantity" }) &&
      validateInputField({ field: price, fieldName: "price" })
    ) {
      const body = { productName, quantity, price, purchaseOrder: [] };
      const url = isUpdate ? URLS.EDIT_PRODUCT : URLS.ADD_PRODUCT;
      if (isUpdate) body.id = id;
 
      try {
        const { status } = await axios[isUpdate ? "put" : "post"](url, body);
        if (status === 200) {
          resetForm();
          displayToast({
            type: "success",
            msg: `${isUpdate ? `${productName} updated` : "Product added"} successfully!`,
          });
          setTimeout(() => history.push("/manage-products"), 1000);
        } else {
          displayToast({ type: "error", msg: "Oops! Something went wrong." });
        }
      } catch (error) {
        console.log(error);
        displayToast({ type: "error", msg: error.msg });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
 
  return (
    <Container className="container-main">
      <Row className="mb-4">
        <Col>
          <h3 className="text-center fw-bold text-primary">
            {isUpdate ? "Update" : "Add"} Product
          </h3>
        </Col>
      </Row>
 
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-4" controlId="formBasicProductName">
                  <Form.Label className="fw-semibold">Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={productName}
                    onChange={handleChange("PRODUCT_NAME")}
                    placeholder="Enter product name"
                  />
                </Form.Group>
 
                <Form.Group className="mb-4" controlId="formBasicQuantity">
                  <Form.Label className="fw-semibold">Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={handleChange("PRODUCT_QUANTITY")}
                    placeholder="Enter quantity"
                  />
                </Form.Group>
 
                <Form.Group className="mb-4" controlId="formBasicPrice">
                  <Form.Label className="fw-semibold">Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={handleChange("PRODUCT_PRICE")}
                    placeholder="Enter price"
                  />
                </Form.Group>
 
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="fw-semibold"
                  >
                    {isUpdate ? "Update" : "Save"} Product
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
 
export default AddProduct;