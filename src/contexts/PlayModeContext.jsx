import { createContext, useContext, useReducer } from "react";
import * as utils from "../utils/utils.js";
import { launchConfetti } from "../utils/confetti.js";
// import { toast } from "react-toastify";

const initialState = {
  algo: "random",
  value: 10,
  time: 0,
  array: utils.generateArrayforPlay(10),
  arrayIndices: utils.generateArrayIndices(10),
  history: [],
  recentIndicesAffected: [],
  algoFun: null,
  currentStep: 0,
  isSorting: false,
  points: 0,

  // for merge sort/quick sort
  // task : "", // for merge sort - can be findMid,merge2sortedlists,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ALGO":
      return {
        ...state,
        algo: action.payload.name,
        history: action.payload.algoPlay(state.array),
        algoFun: action.payload.algoPlay,
        isSorting: true,
        currentStep: 0,
        points: 0,
      };
    case "RESET":
      return {
        ...state,
        history: [],
        isSorting: false,
        currentStep: 0,
        time: 0,
        points: 0,
        recentIndicesAffected: [],
      };
    case "REGENERATE":
      return {
        ...state,
        array: utils.generateArrayforPlay(state.value),
        time: 0,
        points: 0,
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
    case "SIZE_CHANGE":
      return {
        ...state,
        value: action.payload,
        array: utils.generateArrayforPlay(action.payload),
        isSorting: false,
        currentStep: 0,
        time: 0,
        points: 0,
        history: [],
        recentIndicesAffected: [],
        arrayIndices: utils.generateArrayIndices(action.payload),
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
    case "CHANGE_POINT":
      return {
        ...state,
        points: state.points + action.payload,
      };
    case "CUSTOM_INPUT": {
      const str = action.payload;
      const arr = str
        .trim()
        .split(/\s+/) // yeh more than one space ko bhi ignore kar deta hai !
        .map((i) => parseInt(i))
        .filter((num) => !isNaN(num) && num <= 350);
      const finalArray = arr.map((val, index) => ({
        value: Math.floor(val),
        id: index,
      }));
      return {
        ...state,
        value: arr.length ? arr.length : 10,
        time: 0,
        array: arr.length
          ? finalArray
          : utils.generateArrayforRace(state.value),
      };
    }
    case "SORTING_COMPLETED":
      launchConfetti();
      return {
        ...state,
        isSorting: false,
        history: [],
        recentIndicesAffected: [],
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
