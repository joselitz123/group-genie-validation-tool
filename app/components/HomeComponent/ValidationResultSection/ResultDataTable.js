/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { FancyGridReact } from "fancygrid-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import routes from "../../../constants/routes.json";

const ResultDataTable = ({ validationResult }) => {
  console.log(validationResult);

  const gridConfig = () => ({
    title: "Validation Result Table",
    height: 490,
    width: 1350,
    columns: [
      {
        index: "company",
        title: "User",
        type: "string",
        flex: 1
      }
      // {
      //   index: "name",
      //   title: "Name",
      //   type: "string",
      //   flex: 1
      // },
      // {
      //   index: "surname",
      //   title: "Sur Name",
      //   type: "string",
      //   flex: 1
      // },
      // {
      //   index: "age",
      //   title: "Age",
      //   type: "number",
      //   flex: 1
      // }
    ]
  });

  return <FancyGridReact config={gridConfig()} />;
};

ResultDataTable.propTypes = {
  validationResult: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  validationResult: state.validationReducer.validationResult
});

export default connect(mapStateToProps)(ResultDataTable);
