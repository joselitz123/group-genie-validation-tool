// @flow
import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    "& .MuiFilledInput-underline:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.42)"
    },
    "& .MuiFilledInput-underline:hover:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.87)"
    },
    "& .MuiInputBase-input": {
      color: "white"
    },
    "& svg": {
      color: "rgba(255, 255, 255, 0.54)"
    }
  },
  inputLabel: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

type Props = {
  inputLabel: string,
  menuItems: Array<{ name: string, value: number | string }>,
  selectFor: string,
  isRequired?: boolean,
  input: number | string,
  inputHandler: function,
  name: string
};

const SelectFieldComponent = (props: Props) => {
  const {
    inputLabel,
    menuItems,
    selectFor,
    isRequired,
    input,
    inputHandler,
    name
  } = props;

  const classes = useStyles();

  return (
    <div className="form-group">
      <FormControl required className={classes.root} fullWidth variant="filled">
        <InputLabel className={classes.inputLabel} htmlFor={selectFor}>
          {inputLabel}
        </InputLabel>
        <Select
          value={input}
          onChange={inputHandler}
          inputProps={{ id: selectFor }}
          name={name}
        >
          {menuItems.map((data, id) => (
            <MenuItem key={id} value={data.value}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

SelectFieldComponent.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
  selectFor: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  input: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default SelectFieldComponent;
