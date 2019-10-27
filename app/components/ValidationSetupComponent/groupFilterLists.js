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
  changeGroupChildFilterArrangement
} from "../../actions/groupFiltersActions/actions";
import {
  hubRegionInputHandler,
  toggleFormModal
} from "../../actions/validationSetupActions/actions";
import { useDenormalizeData } from "../../constants/schema";

type Props = {
  changeGroupFilterArrangement: function,
  changeGroupChildFilterArrangement: function,
  selectedHubRegion: function,
  hubRegionInputHandler: function,
  deleteGroupFilter: function,
  toggleFormModal: function,
  updateFilter: function,
  deleteGroupFilterChild: function
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
    deleteGroupFilterChild
  } = props;

  const [gridState, setGridState] = useState({});
  const [childDataDragState, setChildDataDragState] = useState({});

  const hubRegions = useSelector(state => state.inputFieldReducers.hubRegions);
  const addFilterValStatus = useSelector(
    state => state.inputFieldReducers.isValidating
  );
  const entities = useSelector(state => state.groupFiltersReducer.entities);
  const result = useSelector(state => state.groupFiltersReducer.result);

  useEffect(
    () => {
      const groupFilters = useDenormalizeData(result, entities);

      // const data = groupFilters.reduce(
      //   (allFilters, curFilter) =>
      //     curFilter.hub_region === selectedHubRegion
      //       ? [...allFilters, curFilter]
      //       : allFilters,
      //   []
      // );

      if (toArray(gridState).length !== 0) {
        gridState.removeAll();
        gridState.setData(
          groupFilters.reduce(
            (allFilters, curFilter) =>
              curFilter.hub_region === selectedHubRegion
                ? [...allFilters, curFilter]
                : allFilters,
            []
          )
        );

        gridState.update();
      }
    },
    [selectedHubRegion, addFilterValStatus, childDataDragState]
  );

  const dragRowsHandler = grid => {
    // checks if the data being rearranged is a child data
    // let childDataCount = 0;
    // grid.getData().map(
    //   (curData): void => {
    //     curData.$deep === 2 ? childDataCount++ : "";
    //   }
    // )

    const childFilters = grid
      .getData()
      .reduce(
        (allData, curData) =>
          curData.$deep === 2 ? [...allData, curData] : allData,
        []
      );

    if (childFilters.length > 0) {
      console.log(childFilters);
      changeGroupChildFilterArrangement(childFilters);
      setChildDataDragState(grid.getData());
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

  const updateHandler = (grid, data) => {
    updateFilter(data);
    grid.clearDirty();
  };

  const selectRowHandler = (grid, index) => {
    if (grid.get(index).data.expanded) {
      grid.deSelectRow(index);
    }
  };

  const config = {
    title: "Group Genie Access Groups",
    data: [],
    clicksToEdit: 2,
    height: 590,
    width: 1350,
    defaults: { editable: true },
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
      { type: "button", text: "Remove", width: 50, action: "remove" }
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
        index: "group_name",
        title: "Genie Group",
        type: "string",
        flex: 1,
        draggable: true,
        align: "center",
        editable: false
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
  // autoHeight: true

  const getEvents = () => [
    {
      init: grid => {
        setGridState(grid);
      }
    },
    {
      dragrows: grid => {
        dragRowsHandler(grid);
      }
    },
    {
      remove: removeHandler
    },
    { set: updateHandler },
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
  deleteGroupFilterChild: PropTypes.func.isRequired
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
    deleteGroupFilterChild
  }
)(GroupFilterLists);
