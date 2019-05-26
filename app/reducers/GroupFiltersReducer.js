import { SET_GROUP_FILTERS, LOAD_LOCAL_STORAGE_FILTERS, REARRANGE_GROUP_FILTERS, DELETE_GROUP_FILTER } from "../actions/groupFiltersActions/actionTypes";

const initialState = {
  group_filters: {}
};

export default function groupFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_GROUP_FILTER:
    case REARRANGE_GROUP_FILTERS:
    case SET_GROUP_FILTERS:
    case LOAD_LOCAL_STORAGE_FILTERS:

      return {...state, group_filters: action.payload};
  
    default:
      return state;
  }

}
