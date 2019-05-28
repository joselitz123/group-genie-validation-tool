import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const FilterGroupList = ({ filterGroupIds, filterGroupsObject }) => {
  return (
    <Fragment>
      <div>Filter Groups:</div>
      {filterGroupIds.length != 0 ? <GroupList filterGroupIds={filterGroupIds} filterGroupsObject={filterGroupsObject} /> : <div>No filter groups selected yet.</div>}
    </Fragment>
  );
};

const GroupList = ({ filterGroupIds, filterGroupsObject }) => {
  return (
    <ul>
      {filterGroupIds.map((group, index) => (
        <li key={index}>● {filterGroupsObject[group].group_alias}</li>
      ))}
    </ul>
  );
};

GroupList.propTypes = {
  filterGroupIds: PropTypes.array.isRequired,
  filterGroupsObject: PropTypes.object.isRequired
};

FilterGroupList.propTypes = {
  filterGroupIds: PropTypes.array.isRequired,
  filterGroupsObject: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  filterGroupIds: state.groupFiltersSelectionBoxReducer.groupsSelected,
  filterGroupsObject: state.groupFiltersReducer.group_filters
});

export default connect(
  mapStateToProps,
  null
)(FilterGroupList);
