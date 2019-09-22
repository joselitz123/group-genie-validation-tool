// @flow
import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import { resetLoaderUIState } from "../../../actions/HomeComponentActions/TriggerValidate/actions";
import ModalFooterComponent from "../../ReusableComponent/ModalComponent/ModalFooterComponent";
import ModalHeaderComponent from "../../ReusableComponent/ModalComponent/ModalHeaderComponent";
import ModalBodyComponent from "../../ReusableComponent/ModalComponent/ModalBodyComponent";

type Props = {
  errorMsg: string,
  resetLoaderUIState: typeof resetLoaderUIState
};

const ErrorIndicator = (props: Props) => {
  const { errorMsg, resetLoaderUIState } = props;

  return (
    <Fragment>
      <ModalHeaderComponent>
        <div>
          <Icon style={{ color: red[500] }}>warning</Icon>
        </div>
        <p style={{ paddingTop: "3px" }}>Encountered an issue!</p>
      </ModalHeaderComponent>
      <ModalBodyComponent>
        <div style={{ fontWeight: "lighter", color: red[500] }}>{errorMsg}</div>
      </ModalBodyComponent>
      <ModalFooterComponent>
        <button
          type="button"
          className="btn-sm btn btn-primary"
          onClick={() => resetLoaderUIState()}
        >
          Close
        </button>
      </ModalFooterComponent>
    </Fragment>
  );
};

ErrorIndicator.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  resetLoaderUIState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorMsg: state.loadingIndicatorReducer.error_msg
});

export default connect(
  mapStateToProps,
  { resetLoaderUIState }
)(ErrorIndicator);
