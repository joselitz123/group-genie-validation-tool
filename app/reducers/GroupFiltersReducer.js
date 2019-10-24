/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { createSelector } from "reselect";
import {
  SET_GROUP_FILTERS,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  DELETE_GROUP_FILTER,
  DELETE_GROUP_FILTER_CHILD,
  UPDATE_FILTER,
  UPDATE_FILTER_CHILD
} from "../actions/groupFiltersActions/actionTypes";
import { setStorageData } from "../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import { useDenormalizeData, useNormalizeData } from "../constants/schema";

const initialState = {
  entities: {},
  result: []
};

export default function groupFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUP_FILTERS:
      const data =
        state.result.length === 0
          ? [action.payload]
          : [
              action.payload,
              ...useDenormalizeData(state.result, state.entities)
            ];

      const normalizedData = useNormalizeData(data);

      setStorageData(normalizedData);

      return normalizedData;

    case LOAD_LOCAL_STORAGE_FILTERS:
      return action.payload;

    case REARRANGE_GROUP_FILTERS:
      const arrResults = [...action.payload, ...state.result];

      const objectData = arrResults.reduce(
        (allData, curData) => ({
          ...allData,
          [curData]: curData
        }),
        {}
      );

      return { ...state, result: Object.values(objectData) };

    case DELETE_GROUP_FILTER:
      console.log(action.payload);

      return state;

    default:
      return state;
  }
}

const getGroupFilters = state =>
  useDenormalizeData(
    state.groupFiltersReducer.result,
    state.groupFiltersReducer.entities
  );
const getSelectedHubRegion = state => state.inputFieldReducers.hubRegionField;
const getSelectedHubRegionForFilter = state =>
  state.hubSelectionFieldReducer.hubSelected;

// This is for the validation setup page selector
export const selectedHubFilters = createSelector(
  [getGroupFilters, getSelectedHubRegion],
  (groupFilters, selectedHubRegion) => {
    const data = groupFilters.reduce(
      (allFilters, curFilter) =>
        curFilter.hub_region === selectedHubRegion
          ? [...allFilters, curFilter]
          : allFilters,
      []
    );

    return data;
  }
);

export const unSelectedHubFilters = createSelector(
  [getGroupFilters, getSelectedHubRegion],
  (groupFilters, selectedHubRegion) =>
    groupFilters.filter(filter => filter.hub_region !== selectedHubRegion)
);

// This is for home page setup selector
export const selectedHubRegionFilters = createSelector(
  [getGroupFilters, getSelectedHubRegionForFilter],
  (groupFilters, selectedHubRegion) => {
    const data = groupFilters.reduce(
      (allFilters, curFilter) =>
        curFilter.hub_region === selectedHubRegion
          ? [...allFilters, curFilter]
          : allFilters,
      []
    );

    return data;
  }
);
