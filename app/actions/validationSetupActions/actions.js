import {
  TRIGGER_ERROR_ON_GROUP_NAME,
  TOGGLE_FORM_MODAL,
  RESET_FORM_MODAL,
  VAL_SETUP_INPUT_HANDLER,
  HUB_REGION_INPUT_HANDLER,
  RESET_FORM_MODAL_FIELD,
  SET_IS_VALIDATING_STATUS
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

export const setIsValidatingStatus = input => dispatch => {
  dispatch({
    type: SET_IS_VALIDATING_STATUS,
    payload: input
  });
};

export const hubRegionInputHandler = input => dispatch => {
  dispatch({
    type: HUB_REGION_INPUT_HANDLER,
    payload: input
  });
};

export const resetFormModalFields = () => dispatch => {
  dispatch({
    type: RESET_FORM_MODAL_FIELD,
    payload: null
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
