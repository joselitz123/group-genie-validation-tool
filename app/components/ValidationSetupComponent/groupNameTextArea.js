// @flow
import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldComponent from "../ReusableComponent/TextFieldComponent/textField";
import { valSetupInputHandler } from "../../actions/validationSetupActions/actions";
import type { TextFieldStyleInterface } from "../../constants/flowInterfaces";

type Props = {
  valSetupInputHandler: function,
  textAreaValue: string
};

const GroupNameTextArea = (props: Props) => {
  const { valSetupInputHandler, textAreaValue } = props;

  const textFieldProps: TextFieldStyleInterface = {
    type: "textarea",
    label: "Group Genie Group Names",
    fullWidth: true,
    onChange: valSetupInputHandler,
    placeholder: "Place the multiple Group Genie Group names here",
    value: textAreaValue,
    multiline: true,
    rows: 4,
    name: "groupNameTextArea"
  };

  return <TextFieldComponent {...textFieldProps} />;
};

GroupNameTextArea.propTypes = {
  valSetupInputHandler: PropTypes.func.isRequired,
  textAreaValue: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  textAreaValue: state.inputFieldReducers.groupNameTextArea
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  { valSetupInputHandler }
)(GroupNameTextArea);
