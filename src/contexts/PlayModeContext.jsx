import { Children, createContext, useContext, useReducer } from "react";
import * as utils from "../utils/utils.js";
import bubbleSort from "../algorithms_playmode/bubble.js";
import insertionSort from "../algorithms_playmode/insertion.js";
import selectionSort from "../algorithms_playmode/selection.js";

const algoMapping = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort,
};

const initialState = {
  algo: "random",
  array: utils.generateArray(20),
  history: [],
  algoFun: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ALGO":
      return {
        ...state,
        algo: action.payload,
        history: algoMapping[action.payload](state.array),
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
