// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import inputFieldReducers from './validationSetupReducers/inputFieldReducers';
import groupFiltersReducer from './GroupFiltersReducer';
import groupFiltersSelectionBoxReducer from './HomeComponentReducers/GroupFiltersSelectionBoxReducer';
import usersFieldBoxReducer from './HomeComponentReducers/UsersFieldBoxReducer';
import validationReducer from './ValidationReducer/ValidationReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    inputFieldReducers: inputFieldReducers,
    groupFiltersReducer: groupFiltersReducer,
    groupFiltersSelectionBoxReducer: groupFiltersSelectionBoxReducer,
    usersFieldBoxReducer: usersFieldBoxReducer,
    validationReducer: validationReducer
  });
}
