import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import PropTypes from "prop-types";
$.DataTable = require("datatables.net-bs4")();
$.DataTableScroll = require("datatables.net-scroller-bs4")();

const AccessTableView = ({ allUsersAccess, user_id }) => {
  const accessViewTable = useRef(null);

  useEffect(() => {
    const raw_data = Object.values(allUsersAccess[user_id].access);

    const emptyTableMsg =
      typeof allUsersAccess[user_id].error_code != "undefined"
        ? `${allUsersAccess[user_id].error_msg} / error code ${
            allUsersAccess[user_id].error_code
          }`
        : "No existing access was found or account might not have existed";

    const table = $(accessViewTable.current).DataTable({
      data: raw_data,
      columns: [
        { title: "Group Name", data: "name" },
        { title: "Group Detail", data: "description" }
      ],
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      orderData: 0,
      retrieve: true,
      language: {
        emptyTable: emptyTableMsg
      }
    });

    return function CleanUp() {
      table.destroy();
    };
  }, []);

  return (
    <table
      ref={accessViewTable}
      className="table table-striped table-hover"
      style={{ width: "100%" }}
    />
  );
};

AccessTableView.propTypes = {
  allUsersAccess: PropTypes.object.isRequired,
  user_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  allUsersAccess: state.totalAccessView.allUsersAccess
});

export default connect(
  mapStateToProps,
  null
)(AccessTableView);
