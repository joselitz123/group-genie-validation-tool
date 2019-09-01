import React from "react";
import { connect } from "react-redux";
import { ListGroupItem } from "reactstrap";
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { deleteGroupFilter } from "../../actions/groupFiltersActions/actions";

const GroupFilterItem = ({ groupFilter, deleteGroupFilter, groupFilters }) => {
  const { id, group_name, group_alias } = groupFilter;

  return (
    <ListGroupItem
      color="info"
      style={{ display: "flex", justifyContent: "space-between",
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    }}
    >
      <div>
      {group_alias} - {group_name}
      </div>
      <Button onClick={()=>deleteGroupFilter(id, groupFilters)} variant="contained" color="secondary" size="small">&#x2716;</Button>
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
