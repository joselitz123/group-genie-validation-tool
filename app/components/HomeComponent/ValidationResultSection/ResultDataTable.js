// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react";
import { connect } from "react-redux";
import Fancy from "fancygrid";
import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";
// import routes from "../../../constants/routes.json";z

type Props = {
  validationResult: function,
  filtersSelected: Array<string>,
  allFilters: function
};

const ResultDataTable = (props: Props) => {
  const { validationResult, filtersSelected, allFilters } = props;

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
      // cellAlign: "center",
      draggable: true,
      filter: {
        header: true,
        emptyText: "Filter"
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
          flex: 1,
          cellAlign:
            typeof allFilters[currentColumn].child === "undefined"
              ? "center"
              : "left",
          align: "center",
          draggable: true,
          filter: {
            header: true,
            emptyText: "Filter"
            // tip: [
            //   "Contains: 30",
            //   "Less than: <30",
            //   "More than: >30",
            //   "Equal: =30",
            //   "Not Equal: !=30",
            //   "Composite: <30,>5"
            // ].join("")
          }

          // render: data => {
          //   if (typeof data.value === "object") {
          //     // eslint-disable-next-line no-param-reassign
          //     data.value = Object.values(data.value).length !== 0 ? `✔` : "❌";

          //     return data;
          //   }

          //   return data;
          // }
        };

        return [...allColumns, functionColumn];
      },
      [userColumn]
    );

    return createdColumns;
  };

  React.useEffect(() => {
    if (typeof initGridState.destroy !== "undefined") {
      initGridState.destroy();
    }
    // eslint-disable-next-line no-new
    new Fancy.Grid({
      renderTo: inputEl.current,
      title: "Validation Result Table",
      height: 460,
      width: tableWidth,
      events: initialEventsHandler(),
      emptyText: "No data can be shown at the moment",
      columns: createColumns(),
      data: Object.values(validationResult)
    });
  }, [validationResult]);

  return <div ref={inputEl} className="gridDiv" />;
};

ResultDataTable.propTypes = {
  validationResult: PropTypes.object.isRequired,
  filtersSelected: PropTypes.array.isRequired,
  allFilters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  validationResult: state.validationReducer.validationResult,
  filtersSelected: state.groupFiltersSelectionBoxReducer.groupsSelected,
  allFilters: state.groupFiltersReducer.group_filters
});

export default connect(mapStateToProps)(ResultDataTable);
