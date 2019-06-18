import { Row, Col, ListGroup } from "reactstrap";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { changeGroupFilterArrangement } from "../../actions/groupFiltersActions/actions";
import GroupFilterItem from './groupFilterItem';

const GroupFilterLists = ({ groupFilters, changeGroupFilterArrangement }) => {
  return (
    <Row style={{ paddingTop: "15px" }}>
      <Col>
        <hr />
        <h5>Group Filters:</h5>
        {Object.values(groupFilters).length == 0 ? 
        <h5>No group filters can be viewed yet.</h5> : 
        <DragDropContext
          onDragEnd={e => changeGroupFilterArrangement(e, groupFilters)}
        >
          <ListGroup style={{overflow: "auto", height: "370px"}}>
            <Droppable droppableId="droppable-1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {Object.values(groupFilters).map((groupFilter, index) => {
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
  groupFilters: PropTypes.object.isRequired,
  changeGroupFilterArrangement: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupFilters: state.groupFiltersReducer.group_filters
});

export default connect(
  mapStateToProps,
  { changeGroupFilterArrangement }
)(GroupFilterLists);
