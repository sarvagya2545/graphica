import axios from "axios";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  NO_ERRORS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./types";

export const register = (formData) => (dispatch) => {
  axios
    .post(`/users/signup`, formData, { withCredentials: true })
    .then((res) => {
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch({ type: NO_ERRORS });
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      console.log(err?.response);

      const errorData = {
        errors: errors,
        status: err.response.status,
        errType: "Registration error",
      };

      console.log(errors);

      dispatch({ type: REGISTER_FAIL });
      dispatch({ type: AUTH_ERROR, payload: errorData });
    });
};

export const login = (formData) => (dispatch) => {
  axios
    .post(`/users/login`, formData, { withCredentials: true })
    .then((res) => {
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch({ type: NO_ERRORS });
    })
    .catch((err) => {
      console.log(err?.response);
      dispatch({ type: LOGIN_FAIL });

      if (err.response.status === 401) {
        // unauthorized
        const errorData = {
          errors: {
            email:
              "Email or password entered is incorrect",
          },
          status: 401,
          errType: "Login error",
        };
        dispatch({ type: AUTH_ERROR, payload: errorData });
      }

      if (err.response.status === 400) {
        const errors = err.response.data.errors;
        const errorData = {
          errors: errors,
          status: err.response.status,
          errType: "Login error",
        };

        dispatch({ type: AUTH_ERROR, payload: errorData });
      }
    });
};
