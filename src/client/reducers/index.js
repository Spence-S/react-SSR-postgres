import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import privateDataReducer from './privateDataReducer';

const State = combineReducers({
  users: usersReducer,
  auth: authReducer,
  privateData: privateDataReducer
});

export default State;
