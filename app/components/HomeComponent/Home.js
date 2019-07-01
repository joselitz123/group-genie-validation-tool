// @flow
import React, { useEffect } from "react";
import {
  Row,
  Col,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GroupFiltersSelectionBox from "./GroupFiltersSelectionBox";
import { loadLocalStorageGroupFilters } from "../../actions/groupFiltersActions/actions";
import { getStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import { triggerValidate } from "../../actions/HomeComponentActions/TriggerValidate/actions";
import UsersFieldBox from "./UsersFieldBox/UsersFieldBox";
import FilterGroupList from "./FilterGroupList";
import { selectedFilters } from '../../reducers/ValidationReducer/ValidationReducer'
import ValidationResultSection from "./ValidationResultSection/ValidationResultSection";
import LoadingIndicatorModal from './loadingIndicatorModal/loadingIndicatorModal';
import { containerStyle } from '../../constants/constantStyles';

const Home = ({ triggerValidate, users, selectedGroupFilters, loadLocalStorageGroupFilters }) => {

    useEffect(() => {

      const FetchLocalStorageFilters = async () => {

        const data = await getStorageData();

        await loadLocalStorageGroupFilters(data);

      }

      FetchLocalStorageFilters();

    }, []);


    const buttonStyle = {
      border: "1px solid #1785c5"
    }

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
                <GroupFiltersSelectionBox />
              </Col>
              <Col xs="4" >
                <FilterGroupList />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="info" tyle={buttonStyle} onClick={()=>triggerValidate(users, selectedGroupFilters)}>Validate</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <ValidationResultSection/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
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
