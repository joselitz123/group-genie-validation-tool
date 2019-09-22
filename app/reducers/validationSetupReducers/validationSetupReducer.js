import { TOGGLE_FORM_MODAL } from "../../actions/validationSetupActions/actionTypes";

const initialState = {
  showModal: false
};

export default function validationSetupReducer(state = initialState, action) {
  if (action.type === TOGGLE_FORM_MODAL) {
    return { ...state, showModal: action.payload };
  } else {
    return state;
  }
}
