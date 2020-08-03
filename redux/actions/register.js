import axios from "axios";
import { REGISTER_USER } from "../constants";

const register = function (succesfull) {
  return {
    type: REGISTER_USER,
    succesfull: succesfull,
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
        console.log("Entro al then");
        if (response.status == 200) {
          console.log("Entro al if");
          dispatch(register(true));
        } else if (response.status == 205) {
          dispatch(register(false));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
