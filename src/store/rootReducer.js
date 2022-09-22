import { combineReducers } from "redux";
import { dishReducer } from "./Dishes/reducer";
import { loginReducer } from "./Login/reducer";
export const rootReducer = combineReducers({
  login: loginReducer,
  dishes: dishReducer,
});
