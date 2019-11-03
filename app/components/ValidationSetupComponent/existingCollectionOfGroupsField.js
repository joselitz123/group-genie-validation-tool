// @flow
import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { valSetupInputHandler } from "../../actions/validationSetupActions/actions";
import SelectFieldComponent from "../ReusableComponent/SelectFieldComponent/SelectFieldComponent";
import { hubRegionCollectionGroups } from "../../reducers/GroupFiltersReducer";

type Props = {
  existingCollectionGroups: Array<{ name: string, value: number | string }>,
  value: string,
  valSetupInputHandler: function
};

const ExistingCollectionOfGroupsField = (props: Props) => {
  const { existingCollectionGroups, value, valSetupInputHandler } = props;

  return (
    <SelectFieldComponent
      inputLabel="Select Existing Collection"
      menuItems={existingCollectionGroups}
      selectFor="group-type"
      isRequired={true}
      input={value}
      inputHandler={valSetupInputHandler}
      name="existingCollectionOfGroupsField"
    />
  );
};

ExistingCollectionOfGroupsField.propTypes = {
  existingCollectionGroups: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  valSetupInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  existingCollectionGroups: hubRegionCollectionGroups(state),
  value: state.inputFieldReducers.existingCollectionOfGroupsField
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  { valSetupInputHandler }
)(ExistingCollectionOfGroupsField);
