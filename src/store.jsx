import * as utils from "./utils/utils";
import { launchConfetti } from "./utils/confetti.js";

export function reducer(state, action) {
  switch (action.type) {
    case "setHistory": {
      // console.log(action.payload);
      return {
        ...state,
        history: action.payload,
        currentStep: 0,
      };
    }

    case "stepForward": {
      if (state.currentStep < state.history.length - 1) {
        const step = state.history[state.currentStep + 1];
        console.log(state, step);
        return {
          ...state,
          array: step.arrayState,
          isSorting:
            state.currentStep === state.history.length - 1 ? false : true,
          selectedIndices: step.comparedIndices || state.selectedIndices || [],
          swaps: step.swaps || state.swaps || 0,
          comparisons: step.comparisons || state.swaps || 0,
          currentStep: state.currentStep + 1,
          highlightIndices:
            step.highlightIndices || state.highlightIndices || [],
          swappedIndices: step.swappedIndices || [],
          highlightValues: step.highlightValues?.values || [],
          highlightValueText: step.highlightValues?.text || "",
        };
      }
      return state;
    }

    case "stepBackward": {
      if (state.currentStep > 0) {
        const step = state.history[state.currentStep - 1];
        return {
          ...state,
          isSorting: true,
          array: step.arrayState,
          selectedIndices: step.comparedIndices || state.selectedIndices || [],
          swaps: step.swaps || state.swaps || 0,
          comparisons: step.comparisons || state.comparisons || 0,
          currentStep: state.currentStep - 1,
          highlightIndices:
            step.highlightIndices || state.highlightIndices || [],
          swappedIndices: step.swappedIndices || [],
          highlightValues: step.highlightValues?.values || [],
          highlightValueText: step.highlightValues?.text || "",
        };
      }
      return state;
    }
    case "togglePlay":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };

    case "seek":
      return {
        ...state,
        isSorting:
          state.currentStep === state.history.length - 1 ? false : true,
        array: state.history[parseInt(action.payload)].arrayState,
        selectedIndices:
          state.history[parseInt(action.payload)].comparedIndices || [],
        swappedIndices:
          state.history[parseInt(action.payload)].swappedIndices || [],
        highlightIndices:
          state.history[parseInt(action.payload)].highlightIndices ||
          state.highlightIndices ||
          [],
        currentStep: parseInt(action.payload),
        // isPlaying: false,
        swaps: state.history[parseInt(action.payload)].swaps,
        comparisons: state.history[parseInt(action.payload)].comparisons,
        highlightValues:
          state.history[parseInt(action.payload)].highlightValues?.values || [],
        highlightValueText:
          state.history[parseInt(action.payload)].highlightValues?.text || "",
      };

    // Taken from the previous version.

    case "customInput": {
      const str = action.payload;
      const arr = str
        .trim()
        .split(/\s+/) // yeh more than one space ko bhi ignore kar deta hai !
        .map((i) => parseInt(i))
        .filter((num) => !isNaN(num) && num <= 350);
      return {
        ...state,
        value: arr.length ? arr.length : 20,
        array: arr.length
          ? arr
          : Array.from(
              { length: 20 },
              () => Math.floor(Math.random() * 350) + 1
            ),
      };
    }

    case "speedChange":
      return { ...state, speed: Number(action.payload) };
    case "resetValues":
      return {
        ...state,
        array: utils.generateArray(state.value),
        selectedIndices: [],
        swappedIndices: [],
        highlightIndices: [],
        highlightValues: [],
        isSorting: false,
        time: 0,
        swaps: 0,
        description: "Start a sort to see details.",
        comparisons: 0,
        history: [],
        currentStep: 0,
        isPlaying: false,
      };
    case "valueChange":
      return {
        ...state,
        value: Number(action.payload),
        array: utils.generateArray(Number(action.payload)),
        selectedIndices: [],
        swappedIndices: [],
        highlightIndices: [],
        highlightValues: [],
        isSorting: false,
        custom_input: "",
        time: 0,
        swaps: 0,
        description: "Start a sort to see details.",
        comparisons: 0,
        history: [],
        currentStep: 0,
        isPlaying: false,
      };
    case "arrayMovements":
      return {
        ...state,
        array: action.payload,
      };
    case "selectedIndices":
      return {
        ...state,
        selectedIndices: action.payload,
      };
    case "highlightIndices":
      return {
        ...state,
        highlightIndices: action.payload,
      };
    case "sortingStarted":
      return {
        ...state,
        isSorting: true,
        isPlaying: true,
        time: 0,
      };
    case "hold":
      return {
        ...state,
        hold: action.payload,
      };
    case "tick":
      return {
        ...state,
        time: state.isSorting ? state.time + 1 : state.time,
      };
    case "swapPlus": {
      // console.log(action);
      return {
        ...state,
        swaps: state.swaps + 1,
        swappedIndices: action.payload,
      };
    }
    case "comparisonPlus":
      return {
        ...state,
        comparisons: state.comparisons + 1,
      };
    // case "swappedIndices":
    //   return {
    //     ...state,
    //     swappedIndices: action.payload,
    //   };
    case "sortingCompleted": {
      launchConfetti();
      return {
        ...state,
        isSorting: false,
        isPlaying: false,
        selectedIndices: [],
        history: state.history,
        highlightIndices: [],
        swappedIndices: [],
        hold: [],
      };
    }

    case "setDescription":
      return {
        ...state,
        description: action.payload,
      };

    case "toggleChange":
      return { ...state, toggle: action.payload };
  }
}

export const initialState = {
  custom_input: [],
  history: [],
  currentStep: 0,
  isPlaying: false,

  speed: 1,
  value: 20,
  toggle: "bar", // can have only 2 values - bar and box
  array: Array.from({ length: 20 }, () => Math.floor(Math.random() * 350) + 1),

  isSorting: false,
  time: 0,
  swaps: 0,
  comparisons: 0,

  selectedIndices: [], // to show the values being compared
  swappedIndices: [], // to show values being swapped
  highlightValues: [], // to highlight a particular bar/box in the visualizer - used to show current min element in Selection sort
  highlightValueText: "",
  highlightIndices: [], // to highlight a particular index in the visualizer - used to show current min element in Selection sort
};
