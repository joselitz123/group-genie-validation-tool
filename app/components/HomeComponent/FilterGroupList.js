import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectedFilters } from '../../reducers/ValidationReducer/ValidationReducer'

const FilterGroupList = ({selectedFilters}) => {
  return (
    <Fragment>
      <div>Filter/s Selected:</div>
      {selectedFilters.length != 0 ? <GroupList selectedFilters={selectedFilters} /> : <div>No filter groups selected yet.</div>}
    </Fragment>
  );
};

const GroupList = ({ selectedFilters }) => {

  const filterListStyle ={
    height: '99px',
    overflow: 'auto',
    border: '1px solid #dedede',
    borderRadius: '3px'
  }

  return (
    <ul style={filterListStyle}>
      {selectedFilters.map((group, index) => {
          return typeof(group) != "undefined" ? (
            <li key={index}>● {group.group_alias}</li>
          ) : "";
        }
      )}
    </ul>
  );
};

GroupList.propTypes = {
  selectedFilters: PropTypes.array.isRequired
};

FilterGroupList.propTypes = {
  selectedFilters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  selectedFilters: selectedFilters(state)
});

export default connect(
  mapStateToProps,
  null
)(FilterGroupList);
