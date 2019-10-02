import { createSelector } from "reselect";
import { LOAD_VALIDATION_RESULT } from "../../actions/HomeComponentActions/TriggerValidate/actionTypes";

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
const getGroupFilters = state => state.groupFiltersReducer.group_filters;

export const selectedFilters = createSelector(
  [getSelectedGroupFilterIds, getGroupFilters],
  (selectedGroupFilterIds, groupFilters) => {
    const groupFilterObjects = selectedGroupFilterIds.reduce(
      (prevState, curState) => [...prevState, groupFilters[curState]],
      []
    );

    return groupFilterObjects;
  }
);
