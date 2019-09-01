import {
  SET_GROUP_FILTERS,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  DELETE_GROUP_FILTER
} from "./actionTypes";
import { setStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import uuid from "uuid/v4";

export const setGroupFilters = (
  hubRegion,
  groupName,
  groupAlias,
  filters
) => dispatch => {

  const id = uuid();
  const groupFilterData = {
    [id]: {
      id: id,
      hub_region: hubRegion,
      group_name: groupName,
      group_alias: groupAlias
    },
    ...filters
  };

  dispatch({
    type: SET_GROUP_FILTERS,
    payload: groupFilterData
  });

  setStorageData(groupFilterData);
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
export const changeGroupFilterArrangement = (e, hubRegionFilter, unSelectedFilters) => dispatch => {
  const restructuredData = DataRestructurer(e, hubRegionFilter, unSelectedFilters);

  dispatch({
    type: REARRANGE_GROUP_FILTERS,
    payload: restructuredData
  });

  setStorageData(restructuredData);
};

const DataRestructurer = (e, hubRegionFilter, unSelectedFilters) => {
  const { draggableId, destination, source } = e;
  
  const removedData = hubRegionFilter.splice(source.index, 1);

  hubRegionFilter.splice(destination.index, 0, removedData[0]);

  const wholeData = [...hubRegionFilter, ...unSelectedFilters];

  const restructuredData = wholeData.reduce((prevData, curData) => {
    return { ...prevData, [curData.id]: curData };
  }, {});

  return restructuredData;
};


export const deleteGroupFilter = (id, rawData) => dispatch => {


  const {[id]: value, ...restGroups} = rawData;

  dispatch({
    type: DELETE_GROUP_FILTER,
    payload: restGroups
  });

  setStorageData(restGroups);
  
}