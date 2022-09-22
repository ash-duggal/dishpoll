import axios from "axios";
import * as ActionTypes from "./actionType";

export const getDishes = () => async (dispatch) => {
  dispatch({ type: ActionTypes.DISH_GET_REQUEST });
  try {
    await axios
      .get(
        "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
      )
      .then((res) => res.data)
      .then((response) => {
        dispatch({ type: ActionTypes.DISH_GET_SUCCESS, payload: response });
      });
  } catch (err) {
    dispatch({ type: ActionTypes.DISH_GET_ERROR, payload: err.message });
  }
};
