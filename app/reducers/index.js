// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import inputFieldReducers from './validationSetupReducers/inputFieldReducers';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    inputFieldReducers: inputFieldReducers
  });
}
