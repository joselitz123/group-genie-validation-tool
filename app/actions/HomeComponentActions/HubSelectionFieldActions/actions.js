import { SET_SELECTED_HUB_REGION } from "./actionTypes";
import { SET_GROUPS_SELECTED_IN_FIELDBOX } from "../GroupFiltersSelectionBoxActions/actionTypes";

export const setHubRegion = input => dispatch => {
  dispatch({
    type: SET_SELECTED_HUB_REGION,
    payload: input
  });
};
