//@flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";
import { groupAliasInputHandler } from "../../actions/validationSetupActions/actions";
import TextFieldComponent from '../ReusableComponent/TextFieldComponent/textField';
import type { TextFieldStyleInterface } from '../../constants/flowInterfaces';

const GroupAliasField = ({ groupAlias, groupAliasInputHandler }) => {

  const props: TextFieldStyleInterface = {
    type: "text",
    value: groupAlias,
    label: "Group Alias",
    placeholder: "What is the display name of the group?",
    onChange: groupAliasInputHandler,
    fullWidth: true,
  }

  return (
    <FormGroup>
      <TextFieldComponent {...props} />
    </FormGroup>
  );
};

GroupAliasField.propTypes = {
  groupAlias: PropTypes.string.isRequired,
  groupAliasInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupAlias: state.inputFieldReducers.groupAliasField 
});

export default connect(
  mapStateToProps,
  { groupAliasInputHandler }
)(GroupAliasField);
