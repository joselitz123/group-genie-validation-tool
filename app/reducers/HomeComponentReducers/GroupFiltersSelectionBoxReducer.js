import { SET_GROUPS_SELECTED_IN_FIELDBOX } from "../../actions/HomeComponentActions/GroupFiltersSelectionBoxActions/actionTypes";

const intialState = {
  groupsSelected: []
};

export default function groupFiltersSelectionBoxReducer(
  state = intialState,
  action
) {
  if (action.type == SET_GROUPS_SELECTED_IN_FIELDBOX) {
    return { ...state, groupsSelected: action.payload };
  } else {
    return state;
  }
}
