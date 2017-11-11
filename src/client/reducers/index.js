import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

const State = combineReducers({
  users: usersReducer
});

export default State;
