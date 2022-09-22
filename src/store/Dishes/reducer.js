import * as ActionTypes from "./actionType";

const initialState = {
  dishDetails: null,
  error: null,
};
export const dishReducer = (state = initialState, action = null) => {
  switch (action?.type) {
    case ActionTypes.DISH_GET_SUCCESS:
      return {
        ...state,
        dishDetails: action?.payload,
        error: null,
      };
    case ActionTypes.DISH_GET_ERROR:
      return {
        ...state,
        dishDetails: null,
        error: action?.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
