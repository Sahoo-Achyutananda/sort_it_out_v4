import { Children, createContext, useContext, useReducer } from "react";
import * as utils from "../utils/utils.js";

const initialState = {
  algo: "random",
  array: utils.generateArray(20),
  history: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_ALGO":
      return {
        ...state,
        algo: action.payload,
      };
    case "SET_ARRAY":
      return {
        ...state,
        array: action.payload,
      };
    default:
      return state;
  }
}
const playModeContext = createContext();
function PlayModeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <playModeContext.Provider value={{ state, dispatch }}>
      {children}
    </playModeContext.Provider>
  );
}

function usePlayModeContext() {
  const context = useContext(playModeContext);
  return context;
}

export { PlayModeProvider, usePlayModeContext };
