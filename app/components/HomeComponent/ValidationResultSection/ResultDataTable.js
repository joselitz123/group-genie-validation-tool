/* eslint-disable no-param-reassign */
// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react";
import { connect } from "react-redux";
import Fancy from "fancygrid";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import * as _ from "lodash";
import useFancyGridModal from "../../ReusableFunctions/fancyGridModal";
import { selectedObjectFormatHubRegionFilters } from "../../../reducers/GroupFiltersReducer";

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

  const columnWidthMultiplier = 10;

  const [initGridState, setInitGridState] = React.useState({});

  const [maxDataColumn, setMaxDataColumn] = React.useState();

  const [maxColumnWidth, setMaxColumnWidth] = React.useState({});

  const inputEl = React.useRef(null);

  const celldblclickHandler = (gridState, o) => {
    // eslint-disable-next-line prefer-destructuring
    const index = o.column.index;

    if (index !== "user_accnt") {
      const filterIndex = index.toString().replace(/_/g, "-");

      const filterData = allFilters[filterIndex];

      const modalColumns = [
        {
          title: "Group Display Name",
          index: "group_alias",
          type:
            typeof allFilters[filterIndex] !== "undefined" ? "tree" : "string",
          flex: 1,
          selectable: true,
          filter: { header: true, emptyText: "Filter" }
        },
        {
          title: "Group Name",
          index: "group_name",
          type: "string",
          flex: 1,
          selectable: true,
          filter: { header: true, emptyText: "Filter" }
        },
        {
          title: "Group Description",
          index: "description",
          type: "string",
          flex: 1,
          selectable: true,
          filter: { header: true, emptyText: "Filter" }
        }
      ];

      const grid = useFancyGridModal(
        filterData.group_alias,
        modalColumns,
        [filterData],
        "No Data can be shown at the moment",
        "cells",
        ["copy", "copy+"],
        ["group_alias", "group_name", "description"]
      );

      grid.show();
    }
  };

  // Auto resizes the columns depending on how many characters are there on its child data
  React.useEffect(
    () => {
      if (
        typeof maxDataColumn !== "undefined" &&
        typeof initGridState.getColumns !== "undefined"
      ) {
        const defaultColumnsWidth = initGridState.getColumns().reduce(
          (allData, curData) => ({
            ...allData,
            [curData.index]: {
              index: curData.index,
              width: curData.width
            }
          }),
          {}
        );

        const { index, value } = maxDataColumn;

        if (
          typeof maxColumnWidth[index] === "undefined" ||
          maxColumnWidth[index].value.length < value.length ||
          defaultColumnsWidth[index].width <
            value.length * columnWidthMultiplier
        ) {
          initGridState.setColumnWidth(
            Object.values({
              ...defaultColumnsWidth,
              [index]: {
                index,
                width: value.length * columnWidthMultiplier
              }
            })
          );
          setMaxColumnWidth({
            ...maxColumnWidth,
            [maxDataColumn.index]: maxDataColumn
          });
        }
      }
    },
    [maxDataColumn]
  );

  const initialEventsHandler = () => [
    { init: setInitGridState },
    { celldblclick: celldblclickHandler }
  ];

  const createColumns = () => {
    const hasApplicationAccess = {
      index: "hasApplicationAccess",
      title: "Application Access",
      sortable: true,
      type: "combo",
      data: ["", `✔`, "❌"],
      flex: 2,
      align: "center",
      cellAlign: "center",
      draggable: true,
      filter: { header: true, emptyText: "Filter" }
    };

    const hasDataAccess = {
      index: "hasDataAccess",
      title: "Data Access",
      sortable: true,
      type: "combo",
      data: ["", `✔`, "❌"],
      flex: 1,
      minWidth: 100,
      align: "center",
      cellAlign: "center",
      draggable: true,
      filter: { header: true, emptyText: "Filter" }
    };

    const userColumn = {
      index: "user_accnt",
      title: "User",
      locked: true,
      sortable: true,
      type: "string",
      flex: 1,
      minWidth: 120,
      align: "center",
      cellAlign: "center",
      draggable: true,
      filter: { header: true, emptyText: "Filter" },
      render: o => {
        if (typeof validationResult[o.value] !== "undefined") {
          // using if statement as workaround to the issue with fancyGrid
          if (validationResult[o.value].error_msg !== "") {
            o.cls = "non-existent acc_click";
          } else {
            o.cls = "acc_click";
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
                selectable: true,
                filter: { header: true, emptyText: "Filter" }
              },
              {
                title: "Description",
                index: "description",
                type: "string",
                flex: 1,
                selectable: true,
                filter: { header: true, emptyText: "Filter" }
              }
            ];
            const modalData: function = Object.values(
              totalAccessView[o.value].access
            );

            const grid = useFancyGridModal(
              `All applications that ${o.value} have access.`,
              modalColumns,
              modalData,
              emptyMsg,
              "rows",
              [{ type: "copy+", text: "Copy" }],
              ["name", "description"]
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
          subSearch: typeof allFilters[currentColumn].child === "undefined",
          sortable: true,
          ellipsis: false,
          flex: 1,
          minWidth:
            allFilters[currentColumn].group_alias.length *
            columnWidthMultiplier,
          cellAlign: "center",
          align: "center",
          draggable: true,
          filter: { header: true, emptyText: "Filter" },
          render: o => {
            if (o.value.length > 1) {
              setMaxDataColumn({
                index: o.column.index,
                value: o.value
              });
            }

            return o;
          }
        };

        return [...allColumns, functionColumn];
      },
      [userColumn, hasApplicationAccess, hasDataAccess]
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
        nativeScroller: true,
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
  allFilters: PropTypes.object,
  totalAccessView: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  validationResult: state.validationReducer.validationResult,
  filtersSelected: state.groupFiltersSelectionBoxReducer.groupsSelected,
  allFilters: selectedObjectFormatHubRegionFilters(state),
  totalAccessView: state.totalAccessView.allUsersAccess
});

export default connect<*, *, *, *, *, *>(mapStateToProps)(ResultDataTable);
