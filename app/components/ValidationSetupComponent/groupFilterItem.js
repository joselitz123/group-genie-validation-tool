import React from "react";
import { connect } from "react-redux";
import { ListGroupItem, Button } from "reactstrap";
import PropTypes from "prop-types";
import { deleteGroupFilter } from "../../actions/groupFiltersActions/actions";

const GroupFilterItem = ({ groupFilter, deleteGroupFilter, groupFilters }) => {
  const { id, group_name, group_alias } = groupFilter;

  return (
    <ListGroupItem
      color="info"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
      {group_alias} - {group_name}
      </div>
      <Button onClick={()=>deleteGroupFilter(id, groupFilters)} size="sm">&#x2716;</Button>
    </ListGroupItem>
  );
};

GroupFilterItem.propTypes = {
  groupFilter: PropTypes.object.isRequired,
  deleteGroupFilter: PropTypes.func.isRequired,
  groupFilters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupFilters: state.groupFiltersReducer.group_filters
})

export default connect(mapStateToProps, {deleteGroupFilter})(GroupFilterItem);
