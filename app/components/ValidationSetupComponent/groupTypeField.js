// @flow
import * as React from "react";
import SelectFieldComponent from "../ReusableComponent/SelectFieldComponent/SelectFieldComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import groupAliasField from "./groupAliasField";
import {
  groupTypeInputHandler,
  groupAliasInputHandler
} from "../../actions/validationSetupActions/actions";

type Props = {
  filterTypes: { [string]: { name: string, value: number } },
  value: number,
  groupTypeInputHandler: function
};

const GroupTypeField = (props: Props) => {
  const { filterTypes, value, groupTypeInputHandler } = props;

  return (
    <SelectFieldComponent
      inputLabel="Group Type"
      menuItems={(Object.values(filterTypes): any)}
      selectFor="group-type"
      isRequired={true}
      input={value}
      inputHandler={groupTypeInputHandler}
      name="groupTypeField"
    ></SelectFieldComponent>
  );
};

GroupTypeField.propTypes = {
  filterTypes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  groupTypeInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filterTypes: state.inputFieldReducers.groupTypes,
  value: state.inputFieldReducers.groupTypeField
});

export default connect(
  mapStateToProps,
  { groupTypeInputHandler }
)(GroupTypeField);
