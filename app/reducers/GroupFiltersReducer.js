import {
  SET_GROUP_FILTERS,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  DELETE_GROUP_FILTER
} from "../actions/groupFiltersActions/actionTypes";
import { createSelector } from "reselect";

const initialState = {
  group_filters: {}
};

export default function groupFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_GROUP_FILTER:
    case REARRANGE_GROUP_FILTERS:

    case LOAD_LOCAL_STORAGE_FILTERS:
      return { ...state, group_filters: action.payload };

    case SET_GROUP_FILTERS:
      return {
        ...state,
        group_filters: { ...action.payload, ...state.group_filters }
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
    const data = groupFilters.reduce((allFilters, curFilter) => {
      return curFilter.hub_region == selectedHubRegion
        ? [...allFilters, curFilter]
        : allFilters;
    }, []);

    return data;
  }
);

export const unSelectedHubFilters = createSelector(
  [getGroupFilters, getSelectedHubRegion],
  (groupFilters, selectedHubRegion) =>
    groupFilters.filter(filter => filter.hub_region != selectedHubRegion)
);

// This is for home page setup selector
export const selectedHubRegionFilters = createSelector(
  [getGroupFilters, getSelectedHubRegionForFilter],
  (groupFilters, selectedHubRegion) => {
    const data = groupFilters.reduce((allFilters, curFilter) => {
      return curFilter.hub_region == selectedHubRegion
        ? [...allFilters, curFilter]
        : allFilters;
    }, []);

    return data;
  }
);
