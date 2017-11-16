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
  const res = await axios.post('/api', {
    email,
    password
  });
  console.log(res);
};
