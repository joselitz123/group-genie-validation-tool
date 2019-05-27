import { SET_INPUT_USERS_FIELD } from "./actionTypes";

export const setInputUsersField = input => dispatch => {

  dispatch({
    type: SET_INPUT_USERS_FIELD,
    payload: input.target.value
  })

};
