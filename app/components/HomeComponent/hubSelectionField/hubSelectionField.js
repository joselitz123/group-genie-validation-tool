import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HubRegionField from "../../ReusableComponent/SelectHubFieldComponent/SelectHubFieldComponent";
import { setHubRegion } from '../../../actions/HomeComponentActions/HubSelectionFieldActions/actions'

const HubSelectionBox = ({ hubRegionInput, setHubRegion }) => <HubRegionField hubRegionInput={hubRegionInput} hubRegionInputHandler={setHubRegion} />;

HubSelectionBox.propTypes = {
  hubRegionInput: PropTypes.string.isRequired,
  setHubRegion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  hubRegionInput: state.hubSelectionFieldReducer.hubSelected
});

export default connect(
  mapStateToProps,
  {setHubRegion}
)(HubSelectionBox);
