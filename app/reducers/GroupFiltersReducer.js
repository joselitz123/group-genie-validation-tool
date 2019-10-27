/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import {
  SET_GROUP_FILTERS,
  ADD_GROUPS_TO_EXISTING_COLLECTION_GROUP,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  REARRANGE_GROUP_CHILD_FILTERS,
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
      const groupFiltersData =
        state.result.length === 0
          ? [action.payload]
          : [
              action.payload,
              ...useDenormalizeData(state.result, state.entities)
            ];

      const normalizedData = useNormalizeData(groupFiltersData);

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

      const reArrageGroupData = { ...state, result: Object.values(objectData) };

      setStorageData(reArrageGroupData);

      return reArrageGroupData;
    // return state;

    case DELETE_GROUP_FILTER:
      const arr_id = useDenormalizeData(state.result, state.entities).reduce(
        (allData, curData) => ({ ...allData, [curData.id]: curData }),
        {}
      );

      const { [action.payload.id]: value, ...restData } = arr_id;

      setStorageData(useNormalizeData(restData));

      return useNormalizeData(restData);

    case DELETE_GROUP_FILTER_CHILD:
      const childData = state.entities.groupFilter[action.payload.parentId];

      const childDataArr = childData.child.filter(
        curData => curData !== action.payload.id
      );

      const {
        [action.payload.id]: valueData,
        ...restChildData
      } = state.entities.childFilter;

      const deleteChildDataState = {
        ...state,
        entities: {
          childFilter: restChildData,
          groupFilter: {
            ...state.entities.groupFilter,
            [action.payload.parentId]: {
              ...state.entities.groupFilter[action.payload.parentId],
              child: childDataArr
            }
          }
        }
      };

      setStorageData(deleteChildDataState);

      return deleteChildDataState;

    case UPDATE_FILTER:
      const updateFilterData = {
        ...state,
        entities: {
          ...state.entities,
          groupFilter: {
            ...state.entities.groupFilter,
            [action.payload.id]: {
              ...state.entities.groupFilter[action.payload.id],
              [action.payload.key]: action.payload.value
            }
          }
        }
      };

      setStorageData(updateFilterData);

      return updateFilterData;

    case UPDATE_FILTER_CHILD:
      const updateFilterChildData = {
        ...state,
        entities: {
          ...state.entities,
          childFilter: {
            ...state.entities.childFilter,
            [action.payload.id]: {
              ...state.entities.childFilter[action.payload.id],
              [action.payload.key]: action.payload.value
            }
          }
        }
      };

      setStorageData(updateFilterChildData);

      return updateFilterChildData;

    case REARRANGE_GROUP_CHILD_FILTERS:
      const childIds = action.payload.reduce(
        (allData, curData) => [...allData, curData.id],
        []
      );

      const selectedParentId = action.payload[0].parentId;

      const reArrangedGroupChildData = {
        ...state,
        entities: {
          ...state.entities,
          groupFilter: {
            ...state.entities.groupFilter,
            [selectedParentId]: {
              ...state.entities.groupFilter[selectedParentId],
              child: childIds
            }
          }
        }
      };

      return reArrangedGroupChildData;
    case ADD_GROUPS_TO_EXISTING_COLLECTION_GROUP:
      const { data, parentId } = action.payload;
      const addGroupsToExistingCollectionGroupData = {
        ...state,
        entities: {
          ...state.entities,
          childFilter: { ...state.entities.childFilter, ...data },
          groupFilter: {
            ...state.entities.groupFilter,
            [parentId]: {
              ...state.entities.groupFilter[parentId],
              child: [
                ...Object.keys(data),
                ...state.entities.groupFilter[parentId].child
              ]
            }
          }
        }
      };

      console.log(addGroupsToExistingCollectionGroupData);

      return addGroupsToExistingCollectionGroupData;

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

export const hubRegionCollectionGroups = createSelector(
  [getGroupFilters, getSelectedHubRegion],
  (groupFilters, selectedHubRegion) => {
    const data = groupFilters.reduce((allFilters, curFilter) => {
      if (curFilter.hub_region === selectedHubRegion) {
        if (typeof curFilter.child !== "undefined") {
          console.log(curFilter);
          return [
            ...allFilters,
            { value: curFilter.id, name: curFilter.group_alias }
          ];
        }
        return allFilters;
      }

      return allFilters;
    }, []);

    return data;
  }
);
