import {
  TRIGGER_ERROR_ON_GROUP_NAME,
  TOGGLE_FORM_MODAL,
  RESET_FORM_MODAL,
  VAL_SETUP_INPUT_HANDLER,
  HUB_REGION_INPUT_HANDLER
} from "./actionTypes";

export const valSetupInputHandler = input => dispatch => {
  const fieldName = input.target.name;
  const fieldValue = input.target.value;
  dispatch({
    type: VAL_SETUP_INPUT_HANDLER,
    payload: {
      fieldName,
      fieldValue
    }
  });
};

export const hubRegionInputHandler = input => dispatch => {
  dispatch({
    type: HUB_REGION_INPUT_HANDLER,
    payload: input
  });
};

export const triggerErrorOnGroupName = errorMsg => dispatch => {
  dispatch({
    type: TRIGGER_ERROR_ON_GROUP_NAME,
    payload: errorMsg
  });
};

export const toggleFormModal = input => dispatch => {
  dispatch({
    type: TOGGLE_FORM_MODAL,
    payload: input
  });
};

export const resetFormModal = () => dispatch => {
  dispatch({
    type: RESET_FORM_MODAL,
    payload: null
  });
};
