import { Row, Col, ListGroup } from "reactstrap";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { changeGroupFilterArrangement } from "../../actions/groupFiltersActions/actions";
import GroupFilterItem from './groupFilterItem';
import { selectedHubFilters, unSelectedHubFilters } from '../../reducers/GroupFiltersReducer';

const GroupFilterLists = ({changeGroupFilterArrangement, hubRegionFilter, unSelectedFilters, groupFilters}) => {


  return (
    <Row style={{ paddingTop: "15px" }}>
      <Col>
        <hr />
        <h6>Group Filters:</h6>
        {hubRegionFilter.length == 0 ? 
        <h5>No group filters can be viewed yet.</h5> : 
        <DragDropContext
          onDragEnd={e => changeGroupFilterArrangement(e, hubRegionFilter, unSelectedFilters)}
        >
          <ListGroup style={{overflow: "auto", height: "370px"}}>
            <Droppable droppableId="droppable-1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {hubRegionFilter.map((groupFilter, index) => {
                    const { id, group_name, group_alias } = groupFilter;
                    return (
                      <Draggable draggableId={id} key={id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <GroupFilterItem groupFilter={groupFilter}/>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </ListGroup>
        </DragDropContext>}
      </Col>
    </Row>
  );
};

GroupFilterLists.propTypes = {
  changeGroupFilterArrangement: PropTypes.func.isRequired,
  hubRegionFilter: PropTypes.array.isRequired,
  groupFilters: PropTypes.object.isRequired,
  unSelectedFilters: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  hubRegionFilter: selectedHubFilters(state),
  unSelectedFilters: unSelectedHubFilters(state),
  groupFilters: state.groupFiltersReducer.group_filters,
});

export default connect(
  mapStateToProps,
  { changeGroupFilterArrangement }
)(GroupFilterLists);
