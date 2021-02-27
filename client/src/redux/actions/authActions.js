import axios from "axios";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  NO_ERRORS,
  NO_USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "./types";

export const loadUser = () => (dispatch) => {
  axios
    .get("/api/users/current", {
      withCredentials: true,
      headers: { "content-type": "application/json", "Accept": "application/json" },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: NO_USER_LOADED });
    });
};

export const register = (formData) => (dispatch) => {
  axios
    .post(`/api/users/signup`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    })
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
    .post(`/api/users/login`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    })
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
            email: "Email or password entered is incorrect",
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

export const logout = () => (dispatch) => {
  axios
    .post(
      `/api/users/logout`,
      {},
      { withCredentials: true, headers: { "Content-Type": "application/json", "Accept": "application/json" } }
    )
    .then((res) => {
      console.log(res);
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => console.log(err));
};
