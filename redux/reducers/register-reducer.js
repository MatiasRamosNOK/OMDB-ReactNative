import { REGISTER_USER } from "../constants";

const inicialState = {
  fail: false,
  succesfull: false,
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      console.log("Entro al reducer con:", action);
      return { ...state, succesfull: action.succesfull };
    default:
      return state;
  }
}
