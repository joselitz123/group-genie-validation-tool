import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import routes from "../../../constants/routes.json";

const $ = require("jquery");

$.DataTable = require("datatables.net-bs4");
$.DataTableFixedColumns = require("datatables.net-fixedcolumns-bs4");
$.DataTableScroll = require("datatables.net-scroller-bs4");

const ResultDataTable = ({ dataSetObject, history, router, userAccesses }) => {
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

  const result_table = useRef(null);

  const [table_instance, setTable] = useState();

  const initiateTableInstance = () => {
    const table = $(result_table.current).DataTable({
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
          createdCell: (td, cellData, rowData, row, col) =>
            ReactDOM.render(
              <a
                onClick={() =>
                  history.push(`${routes.FULL_VIEW_ACCESS}/${cellData}`)
                }
                style={{ cursor: "pointer" }}
              >
                {Object.values(userAccesses[cellData].access).length == 0 ? (
                  <span
                    style={{
                      color:
                        typeof userAccesses[cellData].error_code != "undefined"
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
          render(data, type, row, meta) {
            if (data == true) {
              return "✔️";
            }
            if (data == false) {
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
    table_instance.destroy();

    $(result_table.current).empty();

    initiateTableInstance();
  };

  useEffect(() => {
    typeof table_instance !== "undefined"
      ? reInstantiateTable()
      : initiateTableInstance();
  }, [dataSetObject]);

  return (
    <table
      ref={result_table}
      className="table table-striped table-hover"
      style={{ width: "100%" }}
    />
  );
};

ResultDataTable.propTypes = {
  dataSetObject: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
