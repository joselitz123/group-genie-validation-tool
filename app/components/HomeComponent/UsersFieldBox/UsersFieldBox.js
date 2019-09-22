// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setInputUsersField } from "../../../actions/HomeComponentActions/UsersFieldBoxActions/actions";
import TextFieldComponent from "../../ReusableComponent/TextFieldComponent/textField";
import type { TextFieldStyleInterface } from "../../../constants/flowInterfaces";

const UsersFieldBox = ({ usersField, setInputUsersField }) => {
  const props: TextFieldStyleInterface = {
    placeholder: "Enter here the users you want to validate their access",
    type: "textarea",
    value: usersField,
    multiline: true,
    fullWidth: true,
    label: "User/s to validate access",
    onChange: setInputUsersField,
    rows: 3,
    name: "usersField"
  };

  return (
    // <FormGroup>
    // <Label>User/s to validate access:</Label>
    <TextFieldComponent {...props} />
    // </FormGroup>
  );
};

UsersFieldBox.propTypes = {
  usersField: PropTypes.string.isRequired,
  setInputUsersField: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  usersField: state.usersFieldBoxReducer.input
});

export default connect(
  mapStatetoProps,
  { setInputUsersField }
)(UsersFieldBox);
