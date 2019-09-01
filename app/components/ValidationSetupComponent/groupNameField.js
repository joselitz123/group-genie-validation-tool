// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";
import { groupNameInputHandler } from "../../actions/validationSetupActions/actions";
import TextFieldComponent from "../ReusableComponent/TextFieldComponent/textField";
import type { TextFieldStyleInterface } from "../../constants/flowInterfaces";

const GroupNameField = ({ groupName, groupNameInputHandler, errorMsg }) => {
  const props: TextFieldStyleInterface = {
    type: "text",
    value: groupName,
    label: "Group Genie Group Name",
    placeholder: "GROUP_GENIE_GROUP_NAME",
    onChange: groupNameInputHandler,
    fullWidth: true,
    errorMsg
  };

  return (
    <FormGroup>
      <TextFieldComponent {...props} />
    </FormGroup>
  );
};

GroupNameField.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupNameInputHandler: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  groupName: state.inputFieldReducers.groupNameField,
  errorMsg: state.inputFieldReducers.groupNameFieldErrorMsg
});

export default connect(
  mapStateToProps,
  { groupNameInputHandler }
)(GroupNameField);
