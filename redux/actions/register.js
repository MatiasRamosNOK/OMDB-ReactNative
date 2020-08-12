import axios from "axios";
import { REGISTER_USER, SET_SUCCESFULL, RESET_ERROR } from "../constants";

const register = function (succesfull, error) {
  return {
    type: REGISTER_USER,
    succesfull: succesfull,
    error: error,
  };
};

export const resetEmail = () => ({
  type: RESET_ERROR,
});

const setSuccesfull = function () {
  return {
    type: SET_SUCCESFULL,
  };
};

export const registerUser = function ({ email, password }) {
  return function (dispatch) {
    axios
      .post("https://omdb-reactnative.herokuapp.com/users/register", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status == 200) {
          dispatch(register(true, null));
        }
      })
      .catch(function (error) {
        dispatch(register(false, "EmailUsed"));
      });
  };
};

export const setSuccesfullNull = function () {
  return function (dispatch) {
    dispatch(setSuccesfull());
  };
};
