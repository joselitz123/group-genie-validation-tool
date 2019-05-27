// @flow
import React, { Component } from "react";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import GroupFiltersSelectionBox from "./GroupFiltersSelectionBox";
import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import { getStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import PropTypes from "prop-types";
import UsersFieldBox from "./UsersFieldBox/UsersFieldBox";
import FilterGroupList from "./FilterGroupList";

class Home extends Component {
  async componentDidMount() {
    const data = await getStorageData();

    const { loadLocalStorageGroupFilters } = this.props;

    await loadLocalStorageGroupFilters(data);
  }

  render() {
    return (
      <Container style={{ margin: "50px 0px" }}>
        <Row>
          <Col>
            <Row>
              <Col xs="4">
                <UsersFieldBox />
              </Col>
              <Col xs="4">
                <GroupFiltersSelectionBox />
              </Col>
              <Col xs="4">
                <FilterGroupList />
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Users Validated:</h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.propTypes = {
  loadLocalStorageGroupFilters: PropTypes.func.isRequired
};

export default connect(
  null,
  { loadLocalStorageGroupFilters }
)(Home);
