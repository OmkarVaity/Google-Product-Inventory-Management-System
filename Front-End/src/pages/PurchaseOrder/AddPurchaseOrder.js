import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  FloatingLabel,
  Table,
} from "react-bootstrap";
import { URLS } from "../../routes";
import displayToast from "../../utils/displayToast";
import { validateInputField } from "../../utils/validations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { useHistory, useLocation } from "react-router";

const initialState = {
  selectedProducts: [],
  paymentDate: new Date(),
  id: -1,
  buyerId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, selectedProducts: [...state.selectedProducts, action.product] };
    case "DELETE_PRODUCT":
      return { ...state, selectedProducts: state.selectedProducts.filter((p) => p.id !== action.product.id) };
    case "UPDATE_BUYER":
      return { ...state, buyerId: action.buyerId };
    case "UPDATE_PAYMENT_DATE":
      return { ...state, paymentDate: action.paymentDate };
    case "UPDATE_QUANTITY":
      return { ...state, selectedProducts: action.productList };
    case "UPDATE_ALL_FIELDS":
      return action.state;
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

let isSubmitted = false;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AddPurchaseOrder() {
  const query = useQuery();
  const poId = query.get("id");
  const [productList, setProductList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedProducts, paymentDate, buyerId } = state;
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    let isActive = true;
    isSubmitted = false;
    setIsUpdate(!!poId);
    if (isActive) fetchProducts();
    return () => (isActive = false);
  }, []);

  const fetchProducts = async () => {
    axios
      .get(URLS.GET_ALL_PRODUCTS)
      .then((res) => {
        setProductList(res.data);
        fetchBuyers();
      })
      .catch(() => displayToast({ type: "error", msg: "Error fetching products" }));
  };

  const fetchBuyers = async () => {
    axios
      .get(URLS.GET_ALL_BUYERS)
      .then((res) => {
        setBuyers(res.data);
        if (isUpdate) fetchCurrentPo();
        else setIsLoading(false);
      })
      .catch(() => displayToast({ type: "error", msg: "Error fetching buyers" }));
  };

  const fetchCurrentPo = async () => {
    axios
      .get(`${URLS.GET_PURCHASE_ORDERS_DETAILS}/${poId}`)
      .then((res) => {
        if (res.status === 200) dispatch({ type: "UPDATE_ALL_FIELDS", state: res.data });
        else displayToast({ type: "error", msg: "Error fetching order" });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        displayToast({ type: "error", msg: err.msg });
        setIsLoading(false);
      });
  };

  const handleBuyerChange = (e) => dispatch({ type: "UPDATE_BUYER", buyerId: e.target.value });
  const handleDateChange = (date) => dispatch({ type: "UPDATE_PAYMENT_DATE", paymentDate: date });
  const handleProductChange = (e) => setCurrentProduct(e.target.value);

  const addProduct = () => {
    if (currentProduct) {
      const exists = selectedProducts.some((p) => p.id === parseInt(currentProduct));
      if (exists) {
        displayToast({ type: "error", msg: "Product already added!" });
      } else {
        const product = productList.find((p) => p.id === parseInt(currentProduct));
        dispatch({ type: "ADD_PRODUCT", product });
      }
    } else {
      displayToast({ type: "error", msg: "Please select a product!" });
    }
  };

  const handleQuantityChange = (e, product) => {
    const quantity = e.target.value;
    let updatedList = selectedProducts.map((p) =>
      p.id === product.id
        ? quantity <= p.quantity
          ? { ...p, selectedQuantity: quantity }
          : (displayToast({ type: "error", msg: "Quantity exceeds available" }), p)
        : p
    );
    dispatch({ type: "UPDATE_QUANTITY", productList: updatedList });
  };

  const deleteProduct = (product) => dispatch({ type: "DELETE_PRODUCT", product });

  const submitPo = () => {
    if (isSubmitted) return;

    isSubmitted = true;
    setIsLoading(true);

    if (!validateInputField({ field: buyerId, fieldName: "Buyer" }) || selectedProducts.length === 0) {
      displayToast({ type: "error", msg: "Fill all required fields" });
      setIsLoading(false);
      isSubmitted = false;
      return;
    }

    for (let item of selectedProducts) {
      if (!item.selectedQuantity) {
        displayToast({ type: "error", msg: "Select quantity for each product" });
        setIsLoading(false);
        isSubmitted = false;
        return;
      }
    }

    const buyer = buyers.find((b) => b.id == buyerId);
    const products = selectedProducts.map((item) => ({
      product: item,
      quantity: parseInt(item.selectedQuantity),
    }));

    const payload = {
      buyer,
      paymentDueDate: dayjs(paymentDate).format("MM-DD-YYYY"),
      products,
      totalAmount: 0.0,
      paid: false,
    };

    axios
      .post(URLS.ADD_PURCHASE_ORDERS, payload)
      .then((res) => {
        if (res.status === 200) {
          displayToast({ type: "success", msg: "Order created successfully" });
          dispatch({ type: "RESET" });
          setTimeout(() => history.push("/manage-purchase-order"), 1000);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        displayToast({ type: "error", msg: "Failed to create order" });
        setIsLoading(false);
      });
  };

  let totalQty = 0;
  let totalPrice = 0;
  selectedProducts.forEach((p) => {
    const qty = parseInt(p.selectedQuantity || 0);
    totalQty += qty;
    totalPrice += qty * p.price;
  });

  return (
    <Container className="container-main">
      <Row className="mb-4">
        <Col><h3 className="text-center">{isUpdate ? "Update" : "Add"} Purchase Order</h3></Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col lg={6}>
              <FloatingLabel label="Select Buyer">
                <Form.Select onChange={handleBuyerChange} value={buyerId || ""}>
                  <option disabled value="">Select a Buyer</option>
                  {buyers.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.companyName} - {b.ownerName}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg={6}>
              <Form.Label>Payment Date</Form.Label>
              <DatePicker className="form-control" selected={paymentDate} onChange={handleDateChange} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col lg={5}>
              <FloatingLabel label="Select Product">
                <Form.Select onChange={handleProductChange}>
                  <option disabled selected value="">Select a Product</option>
                  {productList.map((p) => (
                    <option key={p.id} value={p.id}>{p.productName}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg={2}>
              <Button onClick={addProduct} variant="primary" disabled={isLoading}>Add</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {selectedProducts.length > 0 && (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive bordered hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Available Quantity</th>
                  <th>Order Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((p, idx) => (
                  <tr key={p.id}>
                    <td>{idx + 1}</td>
                    <td>{p.productName}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        value={p.selectedQuantity || ""}
                        onChange={(e) => handleQuantityChange(e, p)}
                      />
                    </td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => deleteProduct(p)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-light">
                <tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  <td colSpan="2"><strong>{totalPrice}</strong></td>
                  <td>
                    <Form.Control value={totalQty} readOnly />
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
          </Card.Body>
        </Card>
      )}

      <Row className="mt-4">
        <Col className="text-center">
          <Button onClick={submitPo} variant="success" disabled={isLoading}>
            {isUpdate ? "Update Order" : "Submit Order"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddPurchaseOrder;
