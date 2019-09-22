// @flow
import * as React from "react";
import TextFieldComponent from "../ReusableComponent/TextFieldComponent/textField";
import type { TextFieldStyleInterface } from "../../constants/flowInterfaces";

const GroupNameTextArea = () => {
  const textFieldProps: TextFieldStyleInterface = {
    type: "textarea",
    label: "Group Genie Group Names",
    fullWidth: true,
    onChange: null,
    placeholder: "Place the multiple Group Genie Group names here",
    value: "",
    multiline: true,
    rows: 4,
    name: "groupNameTextArea"
  };

  return <TextFieldComponent {...textFieldProps} />;
};

export default GroupNameTextArea;
