import { REGISTER_USER, SET_SUCCESFULL } from "../constants";

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
    case REGISTER_USER:
      console.log("Entro al reducer con:", action);
      return { ...state, succesfull: action.succesfull, error: action.error };
    default:
      return state;
  }
}
