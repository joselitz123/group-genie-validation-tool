/* eslint-disable no-unused-vars */
import uuid from "uuid/v4";
import {
  SET_GROUP_FILTERS,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  REARRANGE_GROUP_CHILD_FILTERS,
  DELETE_GROUP_FILTER,
  UPDATE_FILTER,
  UPDATE_FILTER_CHILD,
  DELETE_GROUP_FILTER_CHILD
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

export const changeGroupFilterArrangement = changedData => dispatch => {
  dispatch({
    type: REARRANGE_GROUP_FILTERS,
    payload: changedData
  });
};

export const changeGroupChildFilterArrangement = changedData => dispatch => {
  dispatch({
    type: REARRANGE_GROUP_CHILD_FILTERS,
    payload: changedData
  });
};

export const deleteGroupFilter = data => dispatch => {
  dispatch({
    type: DELETE_GROUP_FILTER,
    payload: data
  });
};

export const deleteGroupFilterChild = data => dispatch => {
  dispatch({
    type: DELETE_GROUP_FILTER_CHILD,
    payload: data
  });
};

export const updateFilter = data => dispatch => {
  if (data.data.$deep === 1) {
    dispatch({ type: UPDATE_FILTER, payload: data });
  } else {
    dispatch({ type: UPDATE_FILTER_CHILD, payload: data });
  }
};
