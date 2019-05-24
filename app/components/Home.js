// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";

const Home = () => {
  return (
    <Container style={{margin: '50px 0px'}}>
      <Row>
        <Col>
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label>User/s to validate access:</Label>
                <Input type="textarea" name="users" style={{height: 90+'px'}} />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label>Groups to check: <Link to={routes.VALIDATION_SETUP} style={{textDecoration: 'underline'}}>Setup Groups</Link></Label>
                <Input type="select" multiple={true}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="4" />
          </Row>
          <Row>
            <Col>
              <h4>Users Validated:</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
