import { SET_GROUPS_SELECTED_IN_FIELDBOX } from "./actionTypes";
import React from "react";

export const setSelectedGroupInFieldBox = input => dispatch => {
  let selectedIds = [];

  const options = input.target.options;
  
  for (let index = 0; index <= options.length - 1; index++) {
    
    options[index].selected ? selectedIds.push(options[index].value) : '';
    
  }

  dispatch({
    type: SET_GROUPS_SELECTED_IN_FIELDBOX,
    payload: selectedIds
  });
};
