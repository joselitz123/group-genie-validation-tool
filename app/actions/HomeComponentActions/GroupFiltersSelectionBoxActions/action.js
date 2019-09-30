import { SET_GROUPS_SELECTED_IN_FIELDBOX } from "./actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const setSelectedGroupInFieldBox = input => dispatch => {
  console.table(input);
  dispatch({
    type: SET_GROUPS_SELECTED_IN_FIELDBOX,
    payload: input
  });
};
