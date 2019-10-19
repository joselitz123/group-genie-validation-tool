/* eslint-disable camelcase */
import React from "react";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import uniqBy from "lodash/uniqBy";
import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import routes from "../../constants/routes";
import { setSelectedGroupInFieldBox } from "../../actions/HomeComponentActions/GroupFiltersSelectionBoxActions/action";
import { selectedFilters } from "../../reducers/ValidationReducer/ValidationReducer";
import { selectedHubRegionFilters } from "../../reducers/GroupFiltersReducer";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    marginTop: "0px"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2,
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 1)"
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  select: {
    // '&.Mui-focused': {
    //   backgroundColor: 'rgba(0, 0, 0, 0.05) !important'
    // },
    "&:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.42)"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.87)"
    },
    "& svg": {
      color: "rgba(255, 255, 255, 0.54)"
    }
    // '& .MuiSelect-root:focus': {
    //   backgroundColor: 'transparent'
    // },
    // paddingTop: '36px',
    // paddingBottom: '20px',
    // backgroundColor: 'rgba(0, 0, 0, 0.09)'
  },
  inputLabel: {
    color: "rgba(255, 255, 255, 0.54)"
    // top: '12px'
  }
}));

const GroupFiltersSelectionBox = ({
  groupFilters,
  groupsSelected,
  setSelectedGroupInFieldBox,
  selectedFilters
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const classes = useStyles();

  const uniqFilters = uniqBy(groupFilters, "group_alias");

  /* reference https://material-ui.com/components/selects/#multiple-select */
  return (
    <FormControl
      fullWidth
      variant="filled"
      margin="dense"
      className={classes.formControl}
    >
      <InputLabel
        htmlFor="select-multiple-placeholder"
        className={classes.inputLabel}
      >
        Select Group Filters
      </InputLabel>
      <Select
        multiple
        value={groupsSelected}
        onChange={e => setSelectedGroupInFieldBox(e.target.value)}
        renderValue={() => (
          <div className={classes.chips}>
            {uniqBy(selectedFilters, "group_alias").map(value => (
              <Chip
                variant="outlined"
                key={value.id}
                label={value.group_alias}
                className={classes.chip}
              />
            ))}
          </div>
        )}
        input={<Input id="select-multiple-placeholder" />}
        MenuProps={MenuProps}
        className={classes.select}
      >
        {uniqFilters.length !== 0
          ? uniqFilters.map(groupFilter => {
              const { id, group_alias } = groupFilter;
              return (
                <MenuItem key={id} value={id}>
                  {group_alias}
                </MenuItem>
              );
            })
          : ""}
      </Select>
    </FormControl>
  );
};

GroupFiltersSelectionBox.propTypes = {
  groupFilters: PropTypes.array.isRequired,
  groupsSelected: PropTypes.array.isRequired,
  setSelectedGroupInFieldBox: PropTypes.func.isRequired,
  selectedFilters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  groupFilters: selectedHubRegionFilters(state),
  groupsSelected: state.groupFiltersSelectionBoxReducer.groupsSelected,
  selectedFilters: selectedFilters(state)
});

export default connect(
  mapStateToProps,
  { setSelectedGroupInFieldBox }
)(GroupFiltersSelectionBox);
