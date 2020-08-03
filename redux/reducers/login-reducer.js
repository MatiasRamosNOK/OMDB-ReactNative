import {
  LOG_USER,
  LOGOUT,
  ADD_MOVIE_FAVORITE,
  REMOVE_MOVIE,
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
      console.log("Entro al reducer con:", action);
      return { ...state, data: action.data, succesfull: action.succesfull };
    case LOGOUT:
      console.log("Estas en logout reducer");
      return { ...state, data: { moviesID: [] }, succesfull: null };
    case ADD_MOVIE_FAVORITE:
      return { ...state, data: action.data };
    case REMOVE_MOVIE:
      console.log("Remove reducer:", action);
      return { ...state, data: action.data };
    default:
      return state;
  }
}
