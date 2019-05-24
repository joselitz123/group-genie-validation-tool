import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import { groupNameInputHandler } from "../../actions/validationSetupActions/actions";

const GroupNameField = ({ groupName, groupNameInputHandler }) => {
  return (
    <FormGroup>
      <Label>
        <h5>Add Group Genie Name Group</h5>
      </Label>
      <Input
        type="text"
        value={groupName}
        onChange={e => groupNameInputHandler(e.target.value)}
      />
    </FormGroup>
  );
};

GroupNameField.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupNameInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupName: state.inputFieldReducers.groupNameField
});

export default connect(
  mapStateToProps,
  { groupNameInputHandler }
)(GroupNameField);
