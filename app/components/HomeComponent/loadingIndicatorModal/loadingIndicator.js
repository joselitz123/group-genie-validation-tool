// @flow
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Progress } from "reactstrap";
import { config } from "react-spring";
import { Spring } from "react-spring/renderprops";
import Button from "@material-ui/core/Button";
import {
  closeModal,
  resetLoaderUIState
} from "../../../actions/HomeComponentActions/TriggerValidate/actions";
import ModalBodyComponent from "../../ReusableComponent/ModalComponent/ModalBodyComponent";
import ModalFooterComponent from "../../ReusableComponent/ModalComponent/ModalFooterComponent";

type Props = {
  totalUsers: number,
  currentExtractCount: number,
  axiosCancelToken: Object,
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
      <ModalBodyComponent>
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
      </ModalBodyComponent>
      <ModalFooterComponent>
        <Button
          onClick={cancelbuttonHandler}
          size="small"
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
      </ModalFooterComponent>
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
