// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react";
import { connect } from "react-redux";
import Fancy from "fancygrid";
import PropTypes from "prop-types";
import { render } from "react-dom";
import useFancyGridModal from "../../ReusableFunctions/fancyGridModal";
// import { withRouter } from "react-router-dom";
// import routes from "../../../constants/routes.json";z

type Props = {
  validationResult: function,
  filtersSelected: Array<string>,
  allFilters: function,
  totalAccessView: {}
};

const ResultDataTable = (props: Props) => {
  const {
    validationResult,
    filtersSelected,
    allFilters,
    totalAccessView
  } = props;

  const tableWidth = 1350;

  const [initGridState, setInitGridState] = React.useState({});

  const inputEl = React.useRef(null);

  const initialEventsHandler = () => [
    {
      init: setInitGridState
    }
  ];

  const createColumns = () => {
    const userColumn = {
      index: "user_accnt",
      title: "User",
      sortable: true,
      type: "string",
      flex: 1,
      align: "center",
      cellAlign: "center",
      draggable: true,
      filter: { header: true, emptyText: "Filter" },
      render: o => {
        if (typeof validationResult[o.value] !== "undefined") {
          // using if statement as workaround to the issue with fancyGrid
          if (validationResult[o.value].error_msg !== "") {
            o.cls = "non-existent";
          }
          const emptyMsg =
            validationResult[o.value].error_msg !== ""
              ? `${validationResult[o.value].error_msg} with error code ${
                  validationResult[o.value].error_code
                }`
              : "No Data can be shown at the moment";

          o.inner.dom.onclick = () => {
            const modalColumns = [
              {
                title: "Group Name",
                index: "name",
                type: "string",
                flex: 1,
                selectable: true
              },
              {
                title: "Description",
                index: "description",
                type: "string",
                flex: 1,
                selectable: true
              }
            ];
            const modalData: function = Object.values(
              totalAccessView[o.value].access
            );

            const grid = useFancyGridModal(
              `All applications that ${o.value} have access.`,
              modalColumns,
              modalData,
              emptyMsg
            );

            grid.show();
          };
        }

        return o;
      }
    };
    const createdColumns = filtersSelected.reduce(
      (allColumns, currentColumn) => {
        const functionColumn = {
          index: allFilters[currentColumn].id.toString().replace(/-/g, "_"),
          title: allFilters[currentColumn].group_alias,
          type:
            typeof allFilters[currentColumn].child === "undefined"
              ? "combo"
              : "tree",
          data: ["", `✔`, "❌"],
          subSearch:
            typeof allFilters[currentColumn].child === "undefined"
              ? false
              : true,
          flex: 1,
          cellAlign: "center",
          align: "center",
          draggable: true,
          filter: {
            header: true,
            emptyText: "Filter"
          },
          render: o => {
            if (o.value === "❌") {
              o.cls = "xmark";
            }

            return o;
          }
        };

        return [...allColumns, functionColumn];
      },
      [userColumn]
    );

    return createdColumns;
  };

  React.useEffect(
    () => {
      if (typeof initGridState.destroy !== "undefined") {
        initGridState.destroy();
      }
      // eslint-disable-next-line no-new
      new Fancy.Grid({
        renderTo: inputEl.current,
        title: "Validation Result Table",
        height: 460,
        width: tableWidth,
        shadow: false,
        selModel: { type: "rows" },
        cellStylingCls: ["xmark", "non-existent"],
        defaults: {
          resizable: true
        },
        contextmenu: ["copy"],
        columnTrackOver: true,
        events: initialEventsHandler(),
        emptyText: "No data can be shown at the moment",
        columns: createColumns(),
        data: Object.values(validationResult)
      });
    },
    [validationResult]
  );

  return <div ref={inputEl} className="gridDiv" />;
};

ResultDataTable.propTypes = {
  validationResult: PropTypes.object.isRequired,
  filtersSelected: PropTypes.array.isRequired,
  allFilters: PropTypes.object.isRequired,
  totalAccessView: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  validationResult: state.validationReducer.validationResult,
  filtersSelected: state.groupFiltersSelectionBoxReducer.groupsSelected,
  allFilters: state.groupFiltersReducer.group_filters,
  totalAccessView: state.totalAccessView.allUsersAccess
});

export default connect<*, *, *, *, *, *>(mapStateToProps)(ResultDataTable);
