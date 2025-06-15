import { createContext, useContext, useReducer } from "react";
import * as utils from "../utils/utils.js";
// import bubbleSort from "../algorithms_playmode/bubble.js";
// import insertionSort from "../algorithms_playmode/insertion.js";
// import selectionSort from "../algorithms_playmode/selection.js";
// import performMergeSort from "../algorithms_playmode/merge.js";

// const algoMapping = {
//   random: () => true,
//   bubble: bubbleSort,
//   insertion: insertionSort,
//   selection: selectionSort,
//   merge: performMergeSort,
// };

const initialState = {
  algo: "random",
  value: 10,
  time: 0,
  array: utils.generateArrayforPlay(10),
  history: [],
  recentIndicesAffected: [],
  algoFun: null,
  currentStep: 0,
  isSorting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ALGO":
      return {
        ...state,
        algo: action.payload,
        history: action.payload(state.array),
        algoFun: action.payload,
        isSorting: true,
        currentStep: 0,
      };
    case "RESET":
      return {
        ...state,
        history: [],
        isSorting: false,
        currentStep: 0,
        time: 0,
        recentIndicesAffected: [],
      };
    case "REGENERATE":
      return {
        ...state,
        array: utils.generateArrayforPlay(state.value),
      };
    case "SET_ARRAY":
      return {
        ...state,
        array: action.payload,
      };
    case "SET_SIZE":
      return {
        ...state,
        value: action.payload,
        array: utils.generateArrayforPlay(action.payload),
      };
    case "SET_RECENT":
      return {
        ...state,
        recentIndicesAffected: action.payload,
      };
    case "INCR_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case "TICK":
      return {
        ...state,
        time: state.isSorting ? state.time + 1 : state.time,
      };
    // case "ALGO_START":
    //   return {

    //   }
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
