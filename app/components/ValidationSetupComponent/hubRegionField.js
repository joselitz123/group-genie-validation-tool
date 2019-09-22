// @flow
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { hubRegionInputHandler } from "../../actions/validationSetupActions/actions";
import SelectHubFieldComponent from "../ReusableComponent/SelectHubFieldComponent/SelectHubFieldComponent";

const HubRegionField = ({ hubRegionInputHandler, hubRegionInput }) => (
  <SelectHubFieldComponent
    hubRegionInputHandler={hubRegionInputHandler}
    hubRegionInput={hubRegionInput}
  />
);

HubRegionField.propTypes = {
  hubRegionInputHandler: PropTypes.func.isRequired,
  hubRegionInput: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  hubRegionInput: state.inputFieldReducers.hubRegionField
});

export default connect(
  mapStateToProps,
  { hubRegionInputHandler }
)(HubRegionField);
