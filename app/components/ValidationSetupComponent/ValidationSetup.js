// @flow
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ipcRenderer } from "electron";
import routes from "../../constants/routes.json";
import { getStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import GroupFilterLists from "./groupFilterLists";
import { containerStyle } from "../../constants/constantStyles";
import BackButton from "../ReusableComponent/BackButtonComponent/BackButton";
import { setSelectedGroupInFieldBox } from "../../actions/HomeComponentActions/GroupFiltersSelectionBoxActions/action";

import ModalFormField from "./modalFormField";

type Props = { loadLocalStorageGroupFilters: function, history: Object, setSelectedGroupInFieldBox: function };

const ValidationSetup = (props: Props) => {
  const { loadLocalStorageGroupFilters, history } = props;
  useEffect(() => {
    const FetchLocalStorageGroupFilters = async () => {
      const data = await getStorageData();

      await loadLocalStorageGroupFilters(data);
    };

    FetchLocalStorageGroupFilters();
  }, []);


  React.useEffect(() => {
    // For listening on the signal gave from electron Main on going to setup page for the filter hub
    ipcRenderer.on("setup_hub_filters", () => {
      history.push("/validation_setup");
      setSelectedGroupInFieldBox([]);
    });

    ipcRenderer.on("home", () => {
      history.push("/");
      setSelectedGroupInFieldBox([]);
    });


  }, []);

  return (
    <div className="container-flex" style={containerStyle}>
      <ModalFormField />
      <div className="row">
        <div className="col-sm-12">
          <GroupFilterLists />
        </div>
      </div>
    </div>
  );
};

ValidationSetup.propTypes = {
  loadLocalStorageGroupFilters: PropTypes.func.isRequired,
  setSelectedGroupInFieldBox: PropTypes.func.isRequired
};

export default connect<*, *, *, *, *, *>(
  null,
  { loadLocalStorageGroupFilters, setSelectedGroupInFieldBox }
)(withRouter(ValidationSetup));
