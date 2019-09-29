import {
  TRIGGER_ERROR_ON_GROUP_NAME,
  RESET_FORM_MODAL,
  VAL_SETUP_INPUT_HANDLER,
  HUB_REGION_INPUT_HANDLER,
  RESET_FORM_MODAL_FIELD,
  SET_IS_VALIDATING_STATUS
} from "../../actions/validationSetupActions/actionTypes";

const initialState = {
  hubRegionField: "ama",
  groupNameField: "",
  groupNameFieldErrorMsg: "",
  groupAliasField: "",
  groupTypeField: 1,
  groupNameTextArea: "",
  isValidating: false,
  hubRegions: {
    AMA: {
      name: "AMA",
      value: "ama"
    },
    LA: {
      name: "LA",
      value: "la"
    },
    NA: {
      name: "NA",
      value: "na"
    },
    EU: {
      name: "EU",
      value: "eu"
    },
    JP: {
      name: "JP",
      value: "jp"
    }
  },
  groupTypes: {
    single_group_type: {
      name: "Single Group Type",
      value: 1
    },
    multiple_group_type: {
      name: "Multiple Group Type",
      value: 2
    }
  }
};

export default function inputFieldReducers(state = initialState, action) {
  switch (action.type) {
    case TRIGGER_ERROR_ON_GROUP_NAME:
      return { ...state, groupNameFieldErrorMsg: action.payload };

    case RESET_FORM_MODAL:
      return {
        ...state,
        groupNameField: "",
        groupNameFieldErrorMsg: "",
        groupAliasField: "",
        groupTypeField: 1,
        groupNameTextArea: ""
      };
    case RESET_FORM_MODAL_FIELD:
      return {
        ...state,
        groupNameField: "",
        groupNameFieldErrorMsg: "",
        groupAliasField: "",
        groupNameTextArea: ""
      };

    case HUB_REGION_INPUT_HANDLER:
      return { ...state, hubRegionField: action.payload };

    case VAL_SETUP_INPUT_HANDLER:
      return {
        ...state,
        [action.payload.fieldName]: action.payload.fieldValue
      };

    case SET_IS_VALIDATING_STATUS:
      return {
        ...state,
        isValidating: action.payload
      };

    default:
      return state;
  }
}
