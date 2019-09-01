import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { hubRegionInputHandler } from "../../actions/validationSetupActions/actions";
import SelectHubFieldComponent from "../ReusableComponent/SelectHubFieldComponent/SelectHubFieldComponent";

const useStyles = makeStyles({
  inputLabel: {
    color: "rgba(255, 255, 255, 0.54) !important"
  },
  select: {
    "&:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.42)"
    },
    "&:hover:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.87)"
    },
    color: "white"
  },
  option: {
    color: "#5a6268"
  },
  control: {
    "& svg": {
      color: "rgba(255, 255, 255, 0.54)"
    }
  }
});

const HubRegionField = ({ hubRegionInputHandler, hubRegionInput }) => {
  
  const classes = useStyles();

  return <SelectHubFieldComponent hubRegionInputHandler={hubRegionInputHandler} hubRegionInput={hubRegionInput}/>;
};

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
