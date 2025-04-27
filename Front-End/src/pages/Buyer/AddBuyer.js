import axios from "axios";
import React, { useReducer, useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { URLS } from "../../routes";
import displayToast from "../../utils/displayToast";
import { validateInputField } from "../../utils/validations";
import { useHistory, useLocation } from "react-router";
 
const initialState = {
  ownerName: "",
  companyName: "",
  zipcode: "",
  id: -1,
};
 
const reducer = (state, action) => {
  switch (action.type) {
    case "BUYER_NAME":
      return { ...state, ownerName: action.ownerName };
    case "COMPANY_NAME":
      return { ...state, companyName: action.companyName };
    case "COMPANY_ZIPCODE":
      return { ...state, zipcode: action.zipcode };
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
 
function AddBuyer() {
  const query = useQuery();
  const buyerId = query.get("id");
 
  const [state, dispatch] = useReducer(reducer, initialState);
  const { ownerName, companyName, zipcode, id } = state;
 
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const isPageUpdate = !!buyerId;
    setIsUpdate(isPageUpdate);
 
    if (isPageUpdate) {
      fetchBuyer();
    } else {
      setIsLoading(false);
    }
  }, []);
 
  const fetchBuyer = async () => {
    try {
      const { data } = await axios.get(`${URLS.GET_BUYER_DETAILS}/${buyerId}`);
      dispatch({ type: "UPDATE_ALL_FIELDS", state: data });
    } catch (error) {
      displayToast({ type: "error", msg: error.msg });
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleChange = (type) => (e) => {
    dispatch({ type, [type === "BUYER_NAME" ? "ownerName" : type === "COMPANY_NAME" ? "companyName" : "zipcode"]: e.target.value });
  };
 
  const resetForm = () => dispatch({ type: "RESET" });
 
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
 
    if (
      validateInputField({ field: ownerName, fieldName: "owner name" }) &&
      validateInputField({ field: companyName, fieldName: "company name" }) &&
      validateInputField({ field: zipcode, fieldName: "zipcode" })
    ) {
      const body = { ownerName, companyName, zipcode };
      const url = isUpdate ? URLS.EDIT_BUYER : URLS.ADD_BUYER;
      if (isUpdate) body.id = id;
 
      try {
        const { status } = await axios[isUpdate ? "put" : "post"](url, body);
        if (status === 200) {
          resetForm();
          displayToast({
            type: "success",
            msg: `${isUpdate ? `${ownerName} updated` : "Buyer added"} successfully!`,
          });
          setTimeout(() => history.push("/manage-buyers"), 1000);
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
            {isUpdate ? "Update" : "Add"} Buyer
          </h3>
        </Col>
      </Row>
 
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-4" controlId="formOwnerName">
                  <Form.Label className="fw-semibold">Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={ownerName}
                    onChange={handleChange("BUYER_NAME")}
                    placeholder="Enter buyer name"
                  />
                </Form.Group>
 
                <Form.Group className="mb-4" controlId="formCompanyName">
                  <Form.Label className="fw-semibold">Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={companyName}
                    onChange={handleChange("COMPANY_NAME")}
                    placeholder="Enter company name"
                  />
                </Form.Group>
 
                <Form.Group className="mb-4" controlId="formZipcode">
                  <Form.Label className="fw-semibold">Zipcode</Form.Label>
                  <Form.Control
                    type="text"
                    value={zipcode}
                    onChange={handleChange("COMPANY_ZIPCODE")}
                    placeholder="Enter zipcode"
                  />
                </Form.Group>
 
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="fw-semibold"
                  >
                    {isUpdate ? "Update" : "Save"} Buyer
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
 
export default AddBuyer;