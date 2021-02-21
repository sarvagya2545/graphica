import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './types';

export const register = (formData) => dispatch => {
  axios.post(`/users/signup`, formData, { withCredentials: true })
    .then(res => {
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    })
    .catch(err => console.log(err?.response));
}

export const login = (formData) => dispatch => {
  axios.post(`/users/login`, formData, { withCredentials: true })
    .then(res => {
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    })
    .catch(err => console.log(err?.response));
}