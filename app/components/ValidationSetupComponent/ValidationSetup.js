// @flow
import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import routes from "../../constants/routes.json";
import { getStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import GroupFilterLists from "./groupFilterLists";
import { containerStyle } from "../../constants/constantStyles";
import BackButton from "../ReusableComponent/BackButtonComponent/BackButton";
// import HubRegionField from "./hubRegionField";
// import ButtonComponent from "../ReusableComponent/ButtonComponent/ButtonComponent";
import ModalFormField from "./modalFormField";

type Props = { loadLocalStorageGroupFilters: function };

const ValidationSetup = (props: Props) => {
  const { loadLocalStorageGroupFilters } = props;
  useEffect(() => {
    const FetchLocalStorageGroupFilters = async () => {
      const data = await getStorageData();

      await loadLocalStorageGroupFilters(data);
    };

    FetchLocalStorageGroupFilters();
  }, []);

  return (
    <div className="container-flex" style={containerStyle}>
      <ModalFormField />
      <div className="row">
        <div className="d-inline-flex">
          <BackButton route={routes.HOME} />
        </div>
        <div className="col-sm-12">
          <GroupFilterLists />
          {/* <form onSubmit={submitHandler}>
            <Row>
              <Col xs="2">
                <HubRegionField />
              </Col>
              <Col xs="2" className={classes.buttonContainer}>
                <ButtonComponent {...buttonProps}>
                  <i className="material-icons">add</i> Add Filter
                </ButtonComponent>
              </Col>
            </Row>
          </form> */}
        </div>
      </div>
    </div>
  );
};

ValidationSetup.propTypes = {
  loadLocalStorageGroupFilters: PropTypes.func.isRequired
};

export default connect<*, *, *, *, *, *>(
  null,
  { loadLocalStorageGroupFilters }
)(ValidationSetup);
