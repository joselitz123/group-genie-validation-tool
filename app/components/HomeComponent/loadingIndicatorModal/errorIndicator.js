// @flow
import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetLoaderUIState } from "../../../actions/HomeComponentActions/TriggerValidate/actions";
import { red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";

type Props = {
  error_msg: string,
  resetLoaderUIState: typeof resetLoaderUIState
};

const ErrorIndicator = (props: Props) => {
  const { error_msg, resetLoaderUIState } = props;

  return (
    <Fragment>
      <div
        className="modal-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left"
        }}
      >
        <div>
          <Icon style={{ color: red[500] }}>warning</Icon>
        </div>
        <h5 style={{ paddingTop: "3px" }}>Encountered an issue!</h5>
      </div>
      <div className="modal-body" style={{ fontWeight: "bold" }}>
        <div style={{ fontWeight: "lighter", color: red[500] }}>
          {error_msg}
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn-sm btn btn-primary"
          onClick={() => resetLoaderUIState()}
        >
          Close
        </button>
      </div>
    </Fragment>
  );
};

ErrorIndicator.propTypes = {
  error_msg: PropTypes.string.isRequired,
  resetLoaderUIState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error_msg: state.loadingIndicatorReducer.error_msg
});

export default connect(
  mapStateToProps,
  { resetLoaderUIState }
)(ErrorIndicator);
