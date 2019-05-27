import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setInputUsersField } from "../../../actions/HomeComponentActions/UsersFieldBoxActions/actions";

const UsersFieldBox = ({ usersField, setInputUsersField }) => {
  return (
    <FormGroup>
      <Label>User/s to validate access:</Label>
      <Input
        type="textarea"
        name="users"
        value={usersField}
        onChange={setInputUsersField}
        style={{ height: 90 + "px" }}
      />
    </FormGroup>
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
