import { FETCH_PRIVATE_DATA } from '../actions';

export default (state = '', action) => {
  switch (action.type) {
    case FETCH_PRIVATE_DATA:
      return action.payload.data;
    default:
      return state;
  }
};
