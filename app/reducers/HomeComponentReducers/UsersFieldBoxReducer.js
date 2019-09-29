import { SET_INPUT_USERS_FIELD } from "../../actions/HomeComponentActions/UsersFieldBoxActions/actionTypes";

const initialState = {
  input: ""
};

export default function usersFieldBoxReducer(state = initialState, action) {
  if (action.type === SET_INPUT_USERS_FIELD) {
    return { ...state, input: action.payload };
    // eslint-disable-next-line no-else-return
  } else {
    return state;
  }
}
