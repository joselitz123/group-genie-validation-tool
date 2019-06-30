// @flow
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import routes from "../../constants/routes.json";
import { connect } from "react-redux";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import FormFields from "./formFields";
import { getStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import PropTypes from "prop-types";
import GroupFilterLists from './groupFilterLists';
import { containerStyle } from '../../constants/constantStyles';
import BackButton from '../ReusableComponent/BackButtonComponent/BackButton';

const ValidationSetup = ({ loadLocalStorageGroupFilters }) =>  {
  
  useEffect(() => {

    const FetchLocalStorageGroupFilters = async () => {

      const data = await getStorageData();

      await loadLocalStorageGroupFilters(data);

    }

    FetchLocalStorageGroupFilters();

  }, []);

  return (
    <div className="container-flex" style={containerStyle}>
      <div className="row">
        <div className="d-inline-flex">
          <BackButton route={routes.HOME} />
        </div>
        <div className="col-sm-12">
          <FormFields />
          <GroupFilterLists />
        </div>
      </div>
    </div>
  );
}

ValidationSetup.propTypes = {
  loadLocalStorageGroupFilters: PropTypes.func.isRequired
};

export default connect(
  null,
  { loadLocalStorageGroupFilters }
)(ValidationSetup);
