/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import routes from "../../../constants/routes.json";

const $ = require("jquery");

$.DataTable = require("datatables.net-bs4");
$.DataTableFixedColumns = require("datatables.net-fixedcolumns-bs4");
$.DataTableScroll = require("datatables.net-scroller-bs4");

const ResultDataTable = ({ dataSetObject, history, userAccesses }) => {
  const dataSet = Object.values(dataSetObject); // reshapes the object data to array that was extracted

  const accessFields = Object.values(dataSet[0].access).reduce(
    (prevData, curData) => [
      ...prevData,
      {
        data: `access.${curData.group_alias}.val_result`,
        title: curData.group_alias
      }
    ],
    [{ data: "user", title: "User" }]
  );

  const resultTable = useRef(null);

  const [tableInstance, setTable] = useState();

  const initiateTableInstance = () => {
    const table = $(resultTable.current).DataTable({
      data: dataSet,
      columns: [...accessFields],
      scrollY: "200px",
      scrollX: true,
      scrollCollapse: true,
      paging: false,
      orderData: 0,
      retrieve: true,
      // fixedColumns: true,
      columnDefs: [
        {
          className: "user_column text-center",
          targets: 0,
          // eslint-disable-next-line no-unused-vars
          createdCell: (td, cellData, rowData, row, col) =>
            // eslint-disable-next-line react/no-render-return-value
            ReactDOM.render(
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <a
                onClick={() =>
                  history.push(`${routes.FULL_VIEW_ACCESS}/${cellData}`)
                }
                style={{ cursor: "pointer" }}
              >
                {Object.values(userAccesses[cellData].access).length === 0 ? (
                  <span
                    style={{
                      color:
                        typeof userAccesses[cellData].error_code !== "undefined"
                          ? "red"
                          : "yellow"
                    }}
                  >
                    {cellData}
                  </span>
                ) : (
                  <span>{cellData}</span>
                )}
              </a>,
              td
            )
        },
        {
          targets: "_all",
          className: "text-center",
          // eslint-disable-next-line no-unused-vars
          render(data, type, row, meta) {
            if (data === true) {
              return "✔️";
            }
            if (data === false) {
              return "&#10060;";
            }
            return data;
          }
        }
      ]
    });

    setTable(table);
  };

  /**
   * Destroy and instantiate the table as there is no way to dynamically add columns in data tables
   * https://datatables.net/forums/discussion/23921/adding-new-column-dynamically-to-the-datatable
   */
  const reInstantiateTable = () => {
    tableInstance.destroy();

    $(resultTable.current).empty();

    initiateTableInstance();
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    typeof tableInstance !== "undefined"
      ? reInstantiateTable()
      : initiateTableInstance();
  }, [dataSetObject]);

  return (
    <table
      ref={resultTable}
      className="table table-striped table-hover"
      style={{ width: "100%" }}
    />
  );
};

ResultDataTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSetObject: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userAccesses: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dataSetObject: state.validationReducer.validationResult,
  userAccesses: state.totalAccessView.allUsersAccess,
  router: state.router
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(ResultDataTable));
