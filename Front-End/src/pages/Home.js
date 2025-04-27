//Home.js file

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/home.scss";
import bg from "../assets/app.jpeg"; // This is your large image

var sectionStyle = {
  width: "100%",
  height: "400px",

};

function Home() {
  return (

      <Container>
        <Row className="container-main">
          <Col md={12}>
                 <h2 style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '45px' , color: 'teal'}}>Welcome to our Google Product App</h2>
          </Col>
        </Row>
      </Container>

  );
}

export default Home;
