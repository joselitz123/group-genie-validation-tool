// @flow
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

const HubRegionField = (props) => {
  const { hubRegionInputHandler, regionsAvailable, hubRegionInput } = props;

  const classes = useStyles();

  return (
    <FormControl
      required
      className={classes.control}
      fullWidth
      variant="filled"
      margin="dense"
    >
      <InputLabel className={classes.inputLabel} shrink>
        Data Hub
      </InputLabel>
      <Select
        className={classes.select}
        native
        value={hubRegionInput}
        input={<FilledInput name="data_hub" />}
        onChange={e => hubRegionInputHandler(e.target.value)}
      >
        <option className={classes.option} value="">
          --Hub Region--
        </option>
        {Object.values(regionsAvailable).map((region: Object, key) => (
          <option key={key} className={classes.option} value={region.value}>
            {region.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

HubRegionField.propTypes = {
  regionsAvailable: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  regionsAvailable: state.inputFieldReducers.hubRegions,
});

export default connect(
  mapStateToProps,
  null
)(HubRegionField);
