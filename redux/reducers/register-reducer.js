import { REGISTER_USER, SET_SUCCESFULL, RESET_ERROR } from "../constants";

const inicialState = {
  fail: false,
  succesfull: false,
  error: "",
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case SET_SUCCESFULL: {
      return { ...state, succesfull: false };
    }
    case RESET_ERROR: {
      return { ...state, error: "" };
    }
    case REGISTER_USER:
      let valor = action.succesfull;
      return { ...state, succesfull: valor, error: action.error };
    default:
      return state;
  }
}
