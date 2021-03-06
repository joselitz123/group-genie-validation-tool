// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import inputFieldReducers from "./validationSetupReducers/inputFieldReducers";
import groupFiltersReducer from "./GroupFiltersReducer";
import groupFiltersSelectionBoxReducer from "./HomeComponentReducers/GroupFiltersSelectionBoxReducer";
import usersFieldBoxReducer from "./HomeComponentReducers/UsersFieldBoxReducer";
import loadingIndicatorReducer from "./HomeComponentReducers/LoadingIndicatorReducer";
import validationReducer from "./ValidationReducer/ValidationReducer";
import totalAccessView from "./TotalAccesViewReducer/TotalAccessView";
import hubSelectionFieldReducer from "./HomeComponentReducers/HubSelectionFieldReducer";

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    inputFieldReducers,
    groupFiltersReducer,
    groupFiltersSelectionBoxReducer,
    validationReducer,
    usersFieldBoxReducer,
    loadingIndicatorReducer,
    totalAccessView,
    hubSelectionFieldReducer
  });
}
