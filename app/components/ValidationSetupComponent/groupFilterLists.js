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
  updateFilter
} from "../../actions/groupFiltersActions/actions";
import { selectedHubFilters } from "../../reducers/GroupFiltersReducer";
import {
  hubRegionInputHandler,
  toggleFormModal
} from "../../actions/validationSetupActions/actions";

const GroupFilterLists = ({
  changeGroupFilterArrangement,
  hubRegionFilter,
  selectedHubRegion,
  hubRegionInputHandler,
  deleteGroupFilter,
  allHubFilters,
  toggleFormModal,
  updateFilter
}) => {
  const [gridState, setGridState] = useState({});

  const hubRegions = useSelector(state => state.inputFieldReducers.hubRegions);
  const addFilterValStatus = useSelector(
    state => state.inputFieldReducers.isValidating
  );

  useEffect(() => {
    if (toArray(gridState).length !== 0) {
      gridState.removeAll();
      gridState.setData(hubRegionFilter);

      gridState.update();
    }
  }, [selectedHubRegion, addFilterValStatus]);

  const dragRowsHandler = grid => {
    const gridData = grid
      .get()
      .reduce((allData, acc) => ({ ...allData, [acc.data.id]: acc.data }), {});

    console.table(gridData);
    changeGroupFilterArrangement(gridData);
  };

  const removeHandler = (grid, id) => {
    const { [id]: value, ...restData } = allHubFilters;
    deleteGroupFilter(restData, id);
  };

  const updateHandler = (grid, data) => {
    updateFilter(data);
    grid.clearDirty();
  };

  const config = {
    title: "Group Genie Access Groups",
    data: {
      items: hubRegionFilter,
      fields: ["group_alias", "group_name", "description", "action"]
    },
    clicksToEdit: 2,
    height: 610,
    width: 1350,
    defaults: {
      editable: true
    },
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
      {
        type: "button",
        text: "Remove",
        width: 50,
        action: "remove"
      }
    ],
    selModel: "rows",
    columns: [
      {
        type: "rowdrag"
      },
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
        // autoHeight: true
      }
    ]
  };

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
    { set: updateHandler }
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
  hubRegionFilter: PropTypes.array.isRequired,
  selectedHubRegion: PropTypes.string.isRequired,
  hubRegionInputHandler: PropTypes.func.isRequired,
  deleteGroupFilter: PropTypes.func.isRequired,
  allHubFilters: PropTypes.object.isRequired,
  toggleFormModal: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  hubRegionFilter: selectedHubFilters(state),
  selectedHubRegion: state.inputFieldReducers.hubRegionField,
  allHubFilters: state.groupFiltersReducer.group_filters
});

export default connect(
  mapStateToProps,
  {
    changeGroupFilterArrangement,
    hubRegionInputHandler,
    deleteGroupFilter,
    toggleFormModal,
    updateFilter
  }
)(GroupFilterLists);
