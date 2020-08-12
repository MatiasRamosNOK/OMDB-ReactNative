import axios from "axios";
import {
  LOG_USER,
  LOGOUT,
  ADD_MOVIE_FAVORITE,
  REMOVE_MOVIE,
  RESET_SUCCESFULL,
  ADD_STAR_MOVIE,
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

const addStar = function (data) {
  return {
    type: ADD_STAR_MOVIE,
    data,
  };
};

export const setIDonServer = function (idUser, idMovie, rating) {
  return function (dispatch) {
    axios
      .post(
        `https://omdb-reactnative.herokuapp.com/users/${idUser}/rating/${idMovie}/${rating}`,
        {}
      )
      .then((resp) => {
        if (resp.status == 200) {
          dispatch(addStar(resp.data));
        }
      });
  };
};
export const addFavorite = function (idUser, idMovie) {
  return function (dispatch) {
    axios
      .post(
        `https://omdb-reactnative.herokuapp.com/users/${idUser}/addMovie/${idMovie}`,
        {}
      )
      .then(function (response) {
        if (response.status == 200) {
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
        dispatch(deleteData(resp.data));
      })
      .catch((err) => {
        console.log("Err to delete:", err);
      });
  };
};
export const logginUser = function ({ email, password }) {
  return function (dispatch) {
    axios
      .post("https://omdb-reactnative.herokuapp.com/users/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status == 200) {
          dispatch(login(response.data, true));
        }
      })
      .catch(function (error) {
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
