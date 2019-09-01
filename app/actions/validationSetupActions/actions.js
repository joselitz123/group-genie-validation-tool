import {
  SET_GROUP_ALIAS,
  SET_GROUP_NAME,
  SET_HUB_REGION,
  TRIGGER_ERROR_ON_GROUP_NAME
} from "./actionTypes";

export const groupAliasInputHandler = input => dispatch => {
  dispatch({
    type: SET_GROUP_ALIAS,
    payload: input
  });
};

export const groupNameInputHandler = input => dispatch => {
  dispatch({
    type: SET_GROUP_NAME,
    payload: input
  });
};

export const hubRegionInputHandler = input => dispatch => {
  dispatch({
    type: SET_HUB_REGION,
    payload: input
  });
};

export const triggerErrorOnGroupName = errorMsg => dispatch => {
  dispatch({
    type: TRIGGER_ERROR_ON_GROUP_NAME,
    payload: errorMsg
  });
};
