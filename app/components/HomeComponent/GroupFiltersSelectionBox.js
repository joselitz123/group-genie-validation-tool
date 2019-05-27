import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import routes from "../../constants/routes";
import PropTypes from 'prop-types';
import { setSelectedGroupInFieldBox } from '../../actions/HomeComponentActions/GroupFiltersSelectionBoxActions/action';

const GroupFiltersSelectionBox = ({groupFilters, groupsSelected, setSelectedGroupInFieldBox}) => {

  const groupFiltersArr = Object.values(groupFilters);

  return (
    <FormGroup>
      <Label>
        Groups to check:{" "}
        <Link
          to={routes.VALIDATION_SETUP}
          style={{ textDecoration: "underline" }}
        >
          Setup Groups
        </Link>
      </Label>
      <Input type="select" multiple={true} value={groupsSelected} onChange={setSelectedGroupInFieldBox}>
        {groupFiltersArr.length != 0 ? groupFiltersArr.map(groupFilter => {
          const {id, group_alias} = groupFilter;

          return <option key={id} value={id}>{group_alias}</option>
        }) : ''}
      </Input>
    </FormGroup>
  );
};

GroupFiltersSelectionBox.propTypes = {
  groupFilters: PropTypes.object.isRequired,
  groupsSelected: PropTypes.array.isRequired,
  setSelectedGroupInFieldBox: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  groupFilters: state.groupFiltersReducer.group_filters,
  groupsSelected: state.groupFiltersSelectionBoxReducer.groupsSelected
})

export default connect(mapStateToProps, {setSelectedGroupInFieldBox})(GroupFiltersSelectionBox);
