// @flow

import React, { useState, useEffect } from "react";
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
import ModalComponent from "../../ReusableComponent/ModalComponent/ModalComponent";

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
    <ModalComponent isOpen={showModal} size="md">
      {isErrorOccured == false ? <LoadingIndicator /> : <ErrorIndicator />}
    </ModalComponent>
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
