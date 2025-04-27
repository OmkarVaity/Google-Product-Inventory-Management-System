import axios from 'axios';
import React, {useReducer, useState, useEffect, useContext} from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { URLS } from '../../routes';
import displayToast from '../../utils/displayToast';
import { validateInputField } from '../../utils/validations';
import { useHistory, useLocation } from 'react-router';
import { AuthContext } from '../../context/Auth';

const initialState = {
    fullName: '',
    designation : "",
    username : "",
    salary : "",
    dob : "",
    rating : "",
    password : "",
    id : -1
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'EMPLOYEE_NAME':
            return {
                ...state,
                fullName: action.fullName
            };

        case 'USER_NAME':
            return {
                ...state,
                username: action.username
            };

        case 'EMPLOYEE_DESIGNATION':
            return {
                ...state,
                designation: action.designation
            };

        case 'EMPLOYEE_SALARY':
                return {
                    ...state,
                    salary: action.salary
        };

        case 'EMPLOYEE_DOB':
                return {
                    ...state,
                    dob: action.dob
        }; 
            
        case 'EMPLOYEE_RATING':
                return {
                    ...state,
                    rating: action.rating
        };

        case 'EMPLOYEE_PASSWORD':
                return {
                    ...state,
                    password: action.password
        };

        case 'RESET':
            return initialState;

        case 'UPDATE_ALL_FIELDS':
            return action.state;    

        default:
            return state;
    }
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function AddEmployee() {
    
    let query = useQuery();
    const employeeId = query.get("id");
    const [state, dispatch] = useReducer(reducer, initialState);
    const {fullName, username, salary, dob, rating, designation, id, password} = state;
    const history = useHistory();
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {userData} = useContext(AuthContext);

    useEffect(() => {
        let isActive = true;
        let isPageUpdate = false;

        if(employeeId){
            isPageUpdate = true;
        }
        setIsUpdate(isPageUpdate);

        if(isActive && isPageUpdate) {
            setIsLoading(true);
            fetchEmployee();
        }else{
            setIsLoading(false);
        }
        return () => {
            isActive = false;
        }
    }, []);

    const fetchEmployee = async () => {
        const url  = `${URLS.GET_EMPLOYEE_DETAILS}/${employeeId}`;

        axios.get(url)
              .then(function (response) {
                setIsLoading(false);
                dispatch({type: 'UPDATE_ALL_FIELDS', state: response.data});
              })
              .catch(function (error) {
                  
                console.log(error);
                displayToast({type : "error", msg : error.msg});
              });
    }

    const handleFullNameChange = (event) => {
        dispatch({type: 'EMPLOYEE_NAME', fullName: event.target.value});
    }

    const handleUserNameChange = (event) => {
        dispatch({type: 'USER_NAME', username: event.target.value});
    }

    const handlePasswordChange = (event) => {
        dispatch({type: 'EMPLOYEE_PASSWORD', password: event.target.value});
    }
    
    const handleSalaryChange = (event) => {
        dispatch({type: 'EMPLOYEE_SALARY', salary: event.target.value});
    }

    const handleRatingChange = (event) => {
        dispatch({type: 'EMPLOYEE_RATING', rating: event.target.value});
    }

    const handleDesignationChange = (event) => {
        dispatch({type: 'EMPLOYEE_DESIGNATION', designation: event.target.value});
    }
    
    const handleDobChange = (event) => {
        dispatch({type: 'EMPLOYEE_DOB', dob: event.target.value});
    };

    const resetForm = () => {
        dispatch({
            type : 'RESET'
        });
    }

    const submitForm = (e) =>{
        e.preventDefault();
        setIsLoading(true);

        if (validateInputField({field : fullName, fieldName : "full name"}) && 
            validateInputField({field : username, fieldName : "user name"}) &&
            validateInputField({field : salary, fieldName : "salary"}) &&
            validateInputField({field : dob, fieldName : "dob"}) &&
            validateInputField({field : designation, fieldName : "designation"}) &&
            validateInputField({field : password, fieldName : "password"})) {
            const body = {fullName, username, salary, dob, rating, designation, id, password, userId : userData.id};
            const url = isUpdate ? URLS.EDIT_EMPLOYEE : URLS.ADD_EMPLOYEE;
            
            if(isUpdate){
                body.id = id;
            };
            
            axios[isUpdate ? "put" : "post"](url, body)
              .then(function (response) {
                const {status} = response;
                if(status === 200){
                    resetForm();
                    displayToast({type : "success", msg : `${isUpdate ? fullName + ' updated' : 'Employee added'} successfully!`});
                    setIsLoading(false);
                    setTimeout(() => {
                        history.push("/manage-employees");
                    }, 1000);
                }else{
                    displayToast({type : "error", msg : "Oops! Something went wrong."});
                    setIsLoading(false);
                }
              })
              .catch(function (error) {
                setIsLoading(false);
                console.log(error);
                displayToast({type : "error", msg : error.msg});
              });

        }else{
            setIsLoading(false);
           // displayToast({type : "error", msg : "Login Failed!"});
        }
    }

    return (
        <React.Fragment>
            <Container fluid="lg">
                <Row className="container-main">
                    <Col>
                        <h3 className="center-align">{isUpdate ? "Update" : "Add"} Employee</h3>
                    </Col>
                </Row>
                <Row className="container-main">
                    <Col md={{span : 6, offset : 3}}>
                      <Card>
                         <Card.Body>
                            <Form onSubmit={submitForm}>
                                <Form.Group className="mb-3" controlId="formBasicFullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" value={fullName} onChange={handleFullNameChange} placeholder="Enter Full Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicUserName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" value={username} onChange={handleUserNameChange} placeholder="Enter User Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" value={password} onChange={handlePasswordChange} placeholder="Enter Password" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicDesignation">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Select aria-label="Designation" value={designation} onChange={handleDesignationChange}>
                                        <option value="Manager">Manager</option>
                                        <option value="Gatekeeper">Gatekeeper</option>
                                        <option value="Employee">Employee</option>
                                    </Form.Select>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="formBasicDob">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="text" value={dob} onChange={handleDobChange} placeholder="Enter Date of birth" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicSalary">
                                    <Form.Label>Salary</Form.Label>
                                    <Form.Control type="text" value={salary} onChange={handleSalaryChange} placeholder="Enter Salary" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicRating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control type="text" value={rating} onChange={handleRatingChange} placeholder="Enter Rating" />
                                </Form.Group>

                                <Button disabled={isLoading} variant="primary" type="submit">Save</Button>
                            </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default AddEmployee;
