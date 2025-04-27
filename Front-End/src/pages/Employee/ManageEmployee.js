import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Container, Row, Button, Col, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URLS } from '../../routes';
import displayToast from '../../utils/displayToast';

function ManageEmployee() {
    const [employees, setEmployees] = useState([]);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setCurrentEmployee(null);
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        let isActive = true;

        if(isActive){
            fetchEmployees();
        }
        return () => {
            isActive = false;
        }
    }, []);

    const fetchEmployees = async () => {
        const url = URLS.GET_ALL_EMPLOYEES;
        axios.get(url)
              .then(function (response) {
                // console.log(response);
                setEmployees(response.data);
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "error", msg : "Oops! Something went wrong"});
              });
    }

    const deleteEmployeeConfirmation = (b) =>{
        setCurrentEmployee(b);
        handleShow();
    }

    const deleteBuyer = async () => {
        const url = URLS.DELETE_EMPLOYEE + currentEmployee.id;
        // const data = {
        //     id : currentBuyer.id
        // };
        axios.delete(url)
              .then(function (response) {
                handleClose();
                // console.log(response);
                displayToast({type : "success", msg : "Employee deleted successfully!"});
                fetchEmployees();
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "error", msg : "Oops! Something went wrong"});
              });
    }

    return (
        <Container className="container-main">  
            <Row className="container-main">
                <Col>
                    <Link to="/add-employee">
                        <Button style={{ backgroundColor: "#90E4C1", color:"BLACK" }}>Add New Employee</Button>
                    </Link>
                </Col>
                <Col><h3>Employee</h3></Col>
            </Row>      
         <Row>
            <Table className="table table-success">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Full Name</th>
                        <th>Designation</th>
                        <th>User Name</th>
                        <th>Salary</th>
                        <th>DOB</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                {employees.map((employee, index) => {
                    const {id, fullName, username, salary, dob, rating, designation} = employee;

                    return (<tr key={id}>
                        <td>{index+1}</td>
                        <td>{fullName}</td>
                        <td>{designation}</td>
                        <td>{username}</td>
                        <td>{salary}</td>
                        <td>{dob}</td>
                        <td>{rating}</td>
                        <td>
                            <Link to={`/edit-employee/?id=${id}`}><Button variant="primary">Edit</Button>{' '}</Link>
                            <Button onClick={()=>deleteEmployeeConfirmation(employee)} variant="danger">Delete</Button>
                        </td>
                    </tr>);
                })}
                </tbody>
            </Table>
          </Row>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {currentEmployee ? currentEmployee.fullName : ""}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={deleteBuyer}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    )
}

export default ManageEmployee;
