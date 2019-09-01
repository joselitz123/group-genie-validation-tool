// @flow

import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Progress } from "reactstrap";
import { connect } from "react-redux";
import { useSpring, config } from "react-spring";
import { Spring } from "react-spring/renderprops";
import {
  closeModal,
  resetLoaderUIState
} from "../../../actions/HomeComponentActions/TriggerValidate/actions";
import PropTypes from "prop-types";
import LoadingIndicator from "./loadingIndicator";
import ErrorIndicator from "./errorIndicator";

type Props = {
  showModal: boolean,
  closeModal: typeof closeModal,
  resetLoaderUIState: typeof resetLoaderUIState,
  validationResult: {},
  isErrorOccured: boolean
};

const LoadingIndicatorModal = (props: Props) => {
  const {
    showModal,
    closeModal,
    resetLoaderUIState,
    validationResult,
    isErrorOccured
  } = props;

  useEffect(() => {
    setTimeout(() => {
      closeModal();

      setTimeout(() => {
        resetLoaderUIState();
      }, 500);
    }, 1000);
  }, [validationResult]);

  return (
    <Modal className="loading_indicator" centered={true} isOpen={showModal}>
      {isErrorOccured == false ? <LoadingIndicator /> : <ErrorIndicator />}
    </Modal>
  );
};

LoadingIndicatorModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  resetLoaderUIState: PropTypes.func.isRequired,
  validationResult: PropTypes.object.isRequired,
  isErrorOccured: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  showModal: state.loadingIndicatorReducer.showModal,
  isErrorOccured: state.loadingIndicatorReducer.is_error_occured,
  validationResult: state.validationReducer.validationResult
});

export default connect(
  mapStateToProps,
  { closeModal, resetLoaderUIState }
)(LoadingIndicatorModal);
