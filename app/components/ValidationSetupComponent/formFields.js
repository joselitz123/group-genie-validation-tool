import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import storage from "electron-json-storage";
import Proptypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import GroupAliasField from "./groupAliasField";
import GroupNameField from "./groupNameField";
import ImportField from "./importField";
import { setGroupFilters } from "../../actions/groupFiltersActions/actions";
import {
  groupAliasInputHandler,
  groupNameInputHandler,
  triggerErrorOnGroupName
} from "../../actions/validationSetupActions/actions";
import { selectedHubFilters } from "../../reducers/GroupFiltersReducer";
import HubRegionField from "./hubRegionField";

const FormFields = ({
  groupAlias,
  groupName,
  setGroupFilters,
  groupAliasInputHandler,
  groupNameInputHandler,
  hubRegion,
  filters,
  hubRegionFilters,
  triggerErrorOnGroupName
}) => {
  const [loading, setLoading] = React.useState(false);

  const useStyles = makeStyles({
    loaderUI: {
      position: "absolute",
      left: "57px",
      top: "17px",
      marginTop: -12,
      marginLeft: -12
    }
  });

  const classes = useStyles();

  const FormSubmitHandler = e => {
    e.preventDefault();

    // To remove any triggered error
    triggerErrorOnGroupName("");

    validateGroup();
  };

  const validateGroup = () => {
    const filteredData = hubRegionFilters.filter(
      data => data.group_name == groupName
    );

    if (filteredData.length != 0) {
      triggerErrorOnGroupName("This filter already existed for this hub.");
    } else {
      checkGroupNameAvailability().then(data => {
        if (data) {
          setGroupFilters(hubRegion, groupName, groupAlias, filters);

          groupAliasInputHandler("");
          groupNameInputHandler("");
        } else {
          triggerErrorOnGroupName("This group does not seem to exist.");
        }
      });
    }
  };

  const checkGroupNameAvailability = () =>
    new Promise((resolve, reject) => {
      // Create timer that timesout the request when it's over the time set
      const timeOutRequest = setTimeout(() => {
        triggerErrorOnGroupName("Checking group name validity has timed out.");

        setLoading(false);

        reject("Checking group name validity has timed out.");
      }, 20000);

      setLoading(true);
      axios
        .get(
          `http://groupservice.internal.pg.com/GDSGroupService.jrun?op=find&by=name&searchroot=ou=groups,o=world&value=${groupName}`
        )
        .then(data => {
          clearTimeout(timeOutRequest);
          const parser = new DOMParser();

          const xmlDoc = parser.parseFromString(data.data, "text/html");

          const resultsCount = xmlDoc
            .getElementsByTagName("results")[0]
            .getAttribute("count");

          setLoading(false);

          if (resultsCount != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          clearTimeout(timeOutRequest);

          setLoading(false);

          triggerErrorOnGroupName(
            "An issue occured while trying to validate group name"
          );

          reject(err);
        });
    });

  return (
    <form onSubmit={FormSubmitHandler}>
      <Row>
        <Col xs="2">
          <HubRegionField />
        </Col>
        <Col xs="5">
          <GroupAliasField />
        </Col>
        <Col xs="5">
          <GroupNameField />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.loaderUI} />
          )}
        </Col>
      </Row>
    </form>
  );
};

FormFields.propTypes = {
  groupAlias: Proptypes.string.isRequired,
  groupName: Proptypes.string.isRequired,
  setGroupFilters: PropTypes.func.isRequired,
  groupAliasInputHandler: PropTypes.func.isRequired,
  groupNameInputHandler: PropTypes.func.isRequired,
  hubRegion: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  hubRegionFilters: PropTypes.array.isRequired,
  triggerErrorOnGroupName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupAlias: state.inputFieldReducers.groupAliasField,
  groupName: state.inputFieldReducers.groupNameField,
  hubRegion: state.inputFieldReducers.hubRegionField,
  filters: state.groupFiltersReducer.group_filters,
  hubRegionFilters: selectedHubFilters(state)
});

export default connect(
  mapStateToProps,
  {
    setGroupFilters,
    groupAliasInputHandler,
    groupNameInputHandler,
    triggerErrorOnGroupName
  }
)(FormFields);
