// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";
import { valSetupInputHandler } from "../../actions/validationSetupActions/actions";
import TextFieldComponent from "../ReusableComponent/TextFieldComponent/textField";
import type { TextFieldStyleInterface } from "../../constants/flowInterfaces";

const GroupAliasField = ({ groupAlias, valSetupInputHandler }) => {
  const props: TextFieldStyleInterface = {
    type: "text",
    value: groupAlias,
    label: "Display Name",
    placeholder: "What is the display name of the group?",
    onChange: valSetupInputHandler,
    fullWidth: true,
    name: "groupAliasField"
  };

  return (
    <FormGroup>
      <TextFieldComponent {...props} />
    </FormGroup>
  );
};

GroupAliasField.propTypes = {
  groupAlias: PropTypes.string.isRequired,
  valSetupInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupAlias: state.inputFieldReducers.groupAliasField
});

export default connect(
  mapStateToProps,
  { valSetupInputHandler }
)(GroupAliasField);
