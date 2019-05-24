import {
  SET_GROUP_ALIAS,
  SET_GROUP_NAME
} from "../../actions/validationSetupActions/actionTypes";

const initialState = {
  groupNameField: "",
  groupAliasField: ""
};

export default function inputFieldReducers(state = initialState, action) {
  switch (action.type) {
    case SET_GROUP_ALIAS:
      return { ...state, groupAliasField: action.payload };

    case SET_GROUP_NAME:
      return { ...state, groupNameField: action.payload };

    default:
      return state;
  }
}
