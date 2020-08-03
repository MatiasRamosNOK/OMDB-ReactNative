import axios from "axios";
import {
  ADD_MOVIES,
  ADD_MOVIE,
  SET_ID_MOVIE,
  RESET_MOVIE,
  SET_MOVIES_USER,
} from "../constants";

const reset = function () {
  return {
    type: RESET_MOVIE,
  };
};

const setMoviesUser = function (movies) {
  return {
    type: SET_MOVIES_USER,
    movies: movies,
  };
};
const setID = function (id) {
  return {
    type: SET_ID_MOVIE,
    id: id,
  };
};

const receiveMovie = function (movie) {
  return {
    type: ADD_MOVIE,
    movie: movie,
  };
};

const receiveMovies = function (movies) {
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
};

export const getMovies = function (moviesIDS) {
  return function (dispatch) {
    let arrayPromesas = [];
    for (var i = 0; i < moviesIDS.length; i++) {
      arrayPromesas.push(
        axios
          .get(`https://www.omdbapi.com/?apikey=20dac387&i=${moviesIDS[i]}`)
          .then((resp) => {
            return resp.data;
          })
      );
    }
    Promise.all(arrayPromesas).then((data) => {
      dispatch(setMoviesUser(data));
    });
  };
};
export const fetchMovies = function (name) {
  return function (dispatch, getState) {
    axios
      .get(`https://www.omdbapi.com/?apikey=20dac387&s=${name}`)
      .then((res) => {
        dispatch(receiveMovies(res.data));
      });
  };
};

export const fetchMovie = function (id) {
  return function (dispatch) {
    axios
      .get(`https://www.omdbapi.com/?apikey=20dac387&i=${id}`)
      .then((res) => {
        dispatch(receiveMovie(res.data));
      });
  };
};

export const setIDMovie = function (id) {
  return function (dispatch) {
    dispatch(setID(id));
  };
};

export const resetMovie = function () {
  return function (dispatch) {
    dispatch(reset());
  };
};
