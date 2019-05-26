// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../../constants/routes.json";
import { connect } from "react-redux";
import {
  Container,
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

class ValidationSetup extends Component {
  async componentDidMount() {

    const data = await getStorageData();

    const { loadLocalStorageGroupFilters } = this.props;

    await loadLocalStorageGroupFilters(data);
  }

  render() {
    return (
      <Container style={{ margin: "70px 0px" }}>
        <Link to={routes.HOME}>Homes</Link>
        <FormFields />
        <GroupFilterLists />
      </Container>
    );
  }
}

ValidationSetup.propTypes = {
  loadLocalStorageGroupFilters: PropTypes.func.isRequired
};

export default connect(
  null,
  { loadLocalStorageGroupFilters }
)(ValidationSetup);
