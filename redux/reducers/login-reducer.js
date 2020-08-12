import {
  LOG_USER,
  LOGOUT,
  ADD_MOVIE_FAVORITE,
  REMOVE_MOVIE,
  RESET_SUCCESFULL,
  ADD_STAR_MOVIE,
} from "../constants";

const inicialState = {
  data: {
    moviesID: [],
  },
  succesfull: null,
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case LOG_USER:
      return { ...state, data: action.data, succesfull: action.succesfull };
    case LOGOUT:
      return { ...state, data: { moviesID: [] }, succesfull: null };
    case ADD_MOVIE_FAVORITE:
      return { ...state, data: action.data };
    case RESET_SUCCESFULL:
      return { ...state, succesfull: null };
    case REMOVE_MOVIE:
      return { ...state, data: action.data };
    case ADD_STAR_MOVIE:
      return { ...state, data: action.data };
    default:
      return state;
  }
}
