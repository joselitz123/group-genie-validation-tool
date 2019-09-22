import { SET_INPUT_USERS_FIELD } from "./actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const setInputUsersField = input => dispatch => {
  dispatch({
    type: SET_INPUT_USERS_FIELD,
    payload: input.target.value
  });
};
