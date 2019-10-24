// @flow
import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { valSetupInputHandler } from "../../actions/validationSetupActions/actions";
import SelectFieldComponent from "../ReusableComponent/SelectFieldComponent/SelectFieldComponent";

type Props = {
  filterTypes: { [string]: { name: string, value: string } },
  value: string,
  valSetupInputHandler: function
};

const NecessityTypeField = (props: Props) => {
  const { filterTypes, value, valSetupInputHandler } = props;

  return (
    <SelectFieldComponent
      inputLabel="Necessity Type"
      menuItems={(Object.values(filterTypes): any)}
      selectFor="group-type"
      isRequired={true}
      input={value}
      inputHandler={valSetupInputHandler}
      name="necessityTypeField"
    />
  );
};

NecessityTypeField.propTypes = {
  filterTypes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  valSetupInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filterTypes: state.inputFieldReducers.necessityTypes,
  value: state.inputFieldReducers.necessityTypeField
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  { valSetupInputHandler }
)(NecessityTypeField);
