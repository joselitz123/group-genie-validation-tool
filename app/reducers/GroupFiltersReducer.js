/* eslint-disable no-fallthrough */
import { createSelector } from "reselect";
import {
  SET_GROUP_FILTERS,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  DELETE_GROUP_FILTER,
  UPDATE_FILTER
} from "../actions/groupFiltersActions/actionTypes";

const initialState = {
  group_filters: {}
};
import { setStorageData } from "../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";

export default function groupFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_GROUP_FILTER:
      const { [action.payload]: value, ...restData } = state.group_filters;
      console.log("executed");
      setStorageData({ ...state, group_filters: restData });

      return { ...state, group_filters: restData };

    case REARRANGE_GROUP_FILTERS:
      setStorageData({
        ...state,
        group_filters: { ...action.payload, ...state.group_filters }
      });

      return {
        ...state,
        group_filters: { ...action.payload, ...state.group_filters }
      };

    case LOAD_LOCAL_STORAGE_FILTERS:
      setStorageData({ ...state, group_filters: action.payload });

      return { ...state, group_filters: action.payload };

    case SET_GROUP_FILTERS:
      setStorageData({
        ...state,
        group_filters: { ...action.payload, ...state.group_filters }
      });
      console.table({
        ...state,
        group_filters: { ...action.payload, ...state.group_filters }
      });

      return {
        ...state,
        group_filters: { ...action.payload, ...state.group_filters }
      };
    case UPDATE_FILTER:
      setStorageData({
        ...state,
        group_filters: {
          ...state.group_filters,
          [action.payload.id]: {
            ...state.group_filters[action.payload.id],
            group_alias: action.payload.data.group_alias,
            description: action.payload.data.description
          }
        }
      });

      return {
        ...state,
        group_filters: {
          ...state.group_filters,
          [action.payload.id]: {
            ...state.group_filters[action.payload.id],
            group_alias: action.payload.data.group_alias,
            description: action.payload.data.description
          }
        }
      };
    default:
      return state;
  }
}

const getGroupFilters = state =>
  Object.values(state.groupFiltersReducer.group_filters);
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
