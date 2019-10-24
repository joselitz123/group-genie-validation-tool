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

const AccessTypeField = (props: Props) => {
  const { filterTypes, value, valSetupInputHandler } = props;

  return (
    <SelectFieldComponent
      inputLabel="Access Type"
      menuItems={(Object.values(filterTypes): any)}
      selectFor="group-type"
      isRequired={true}
      input={value}
      inputHandler={valSetupInputHandler}
      name="accessTypeField"
    />
  );
};

AccessTypeField.propTypes = {
  filterTypes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  valSetupInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filterTypes: state.inputFieldReducers.accessTypes,
  value: state.inputFieldReducers.accessTypeField
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  { valSetupInputHandler }
)(AccessTypeField);
