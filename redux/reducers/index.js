import { combineReducers } from "redux";
import moviesReducer from "./movies-reducer";
import registerReducer from "./register-reducer";
import loginReducer from "./login-reducer";
export default combineReducers({
  movies: moviesReducer,
  register: registerReducer,
  login: loginReducer,
});
