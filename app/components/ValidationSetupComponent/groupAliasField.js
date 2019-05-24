import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import { groupAliasInputHandler } from "../../actions/validationSetupActions/actions";

const GroupAliasField = ({ groupAlias, groupAliasInputHandler }) => {
  return (
    <FormGroup>
      <Label>
        <h5>Add Group Alias</h5>
      </Label>
      <Input
        type="text"
        value={groupAlias}
        onChange={e => groupAliasInputHandler(e.target.value)}
      />
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
