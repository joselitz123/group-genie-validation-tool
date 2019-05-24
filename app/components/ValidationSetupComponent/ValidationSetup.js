// @flow
import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../constants/routes.json";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import storage from "electron-json-storage";
import FormFields from './formFields';

const ValidationSetup = () => {

  return (
    <Container style={{ margin: "70px 0px" }}>
      <Link to={routes.HOME}>Homes</Link>
      <FormFields />
      <Row style={{ paddingTop: "15px" }}>
        <Col>
          <hr />
          <h5>Group Filters:</h5>
          <ol>
            {/* {groupFilters.map((groupFilter, index) => {
              return <li key={index}>{groupFilter}</li>;
            })} */}
          </ol>
        </Col>
      </Row>
    </Container>
  );
};



export default ValidationSetup;
