import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import PropTypes from 'prop-types';
import GroupAliasField from './groupAliasField';
import GroupNameField from './groupNameField';

const FormFields = ({ groupAlias, groupName }) => {

  const submitHandler = () => {


  }

  return (
    <form onSubmit={submitHandler}>
      <Row>
        <Col xs="6">
          <GroupAliasField />
        </Col>
        <Col xs="6">
          <GroupNameField />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </form>
  );
};


export default connect(
  null,
  null
)(FormFields);
