// @flow
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectedHubRegionFilters } from "../../../reducers/GroupFiltersReducer";
import { setSelectedGroupInFieldBox } from "../../../actions/HomeComponentActions/GroupFiltersSelectionBoxActions/action";

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

const HubRegionField = props => {
  const {
    hubRegionInputHandler,
    regionsAvailable,
    hubRegionInput,
    hubFilters,
    setSelectedGroupInFieldBox,
    hubRegionSelected
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    const HubGroupFilterID = hubFilters.reduce(
      (allData, curData) => [...allData, curData.id],
      []
    );

    setSelectedGroupInFieldBox(HubGroupFilterID);
  }, [hubRegionSelected]);

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
  hubFilters: PropTypes.array.isRequired,
  setSelectedGroupInFieldBox: PropTypes.func.isRequired,
  hubRegionSelected: PropTypes.string.isRequired,
  hubRegionInputHandler: PropTypes.func.isRequired,
  hubRegionInput: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  regionsAvailable: state.inputFieldReducers.hubRegions,
  hubFilters: selectedHubRegionFilters(state),
  hubRegionSelected: state.hubSelectionFieldReducer.hubSelected
});

export default connect(
  mapStateToProps,
  { setSelectedGroupInFieldBox }
)(HubRegionField);
