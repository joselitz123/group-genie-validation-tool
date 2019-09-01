// @flow
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ModalBody, Progress, ModalFooter } from "reactstrap";
import { useSpring, config } from "react-spring";
import { Spring } from "react-spring/renderprops";
import Button from "@material-ui/core/Button";
import {
  closeModal,
  resetLoaderUIState
} from "../../../actions/HomeComponentActions/TriggerValidate/actions";

type Props = {
  totalUsers: number,
  currentExtractCount: number,
  axiosCancelToken: function,
  closeModal: typeof closeModal,
  resetLoaderUIState: typeof resetLoaderUIState
};

const LoadingIndicator = (props: Props) => {
  const {
    totalUsers,
    currentExtractCount,
    axiosCancelToken,
    closeModal,
    resetLoaderUIState
  } = props;

  const [loadPercent, setLoadPercent] = useState(0);

  useEffect(() => {
    const currentPercent: number =
      (currentExtractCount / totalUsers) * 100 || 0;

    setLoadPercent(currentPercent);
  }, [totalUsers, currentExtractCount]);

  const cancelbuttonHandler = () => {
    axiosCancelToken.cancel();
    resetLoaderUIState();
  };

  return (
    <Fragment>
      <ModalBody>
        <h5>
          Fetching {currentExtractCount} of {totalUsers}
        </h5>
        <Progress animated color="success" value={loadPercent}>
          <Spring
            config={config.default}
            from={{ number: 0 }}
            to={{ number: loadPercent }}
          >
            {props => Math.round(props.number)}
          </Spring>
          %
        </Progress>
      </ModalBody>
      <ModalFooter style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}>
        <Button
          onClick={cancelbuttonHandler}
          size="small"
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

LoadingIndicator.propTypes = {
  totalUsers: PropTypes.number.isRequired,
  currentExtractCount: PropTypes.number.isRequired,
  axiosCancelToken: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  resetLoaderUIState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  totalUsers: state.loadingIndicatorReducer.totalUsers,
  currentExtractCount: state.loadingIndicatorReducer.currentExtractCount,
  axiosCancelToken: state.loadingIndicatorReducer.cancelToken
});

export default connect(
  mapStateToProps,
  { closeModal, resetLoaderUIState }
)(LoadingIndicator);
