import axios from "axios";
import {
  LOG_USER,
  LOGOUT,
  ADD_MOVIE_FAVORITE,
  REMOVE_MOVIE,
  RESET_SUCCESFULL,
} from "../constants";
import { setSuccesfullNull } from "./register";

const login = function (data, succesfull) {
  return {
    type: LOG_USER,
    data: data,
    succesfull: succesfull,
  };
};

const logout = function () {
  return {
    type: LOGOUT,
  };
};

const setSuccesfullNullLogin = function () {
  return {
    type: RESET_SUCCESFULL,
  };
};

const deleteData = function (data) {
  return {
    type: REMOVE_MOVIE,
    data: data,
  };
};

const addToFavorite = function (data) {
  return {
    type: ADD_MOVIE_FAVORITE,
    data: data,
  };
};
export const addFavorite = function (idUser, idMovie) {
  console.log("ID user:", idUser, " ID movie:", idMovie);
  return function (dispatch) {
    axios
      .post(
        `https://omdb-reactnative.herokuapp.com/users/${idUser}/addMovie/${idMovie}`,
        {}
      )
      .then(function (response) {
        console.log("REspuesta action favorite:", response);
        if (response.status == 200) {
          console.log("La data es:", response.data);
          dispatch(addToFavorite(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const deleteFavorite = function (idUser, idMovie) {
  return function (dispatch) {
    axios
      .delete(
        `https://omdb-reactnative.herokuapp.com/users/${idUser}/${idMovie}`,
        {
          headers: {
            Authorization: "something",
          },
          data: {
            source: "something",
          },
        }
      )
      .then((resp) => {
        console.log("La respuesta es:", resp);
        dispatch(deleteData(resp.data));
      })
      .catch((err) => {
        console.log("Err to delete:", err);
      });
  };
};
export const logginUser = function ({ email, password }) {
  return function (dispatch) {
    console.log("Entro al dispatch con", email, password);
    axios
      .post("https://omdb-reactnative.herokuapp.com/users/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log("REsponde es:", response);
        if (response.status == 200) {
          console.log("Data en action creator:", response.data);
          dispatch(login(response.data, true));
        }
      })
      .catch(function (error) {
        console.log("Si hay un error:", error);
        dispatch(login({ moviesID: [] }, false));
      });
  };
};

export const logoutUser = function () {
  return function (dispatch) {
    dispatch(logout());
  };
};

export const resetSuccesfull = function () {
  return function (dispatch) {
    dispatch(setSuccesfullNullLogin());
  };
};
