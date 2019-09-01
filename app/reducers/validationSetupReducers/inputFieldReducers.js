import {
  SET_GROUP_ALIAS,
  SET_GROUP_NAME,
  SET_HUB_REGION,
  TRIGGER_ERROR_ON_GROUP_NAME
} from "../../actions/validationSetupActions/actionTypes";

const initialState = {
  hubRegionField: "",
  groupNameField: "",
  groupNameFieldErrorMsg: "",
  groupAliasField: "",
  hubRegions: {
    AMA: {
      name: 'AMA',
      value: 'ama'
    },
    LA: {
      name: 'LA',
      value: 'la'
    },
    NA: {
      name: 'NA',
      value: 'na'
    },
    EU: {
      name: 'EU',
      value: 'eu'
    },
    JP: {
      name: 'JP',
      value: 'jp'
    }
  }
};

export default function inputFieldReducers(state = initialState, action) {
  switch (action.type) {
    case SET_GROUP_ALIAS:
      return { ...state, groupAliasField: action.payload };

    case SET_GROUP_NAME:
      return { ...state, groupNameField: action.payload };
    
    case SET_HUB_REGION:
      return { ...state, hubRegionField: action.payload };

    case TRIGGER_ERROR_ON_GROUP_NAME:

      return {...state, groupNameFieldErrorMsg: action.payload}

    default:
      return state;
  }
}
