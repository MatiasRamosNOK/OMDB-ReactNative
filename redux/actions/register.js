import axios from "axios";
import { REGISTER_USER, SET_SUCCESFULL } from "../constants";

const register = function (succesfull, error) {
  return {
    type: REGISTER_USER,
    succesfull: succesfull,
    error: error,
  };
};

const setSuccesfull = function () {
  return {
    type: SET_SUCCESFULL,
  };
};

export const registerUser = function ({ email, password }) {
  return function (dispatch) {
    console.log("Entro al dispatch con", email, password);
    axios
      .post("https://omdb-reactnative.herokuapp.com/users/register", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status == 200) {
          console.log("Entro al if con:", response);
          dispatch(register(true, null));
        }
      })
      .catch(function (error) {
        console.log("ENtro al error con ", error);
        dispatch(register(false, "EmailUsed"));
      });
  };
};

export const setSuccesfullNull = function () {
  return function (dispatch) {
    dispatch(setSuccesfull());
  };
};
