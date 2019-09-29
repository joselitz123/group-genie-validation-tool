// @flow
import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { valSetupInputHandler } from "../../actions/validationSetupActions/actions";
import SelectFieldComponent from "../ReusableComponent/SelectFieldComponent/SelectFieldComponent";

type Props = {
  filterTypes: { [string]: { name: string, value: number } },
  value: number,
  valSetupInputHandler: function
};

const GroupTypeField = (props: Props) => {
  const { filterTypes, value, valSetupInputHandler } = props;

  return (
    <SelectFieldComponent
      inputLabel="Group Type"
      menuItems={(Object.values(filterTypes): any)}
      selectFor="group-type"
      isRequired={true}
      input={value}
      inputHandler={valSetupInputHandler}
      name="groupTypeField"
    />
  );
};

GroupTypeField.propTypes = {
  filterTypes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  valSetupInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filterTypes: state.inputFieldReducers.groupTypes,
  value: state.inputFieldReducers.groupTypeField
});

export default connect(
  mapStateToProps,
  { valSetupInputHandler }
)(GroupTypeField);
