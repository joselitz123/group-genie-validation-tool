import { createSelector } from "reselect";
import {
  LOAD_VALIDATION_RESULT,
  SET_SHOW_MODAL_INFO
} from "../../actions/HomeComponentActions/TriggerValidate/actionTypes";
import { useDenormalizeData } from "../../constants/schema";

const initialState = {
  validationResult: {},
  showModalInfo: false
};

export default function validationReducer(state = initialState, action) {
  if (action.type === LOAD_VALIDATION_RESULT) {
    return { ...state, validationResult: action.payload };
  } else if (action.type === SET_SHOW_MODAL_INFO) {
    return { ...state, showModalInfo: action.payload };
  }
  return state;
}

const getSelectedGroupFilterIds = state =>
  state.groupFiltersSelectionBoxReducer.groupsSelected;
const getGroupFilters = state =>
  useDenormalizeData(
    state.groupFiltersReducer.result,
    state.groupFiltersReducer.entities
  );

export const selectedFilters = createSelector(
  [getSelectedGroupFilterIds, getGroupFilters],
  (selectedGroupFilterIds, groupFilters) => {
    const groupFilterObjects = selectedGroupFilterIds.reduce(
      (prevState, curState) => {
        const indexedFilters = groupFilters.reduce(
          (allData, curData) => ({ ...allData, [curData.id]: curData }),
          {}
        );
        return [...prevState, indexedFilters[curState]];
      },
      []
    );

    return groupFilterObjects;
  }
);
