// @flow
import React from "react";
import axios from "axios";
import {
  LOAD_VALIDATION_RESULT,
  SHOW_MODAL_LOADER,
  LOAD_TOTAL_USERS_TO_EXTRACT,
  INCREMENT_EXTRACT_COUNT,
  RESET_LOADER_UI_STATE,
  LOAD_ALL_USERS_ACCESS,
  IS_ERROR_OCCURED,
  SET_CANCEL_TOKEN
} from "./actionTypes";
import fs from "fs";
import path from "path";
import type { Dispatch } from "../../../reducers/types";
import type { accountAccess } from "../../../constants/flowInterfaces";

export const promptError = (is_error_occured: Boolean, error_msg: string) => (
  dispatch: Dispatch
): void => {
  dispatch({
    type: IS_ERROR_OCCURED,
    payload: {
      is_error_occured: is_error_occured,
      error_msg: error_msg
    }
  });
};

export const incrementExtractCount = () => (dispatch: Dispatch): void => {
  dispatch({
    type: INCREMENT_EXTRACT_COUNT
  });
};

export const closeModal = () => (dispatch: Dispatch): void => {
  dispatch({
    type: SHOW_MODAL_LOADER,
    payload: false
  });
};

export const showModal = () => (dispatch: Dispatch): void => {
  dispatch({
    type: SHOW_MODAL_LOADER,
    payload: true
  });
};

export const resetLoaderUIState = () => (dispatch: Dispatch): void => {
  dispatch({
    type: RESET_LOADER_UI_STATE
  });
};

export const loadAllUserAccess = (data: { [key: string]: accountAccess }) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: LOAD_ALL_USERS_ACCESS,
    payload: data
  });
};

export const loadTotalCountUsers = (count: number) => (
  dispatch: Dispatch
): void => {
  dispatch({
    type: LOAD_TOTAL_USERS_TO_EXTRACT,
    payload: count
  });
};

export const loadValidationResult = (val_result: {
  [keys: string]: {
    user: string,
    access: { [keys: string]: { val_result: boolean, group_alias: string } }
  }
}) => (dispatch: Dispatch): void => {
  dispatch({
    type: LOAD_VALIDATION_RESULT,
    payload: val_result
  });
};

export const setCancelToken = (cancelToken: {}) => (
  dispatch: Dispatch
): void => {
  dispatch({
    type: SET_CANCEL_TOKEN,
    payload: cancelToken
  });
};
