import { LOGIN_SUCCESS, REGISTER_SUCCESS } from "../actions/types";

const initState = {
  token: null,
  user: null
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        user: action.payload.user
      }
    default: 
      return state;
  }
}

export default authReducer;