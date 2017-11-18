import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async dispatch => {
  const res = await axios.get('http://react-ssr-api.herokuapp.com/users');
  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

const LOGIN_USER = 'login_user';
export const loginUser = (email, password) => async dispatch => {
  const res = await axios.post('/api/login', {
    email,
    password
  });
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = fromServer => async (dispatch, getState) => {
  try {
    console.log('\ndid I get called on the server -- and did I work? da fuq');
    const res = await axios.get('/api/current_user');
  } catch (err) {
    console.log(err);
  }
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_PRIVATE_DATA = 'fetch_private_data';
export const fetchPrivateData = () => async (dispatch, getState) => {
  const res = await axios.get('/api/private_data');

  dispatch({
    type: FETCH_PRIVATE_DATA,
    payload: res
  });
};
