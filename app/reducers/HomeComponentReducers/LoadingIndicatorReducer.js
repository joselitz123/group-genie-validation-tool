import {
  SHOW_MODAL_LOADER,
  LOAD_TOTAL_USERS_TO_EXTRACT,
  INCREMENT_EXTRACT_COUNT,
  RESET_LOADER_UI_STATE,
  IS_ERROR_OCCURED,
  SET_CANCEL_TOKEN
} from "../../actions/HomeComponentActions/TriggerValidate/actionTypes";

const initialState = {
  showModal: false,
  totalUsers: 0,
  currentExtractCount: 0,
  is_error_occured: false,
  error_msg: "",
  cancelToken: {}
};

export default function loadingIndicatorReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL_LOADER:
      return { ...state, showModal: action.payload };

    case LOAD_TOTAL_USERS_TO_EXTRACT:
      return { ...state, totalUsers: action.payload };

    case INCREMENT_EXTRACT_COUNT:
      const inc_count = (state.currentExtractCount += 1);

      return { ...state, currentExtractCount: inc_count };

    case RESET_LOADER_UI_STATE:
      return {
        ...state,
        totalUsers: 0,
        currentExtractCount: 0,
        cancelToken: {},
        error_msg: "",
        is_error_occured: false,
        showModal: false
      };

    case IS_ERROR_OCCURED:
      return {
        ...state,
        is_error_occured: action.payload.is_error_occured,
        error_msg: action.payload.error_msg
      };

    case SET_CANCEL_TOKEN:
      return { ...state, cancelToken: action.payload };
    default:
      return state;
  }
}
