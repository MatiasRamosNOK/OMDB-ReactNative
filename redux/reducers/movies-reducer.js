import {
  ADD_MOVIES,
  SET_ID_MOVIE,
  ADD_MOVIE,
  RESET_MOVIE,
  SET_MOVIES_USER,
} from "../constants";

const inicialState = {
  moviesUser: [],
  movies: [],
  id: null,
  movie: [],
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case ADD_MOVIES:
      return { ...state, movies: action.movies };
    case SET_ID_MOVIE:
      return { ...state, id: action.id };
    case ADD_MOVIE:
      return {
        ...state,
        movie: action.movie,
      };
    case RESET_MOVIE:
      return {
        ...state,
        movie: [],
      };
    case SET_MOVIES_USER:
      return {
        ...state,
        moviesUser: action.movies,
      };
    default:
      return state;
  }
}
