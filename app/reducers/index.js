// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import inputFieldReducers from './validationSetupReducers/inputFieldReducers';
import groupFiltersReducer from './GroupFiltersReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    inputFieldReducers: inputFieldReducers,
    groupFiltersReducer: groupFiltersReducer
  });
}
