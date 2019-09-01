import { SET_SELECTED_HUB_REGION } from "../../actions/HomeComponentActions/HubSelectionFieldActions/actionTypes";

const intialState = {
  hubSelected: ""
};

export default function hubSelectionFieldReducer(state = intialState, action) {
  if (action.type == SET_SELECTED_HUB_REGION) {
    return { ...state, hubSelected: action.payload };
  } 
    return state;
  
}
