import { createSelector } from "reselect";
import { LOAD_VALIDATION_RESULT } from "../../actions/HomeComponentActions/TriggerValidate/actionTypes";
import { useDenormalizeData } from "../../constants/schema";

const initialState = {
  validationResult: {}
};

export default function validationReducer(state = initialState, action) {
  if (action.type === LOAD_VALIDATION_RESULT) {
    return { ...state, validationResult: action.payload };
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
