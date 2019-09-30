/* eslint-disable no-unused-vars */
import uuid from "uuid/v4";
import {
  SET_GROUP_FILTERS,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  DELETE_GROUP_FILTER,
  UPDATE_FILTER
} from "./actionTypes";

export const setGroupFilters = (data, allFilters) => dispatch => {
  dispatch({
    type: SET_GROUP_FILTERS,
    payload: data
  });
};

export const loadLocalStorageGroupFilters = data => dispatch => {
  dispatch({
    type: LOAD_LOCAL_STORAGE_FILTERS,
    payload: data
  });
};

/**
 *
 * @param {Object} e - Contains props of the Drag Drop Context
 * @param {Object} data - Group filters list
 */
export const changeGroupFilterArrangement = changedData => dispatch => {
  dispatch({
    type: REARRANGE_GROUP_FILTERS,
    payload: changedData
  });
};

export const deleteGroupFilter = (restGroups, id) => dispatch => {
  dispatch({
    type: DELETE_GROUP_FILTER,
    payload: id
  });
};

export const updateFilter = data => dispatch => {
  dispatch({
    type: UPDATE_FILTER,
    payload: data
  });
};
