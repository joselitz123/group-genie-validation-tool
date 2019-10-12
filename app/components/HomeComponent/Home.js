/* eslint-disable flowtype/generic-spacing */
// @flow
import * as React from "react";
import { Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ipcRenderer } from "electron";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import GroupFiltersSelectionBox from "./GroupFiltersSelectionBox";

import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import {
  getStorageData,
  fetchDefaultFilters
} from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import {
  loadAllUserAccess,
  loadTotalCountUsers,
  loadValidationResult,
  showModal,
  incrementExtractCount,
  promptError,
  setCancelToken
} from "../../actions/HomeComponentActions/TriggerValidate/actions";
import UsersFieldBox from "./UsersFieldBox/UsersFieldBox";
import { selectedFilters } from "../../reducers/ValidationReducer/ValidationReducer";
import ValidationResultSection from "./ValidationResultSection/ValidationResultSection";
import LoadingIndicatorModal from "./loadingIndicatorModal/loadingIndicatorModal";
import { containerStyle } from "../../constants/constantStyles";
import splitUserInput from "./logicComponent/splitUserInput";
import composeConcurrentRequest from "./logicComponent/composeConcurrentRequest";
import pullUsersAccesses from "./logicComponent/pullUserAccess";
import composeAccessObject from "./logicComponent/composeAccessObject";
import checkAccessAvailability from "./logicComponent/checkAccessAvailability";
import HubSelectionBox from "./hubSelectionField/hubSelectionField";
import Notifier from "../ReusableFunctions/NotificationFunction";
import type { accountAccess } from "../../constants/flowInterfaces";
import { setSelectedGroupInFieldBox } from "../../actions/HomeComponentActions/GroupFiltersSelectionBoxActions/action";

type Props = {
  users: string,
  selectedGroupFilters: Array<{
    id: string,
    group_name: string,
    group_alias: string,
    child?: Array<{
      data: { group_name: string, id: string, parentId: string }
    }>
  }>,
  loadLocalStorageGroupFilters: function,
  loadAllUserAccess: typeof loadAllUserAccess,
  loadTotalCountUsers: typeof loadTotalCountUsers,
  loadValidationResult: typeof loadValidationResult,
  showModal: typeof showModal,
  incrementExtractCount: typeof incrementExtractCount,
  promptError: typeof promptError,
  history: Object,
  setCancelToken: typeof setCancelToken,
  loadingState: boolean,
  setSelectedGroupInFieldBox: function
};

const Home = (props: Props) => {
  const {
    users,
    selectedGroupFilters,
    loadLocalStorageGroupFilters,
    loadAllUserAccess,
    loadTotalCountUsers,
    loadValidationResult,
    showModal,
    incrementExtractCount,
    promptError,
    history,
    setCancelToken,
    loadingState,
    setSelectedGroupInFieldBox
  } = props;

  const useStyles = makeStyles({
    buttonProgress: {
      position: "absolute",
      height: "25px !important",
      width: "25px !important"
    }
  });

  const classess = useStyles();

  React.useEffect(() => {
    // For listening on the signal gave from electron Main on going to setup page for the filter hub
    ipcRenderer.on("setup_hub_filters", () => {
      history.push("/validation_setup");
      setSelectedGroupInFieldBox([]);
    });

    const FetchLocalStorageFilters = async () => {
      const data = await getStorageData();

      await loadLocalStorageGroupFilters(data);
    };

    FetchLocalStorageFilters();

    // Listens to Main process to restore to default the filters
    ipcRenderer.on("restore_default_filters", async () => {
      const defaultFilterData = await fetchDefaultFilters();
      loadLocalStorageGroupFilters(defaultFilterData);
      FetchLocalStorageFilters();
    });
  }, []);

  const pullUsersAccess = async () => {
    const axiosToken = axios.CancelToken;
    const source = axiosToken.source();
    // create first a cancel token for the request
    setCancelToken(source);

    const numberOfConcurrentRequest: number = 200;

    const splittedInput: Array<string> = splitUserInput(users);

    loadTotalCountUsers(splittedInput.length);

    showModal();

    const composedConcurrentRequest: Array<
      Array<Promise<{ user: string, access: string }>>
    > = composeConcurrentRequest(
      splittedInput,
      numberOfConcurrentRequest,
      incrementExtractCount,
      promptError,
      source
    );

    const pulledUserAccesses: Array<
      Array<{ user: string, access: string }>
    > = await pullUsersAccesses(composedConcurrentRequest);

    const accessObjects: {
      [key: string]: accountAccess
    } = await composeAccessObject(pulledUserAccesses);

    loadAllUserAccess(accessObjects);

    const checkedAccess: {
      [keys: string]: {
        user: string,
        access: { [keys: string]: { val_result: boolean, group_alias: string } }
      }
    } = await checkAccessAvailability(accessObjects, selectedGroupFilters);

    loadValidationResult(checkedAccess);

    Notifier("Validation Completed", "Validation has been done successfully");
  };

  const buttonStyle: { border: string } = {
    border: "1px solid #1785c5"
  };

  return (
    <div className="container-flex" style={containerStyle}>
      <LoadingIndicatorModal />
      <Row>
        <Col>
          <Row>
            <Col xs="4">
              <UsersFieldBox />
            </Col>
            <Col xs="4">
              <HubSelectionBox />
            </Col>
            <Col xs="4">
              <GroupFiltersSelectionBox />
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                tyle={buttonStyle}
                onClick={() => pullUsersAccess()}
                disabled={loadingState}
              >
                {loadingState && (
                  <CircularProgress
                    size={68}
                    className={classess.buttonProgress}
                  />
                )}
                Validate
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <ValidationResultSection />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

Home.propTypes = {
  loadLocalStorageGroupFilters: PropTypes.func.isRequired,
  users: PropTypes.string.isRequired,
  loadAllUserAccess: PropTypes.func.isRequired,
  loadTotalCountUsers: PropTypes.func.isRequired,
  loadValidationResult: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  incrementExtractCount: PropTypes.func.isRequired,
  promptError: PropTypes.func.isRequired,
  setCancelToken: PropTypes.func.isRequired,
  loadingState: PropTypes.bool.isRequired,
  setSelectedGroupInFieldBox: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.usersFieldBoxReducer.input,
  selectedGroupFilters: selectedFilters(state),
  loadingState: state.loadingIndicatorReducer.showModal
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  {
    loadLocalStorageGroupFilters,
    loadAllUserAccess,
    loadTotalCountUsers,
    loadValidationResult,
    showModal,
    incrementExtractCount,
    promptError,
    setCancelToken,
    setSelectedGroupInFieldBox
  }
)(withRouter(Home));
