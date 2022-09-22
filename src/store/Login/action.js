import axios from "axios";
import * as ActionTypes from "./actionType";

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: ActionTypes.LOGIN_REQUEST });
  try {
    await axios
      .get(
        "https://raw.githubusercontent.com/syook/react-dishpoll/main/users.json"
      )
      .then((res) => res.data)
      .then((response) => {
        let data = null;
        response.forEach((user) => {
          if (user.username === username && user.password === password) {
            data = user;
          }
        });
        if (data) {
          dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data });
        } else {
          dispatch({
            type: ActionTypes.LOGIN_ERROR,
            payload: "Username and Password didn't match",
          });
        }
      });
  } catch (err) {
    dispatch({ type: ActionTypes.LOGIN_ERROR, payload: err.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOGOUT });
};
