// @flow
import React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles";
import type { TextFieldStyleInterface } from "../../../constants/flowInterfaces";

const style = {
  root: {
    "& .MuiFormLabel-root": {
      color: "rgba(255, 255, 255, 0.54)"
    },
    "& .MuiInputBase-input": {
      color: "white"
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.42)"
    },
    "& .MuiFilledInput-underline:hover:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.87)"
    }
  }
};

const TextFieldComponent = (props: TextFieldStyleInterface) => {
  const { onChange, errorMsg, ...otherProps } = props;

  return (
    <TextField
      required
      margin="dense"
      variant="filled"
      {...otherProps}
      InputLabelProps={{
        shrink: true
      }}
      helperText={errorMsg}
      error={!(errorMsg == "" || typeof errorMsg == "undefined")}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default withStyles(style)(TextFieldComponent);
