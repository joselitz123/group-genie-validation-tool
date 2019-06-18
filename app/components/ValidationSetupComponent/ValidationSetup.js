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
import back_icon from '../../../resources/back_icon.png';

const ValidationSetup = ({ loadLocalStorageGroupFilters }) =>  {
  
  useEffect(() => {

    const FetchLocalStorageGroupFilters = async () => {

      const data = await getStorageData();

      await loadLocalStorageGroupFilters(data);

    }

    FetchLocalStorageGroupFilters();

  }, []);

  const containerStyle = {
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '10px',
  }

  return (
    <div className="container-flex" style={containerStyle}>
      <Link to={routes.HOME}><img style={{blockSize: "44px"}} src={back_icon}/>Back</Link>
      <FormFields />
      <GroupFilterLists />
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
