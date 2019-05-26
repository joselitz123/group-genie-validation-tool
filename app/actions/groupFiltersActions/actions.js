import {
  SET_GROUP_FILTERS,
  LOAD_LOCAL_STORAGE_FILTERS,
  REARRANGE_GROUP_FILTERS,
  DELETE_GROUP_FILTER
} from "./actionTypes";
import { setStorageData } from "../../LocalStorage/ValidationSetupLocalStorage/ValidationSetupLocalStorage";
import uuid from "uuid/v4";

export const setGroupFilters = (
  e,
  groupName,
  groupAlias,
  groupFilters
) => dispatch => {
  e.preventDefault();

  const id = uuid();
  const groupFilterData = {
    [id]: {
      id: id,
      group_name: groupName,
      group_alias: groupAlias
    },
    ...groupFilters
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
export const changeGroupFilterArrangement = (e, data) => dispatch => {
  const restructuredData = DataRestructurer(e, data);

  dispatch({
    type: REARRANGE_GROUP_FILTERS,
    payload: restructuredData
  });

  setStorageData(restructuredData);
};

const DataRestructurer = (e, data) => {
  const { draggableId, destination, source } = e;

  const dataArray = Object.values(data);

  const removedData = dataArray.splice(source.index, 1);

  dataArray.splice(destination.index, 0, removedData[0]);

  const restructuredData = dataArray.reduce((prevData, curData) => {
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