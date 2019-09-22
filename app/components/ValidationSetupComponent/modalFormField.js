// @flow
import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import ModalComponent from "../ReusableComponent/ModalComponent/ModalComponent";
import ModalHeaderComponent from "../ReusableComponent/ModalComponent/ModalHeaderComponent";
import ModalBodyComponent from "../ReusableComponent/ModalComponent/ModalBodyComponent";
import ModalFooterComponent from "../ReusableComponent/ModalComponent/ModalFooterComponent";
import ButtonComponent from "../ReusableComponent/ButtonComponent/ButtonComponent";
import FormFields from "./formFields";
import {
  toggleFormModal,
  resetFormModal,
  valSetupInputHandler
} from "../../actions/validationSetupActions/actions";

const useStyles = makeStyles({
  loaderUI: {
    position: "absolute",
    left: "57px",
    top: "17px",
    marginTop: -12,
    marginLeft: -12
  }
});

type Props = {
  showModal: boolean,
  toggleFormModal: function,
  resetFormModal: function,
  groupType: number,
  valSetupInputHandler: function
};

const ModalFormField = (props: Props) => {
  const {
    showModal,
    toggleFormModal,
    resetFormModal,
    groupType,
    valSetupInputHandler
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);

  const classes = useStyles();

  const modalComponentProps = {
    className: "validation-modal",
    isOpen: showModal,
    size: "md"
  };

  const addButtonComponentProps = {
    color: "primary",
    size: "small",
    type: "submit",
    variant: "contained"
  };

  const cancelButtonComponentProps = {
    color: "secondary",
    size: "small",
    type: "button",
    variant: "contained"
  };

  React.useEffect(() => {
    valSetupInputHandler({ target: { value: "", name: "groupNameField" } });
    valSetupInputHandler({ target: { value: "", name: "groupAliasField" } });
  }, [groupType]);

  const submitHandler = e => {
    e.preventDefault();

    console.log("submitted");
  };

  const resetFormHandler = () => {
    resetFormModal();
    toggleFormModal(false);
  };

  return (
    <ModalComponent {...modalComponentProps}>
      <ModalHeaderComponent>Add Filter</ModalHeaderComponent>
      <form onSubmit={submitHandler}>
        <ModalBodyComponent>
          <FormFields />
        </ModalBodyComponent>
        <ModalFooterComponent>
          <ButtonComponent
            onClick={resetFormHandler}
            {...cancelButtonComponentProps}
          >
            <i className="material-icons">clear</i>Cancel
          </ButtonComponent>
          <ButtonComponent {...addButtonComponentProps}>
            <i className="material-icons">check</i>Add
          </ButtonComponent>
          {loading && (
            <CircularProgress size={24} className={classes.loaderUI} />
          )}
        </ModalFooterComponent>
      </form>
    </ModalComponent>
  );
};

ModalFormField.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleFormModal: PropTypes.func.isRequired,
  resetFormModal: PropTypes.func.isRequired,
  groupType: PropTypes.number.isRequired,
  valSetupInputHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  showModal: state.validationSetupReducer.showModal,
  groupType: state.inputFieldReducers.groupTypeField
});

export default connect(
  mapStateToProps,
  {
    toggleFormModal,
    resetFormModal,
    valSetupInputHandler
  }
)(ModalFormField);
