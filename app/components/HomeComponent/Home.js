// @flow
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import GroupFiltersSelectionBox from "./GroupFiltersSelectionBox";
import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import { getStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import { triggerValidate } from "../../actions/HomeComponentActions/TriggerValidate/actions";
import PropTypes from "prop-types";
import UsersFieldBox from "./UsersFieldBox/UsersFieldBox";
import FilterGroupList from "./FilterGroupList";
import { selectedFilters } from '../../reducers/ValidationReducer/ValidationReducer'
import ValidationResultSection from "./ValidationResultSection/ValidationResultSection";

class Home extends Component {
  async componentDidMount() {
    const data = await getStorageData();

    const { loadLocalStorageGroupFilters } = this.props;

    await loadLocalStorageGroupFilters(data);
  }

  render() {
    const { triggerValidate, users, selectedGroupFilters } = this.props;

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
                <Button color="info" onClick={()=>triggerValidate(users, selectedGroupFilters)}>Validate</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <ValidationResultSection/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.propTypes = {
  loadLocalStorageGroupFilters: PropTypes.func.isRequired,
  triggerValidate: PropTypes.func.isRequired,
  users: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  users: state.usersFieldBoxReducer.input,
  selectedGroupFilters: selectedFilters(state)
});

export default connect(
  mapStateToProps,
  { loadLocalStorageGroupFilters, triggerValidate }
)(Home);
