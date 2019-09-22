// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";
import { valSetupInputHandler } from "../../actions/validationSetupActions/actions";
import TextFieldComponent from "../ReusableComponent/TextFieldComponent/textField";
import type { TextFieldStyleInterface } from "../../constants/flowInterfaces";

const GroupNameField = ({ groupName, valSetupInputHandler, errorMsg }) => {
  const props: TextFieldStyleInterface = {
    type: "text",
    value: groupName,
    label: "Group Genie Group Name",
    placeholder: "GROUP_GENIE_GROUP_NAME",
    onChange: valSetupInputHandler,
    fullWidth: true,
    errorMsg,
    name: "groupNameField"
  };

  return (
    <FormGroup>
      <TextFieldComponent {...props} />
    </FormGroup>
  );
};

GroupNameField.propTypes = {
  groupName: PropTypes.string.isRequired,
  valSetupInputHandler: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  groupName: state.inputFieldReducers.groupNameField,
  errorMsg: state.inputFieldReducers.groupNameFieldErrorMsg
});

export default connect(
  mapStateToProps,
  { valSetupInputHandler }
)(GroupNameField);
