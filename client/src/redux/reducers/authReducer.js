import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, NO_USER_LOADED, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from "../actions/types";

const initState = {
  token: null,
  user: null,
  isAuthenticated: false
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_LOADED:
      return {
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true
      }
    case NO_USER_LOADED:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS: 
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      }
    default: 
      return state;
  }
}

export default authReducer;