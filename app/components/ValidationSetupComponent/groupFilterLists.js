/* eslint-disable no-unused-vars */
// @flow
import { Row, Col } from "reactstrap";
import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FancyGridReact } from "fancygrid-react";
import toArray from "lodash/toArray";
import {
  changeGroupFilterArrangement,
  deleteGroupFilter,
  updateFilter,
  deleteGroupFilterChild,
  changeGroupChildFilterArrangement,
  loadLocalStorageGroupFilters
} from "../../actions/groupFiltersActions/actions";
import {
  hubRegionInputHandler,
  toggleFormModal
} from "../../actions/validationSetupActions/actions";
import { useDenormalizeData } from "../../constants/schema";
import { fetchDefaultFilters } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";

type Props = {
  changeGroupFilterArrangement: function,
  changeGroupChildFilterArrangement: function,
  selectedHubRegion: function,
  hubRegionInputHandler: function,
  deleteGroupFilter: function,
  toggleFormModal: function,
  updateFilter: function,
  deleteGroupFilterChild: function,
  loadLocalStorageGroupFilters: function
};

const GroupFilterLists = (props: Props) => {
  const {
    changeGroupFilterArrangement,
    changeGroupChildFilterArrangement,
    selectedHubRegion,
    hubRegionInputHandler,
    deleteGroupFilter,
    toggleFormModal,
    updateFilter,
    deleteGroupFilterChild,
    loadLocalStorageGroupFilters
  } = props;

  const [gridState, setGridState] = useState({});
  const [childDataDragState, setChildDataDragState] = useState({});
  const [draggedTreeData, setDraggedTreeData] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  
  const hubRegions = useSelector(state => state.inputFieldReducers.hubRegions);
  const addFilterValStatus = useSelector(
    state => state.inputFieldReducers.isValidating
  );
  const entities = useSelector(state => state.groupFiltersReducer.entities);
  const result = useSelector(state => state.groupFiltersReducer.result);

  useEffect(
    () => {

      if (toArray(gridState).length !== 0) {
        
        const groupFilters = useDenormalizeData(result, entities);

        gridState.removeAll();


        const hubData = groupFilters.reduce(
            (allFilters, curFilter, index) => {
              if (curFilter.hub_region === selectedHubRegion) {

                return [...allFilters, curFilter];

              }
              return allFilters;
              }, []);
        
        
        gridState.setData(hubData);

        gridState.update();

        if (draggedTreeData !== "") {
          gridState.expand(draggedTreeData);
        }
      }
    },
    [selectedHubRegion, addFilterValStatus, childDataDragState]
  );
  

  const dragRowsHandler = (grid,rows) => {
    const childFilters = grid
      .getData()
      .reduce(
        (allData, curData) =>
          curData.$deep === 2 ? [...allData, curData] : allData,
        []
      );

    if (childFilters.length > 0) { // Check if the dragged row is under a tree data
      
      const parentIds  = childFilters.reduce((allData, curData) => (
        {...allData, [curData.parentId]: curData.parentId}), {});

      if (Object.values(parentIds).length === 1) { // This is to prevent dragging data from more than 1 tree data

        setDraggedTreeData(Object.values(parentIds)[0]);
        changeGroupChildFilterArrangement(childFilters);
        setChildDataDragState(grid.getData());
      } else {

        setChildDataDragState(grid.getData());

      }
    } else {
      
      const gridData = grid
        .getData()
        .reduce((allData, acc) => [...allData, acc.id], []);
      changeGroupFilterArrangement(gridData);
    }

  };

  const removeHandler = (grid, id) => {
    const removedData: any = grid.getChanges().removed[id];

    if (removedData.$deep === 1) {
      deleteGroupFilter(removedData);
    } else {
      deleteGroupFilterChild(removedData);
    }

    grid.clearDirty();
  };

  const setHandler = (grid, data) => {
    updateFilter(data);
    grid.clearDirty();
  };

  const selectRowHandler = (grid, index, dataItem) => {
    if (grid.get(index).data.expanded) {
      grid.deSelectRow(index);
    }
    
    setSelectedRow(index);
  };

  const config = {
    title: "Group Genie Access Groups",
    data: [],
    clicksToEdit: 2,
    height: 620,
    width: 1350,
    defaults: { editable: true },
    nativeScroller: true,
    tbar: [
      {
        type: "combo",
        data: toArray(hubRegions),
        displayKey: "name",
        valueKey: "value",
        value: selectedHubRegion,
        events: [
          {
            change: (field, value) => {
              hubRegionInputHandler(value);
            }
          }
        ]
      },
      {
        type: "search",
        width: 400,
        emptyText: "Search",
        paramsMenu: true,
        paramsText: "Parameters"
      },
      {
        type: "button",
        text: "Add",
        width: 50,
        handler: () => {
          toggleFormModal(true);
        }
      },
      { type: "button", text: "Remove", width: 50, action: "remove" },
      {
        type: "button",
        text: "Restore/Update Filters",
        width: 180,
        handler: async () => {
          const defaultFilterData = await fetchDefaultFilters();
          loadLocalStorageGroupFilters(defaultFilterData);
        }
      }
    ],
    selModel: "rows",
    columns: [
      { type: "rowdrag" },
      {
        index: "group_alias",
        title: "Display Name",
        flex: 1,
        draggable: true,
        align: "center",
        type: "tree"
      },
      {
        index: "description",
        title: "Description",
        type: "string",
        flex: 2,
        draggable: true,
        align: "center"
      },
      {
        index: "group_name",
        title: "Genie Group",
        type: "string",
        flex: 1,
        draggable: true,
        align: "center",
        editable: false
      },
      {
        title: "Action",
        type: "action",
        align: "center",
        cellAlign: "center",
        items: [
          {
            text: "Delete",
            action: "remove",
            render: o => {
              // eslint-disable-next-line no-param-reassign
              o.value = `<div class="fancy-grid-column-action-item" ><button class=" btn btn-danger btn-sm"><i class="material-icons">delete</i></button></div>`;
              return o;
            }
          }
        ],
        cls: "action-column",
        flex: 1
      }
    ]
  };

  const getEvents = (selectedRow) => [
    {
      init: grid => {
        setGridState(grid);
      }
    },
    {
      dragrows: dragRowsHandler
    },
    {
      remove: removeHandler
    },
    { set: setHandler },
    { selectrow: selectRowHandler }
  ];

  return (
    <Row style={{ paddingTop: "15px" }}>
      <Col>
        <FancyGridReact events={getEvents()} config={{ ...config }} />
      </Col>
    </Row>
  );
};

GroupFilterLists.propTypes = {
  changeGroupFilterArrangement: PropTypes.func.isRequired,
  changeGroupChildFilterArrangement: PropTypes.func.isRequired,
  selectedHubRegion: PropTypes.string.isRequired,
  hubRegionInputHandler: PropTypes.func.isRequired,
  deleteGroupFilter: PropTypes.func.isRequired,
  toggleFormModal: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  deleteGroupFilterChild: PropTypes.func.isRequired,
  loadLocalStorageGroupFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  hubRegionFilter: useDenormalizeData(
    state.groupFiltersReducer.result,
    state.groupFiltersReducer.entities
  ),
  selectedHubRegion: state.inputFieldReducers.hubRegionField,
  allHubFilters: state.groupFiltersReducer.group_filters
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  {
    changeGroupFilterArrangement,
    changeGroupChildFilterArrangement,
    hubRegionInputHandler,
    deleteGroupFilter,
    toggleFormModal,
    updateFilter,
    deleteGroupFilterChild,
    loadLocalStorageGroupFilters
  }
)(GroupFilterLists);
