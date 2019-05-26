import React from "react";
import { connect } from "react-redux";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import PropTypes from "prop-types";
import GroupAliasField from "./groupAliasField";
import GroupNameField from "./groupNameField";
import storage from "electron-json-storage";
import Proptypes from "prop-types";
import { setGroupFilters } from '../../actions/groupFiltersActions/actions';

const FormFields = ({ groupAlias, groupName, setGroupFilters, groupFilters }) => {

  return (
    <form onSubmit={(e)=>setGroupFilters(e, groupName, groupAlias, groupFilters)}>
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

FormFields.propTypes = {
  groupAlias: Proptypes.string.isRequired,
  groupName: Proptypes.string.isRequired,
  setGroupFilters: PropTypes.func.isRequired,
  groupFilters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupAlias: state.inputFieldReducers.groupAliasField,
  groupName: state.inputFieldReducers.groupNameField,
  groupFilters: state.groupFiltersReducer.group_filters
});

export default connect(
  mapStateToProps,
  {setGroupFilters}
)(FormFields);
