// @flow
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "../../constants/routes.json";
import { connect } from "react-redux";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import FormFields from "./formFields";
import { getStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import PropTypes from "prop-types";
import GroupFilterLists from "./groupFilterLists";
import { containerStyle } from "../../constants/constantStyles";
import BackButton from "../ReusableComponent/BackButtonComponent/BackButton";
import HubRegionField from "./hubRegionField";
import ButtonComponent from "../ReusableComponent/ButtonComponent/ButtonComponent";
import { makeStyles } from "@material-ui/styles";
import ModalFormField from "./modalFormField";
import { toggleFormModal } from "../../actions/validationSetupActions/actions";

const useStyles = makeStyles({
  buttonContainer: {
    display: "flex",
    alignItems: "center"
  }
});

const ValidationSetup = ({ loadLocalStorageGroupFilters, toggleFormModal }) => {
  const classes = useStyles();

  useEffect(() => {
    const FetchLocalStorageGroupFilters = async () => {
      const data = await getStorageData();

      await loadLocalStorageGroupFilters(data);
    };

    FetchLocalStorageGroupFilters();
  }, []);

  const buttonProps = {
    variant: "contained",
    color: "primary",
    size: "medium",
    type: "submit"
  };

  const submitHandler = e => {
    e.preventDefault();

    toggleFormModal(true);
  };

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
  loadLocalStorageGroupFilters: PropTypes.func.isRequired,
  toggleFormModal: PropTypes.func.isRequired
};

export default connect(
  null,
  { loadLocalStorageGroupFilters, toggleFormModal }
)(ValidationSetup);
