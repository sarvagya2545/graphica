import { CLEAR_ERRORS, NO_ERRORS, AUTH_ERROR, SERVER_ERROR } from "../actions/types";

const initState = {
  errors: {},
  errType: undefined,
  statusCode: null,
  isError: false
};

const errorReducer = (state = initState, action) => {
  switch(action.type) {
    case NO_ERRORS:
    case CLEAR_ERRORS:
      return {
        ...initState
      }
    case AUTH_ERROR:
        console.log(action.payload)
        return {
            errors: action.payload.errors,
            statusCode: action.payload.status,
            errType: action.payload.errType,
            isError: true
        }
    case SERVER_ERROR:
        return {
            errors: {
                err: 'A server error ocurred. Try again. If the problem persists, contact the owner.'
            },
            statusCode: 500,
            errType: 'Server Error',
            isError: true
        }
    default: 
      return state;
  }
}

export default errorReducer;