// @flow

import { LOAD_ALL_USERS_ACCESS } from "../../actions/HomeComponentActions/TriggerValidate/actionTypes";

type state = {
  allUsersAccess: {}
};

const intitialState = {
  allUsersAccess: {}
};

export default function totalAccessView(
  state: state = intitialState,
  action: { type: "LOAD_ALL_USERS_ACCESS", payload: Array<{}> }
) {
  if (action.type == LOAD_ALL_USERS_ACCESS) {
    return { ...state, allUsersAccess: action.payload };
  } else {
    return state;
  }
}
