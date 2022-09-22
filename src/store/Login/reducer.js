import * as ActionTypes from "./actionType";

const initialState = {
  loginFailure: false,
  loginSuccess: false,
  userDetils: null,
  error: null,
};
export const loginReducer = (state = initialState, action = null) => {
  switch (action?.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginFailure: false,
        loginSuccess: true,
        userDetils: action?.payload,
        error: null,
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginFailure: true,
        loginSuccess: false,
        userDetails: null,
        error: action?.payload,
      };
    case ActionTypes.LOGOUT: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
