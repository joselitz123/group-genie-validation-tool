import { SET_GROUPS_SELECTED_IN_FIELDBOX } from "./actionTypes";
import React from "react";

export const setSelectedGroupInFieldBox = input => dispatch => {
  dispatch({
    type: SET_GROUPS_SELECTED_IN_FIELDBOX,
    payload: input
  });
};
