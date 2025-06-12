import bubbleSort from "../../algorithms_racemode/bubble";
import insertionSort from "../../algorithms_racemode/insertion";
import selectionSort from "../../algorithms_racemode/selection";
import performMergeSort from "../../algorithms_racemode/merge";
import performQuickSort from "../../algorithms_racemode/quick";
import { generateArrayforRace } from "../../utils/utils";

const algorithms = {
  bubble: { name: "Bubble Sort", fn: bubbleSort, short_name: "BS" },
  selection: { name: "Selection Sort", fn: selectionSort, short_name: "SS" },
  insertion: { name: "Insertion Sort", fn: insertionSort, short_name: "IS" },
  merge: { name: "Merge Sort", fn: performMergeSort, short_name: "MS" },
  quick: { name: "Quick Sort", fn: performQuickSort, short_name: "QS" },
};

const initialState = {
  activeAlgorithms: {},
  selectedAlgorithm: "bubble",
  value: 20,
  speed: 1,
  array: generateArrayforRace(20),
  raceStarted: false,
  time: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ALGORITHM":
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [action.payload.algoName]: {
            array: [...state.array],
            speed: state.speed,
            value: state.value,
            isSorting: false,
            time: 0,
            comparisons: 0,
            swaps: 0,
            highlightedIndices: [],
            selectedIndices: [],
            fn: action.payload.algoFun,
          },
        },
      };
    case "SET_SELECTED":
      return {
        ...state,
        selectedAlgorithm: action.payload,
      };
    case "REMOVE_ALGORITHM": {
      const updatedAlgos = { ...state.activeAlgorithms };
      delete updatedAlgos[action.payload];
      return {
        ...state,
        activeAlgorithms: updatedAlgos,
      };
    }
    case "UPDATE_VALUE": {
      const newArray = generateArrayforRace(action.payload);
      const updatedActiveAlgorithms = Object.keys(
        state.activeAlgorithms
      ).reduce((acc, key) => {
        acc[key] = {
          ...state.activeAlgorithms[key],
          array: newArray,
          value: newArray.length,
          isSorting: false,
          time: 0,
          comparisons: 0,
          swaps: 0,
          highlightedIndices: [],
          selectedIndices: [],
          hold: [],
        };
        return acc;
      }, {});

      return {
        ...state,
        value: action.payload,
        raceStarted: false,
        array: [...newArray],
        time: 0,
        activeAlgorithms: updatedActiveAlgorithms,
      };
    }

    case "RESET": {
      const newArray = generateArrayforRace(state.value);
      const updatedActiveAlgorithms = Object.keys(
        state.activeAlgorithms
      ).reduce((acc, key) => {
        acc[key] = {
          ...state.activeAlgorithms[key],
          array: newArray,
          value: newArray.length,
          isSorting: false,
          time: 0,
          comparisons: 0,
          swaps: 0,
          highlightedIndices: [],
          selectedIndices: [],
          hold: [],
        };
        return acc;
      }, {});

      return {
        ...state,
        raceStarted: false,
        array: [...newArray],
        time: 0,
        activeAlgorithms: updatedActiveAlgorithms,
      };
    }

    case "UPDATE_SPEED": {
      const newSpeed = action.payload;
      const updatedActiveAlgorithms = Object.keys(
        state.activeAlgorithms
      ).reduce((acc, key) => {
        acc[key] = {
          ...state.activeAlgorithms[key],
          speed: newSpeed,
        };
        return acc;
      }, {});
      return {
        ...state,
        speed: newSpeed,
        activeAlgorithms: updatedActiveAlgorithms,
      };
    }

    case "RACE-STARTED": {
      const { activeAlgorithms } = state;
      const updatedActiveAlgorithms = Object.keys(activeAlgorithms).reduce(
        (acc, key) => {
          acc[key] = {
            ...activeAlgorithms[key],
            isSorting: true,
            time: 0,
            comparisons: 0,
            swaps: 0,
            highlightedIndices: [],
            selectedIndices: [],
            hold: [],
          };
          return acc;
        },
        {}
      );
      return {
        ...state,
        raceStarted: true,
        time: 0,
        activeAlgorithms: updatedActiveAlgorithms,
      };
    }

    case "STOP": {
      const { activeAlgorithms } = state;
      const updatedActiveAlgorithms = Object.keys(activeAlgorithms).reduce(
        (acc, key) => {
          acc[key] = {
            ...activeAlgorithms[key],
            isSorting: false,
            time: 0,
            comparisons: 0,
            swaps: 0,
            highlightedIndices: [],
            selectedIndices: [],
            hold: [],
          };
          return acc;
        },
        {}
      );
      return {
        ...state,
        raceStarted: false,
        time: 0,
        activeAlgorithms: updatedActiveAlgorithms,
      };
    }

    case "TICK": {
      const updatedActiveAlgorithms = Object.keys(
        state.activeAlgorithms
      ).reduce((acc, key) => {
        const algo = state.activeAlgorithms[key];
        acc[key] = {
          ...algo,
          time: algo.isSorting ? state.time + 1 : algo.time,
        };
        return acc;
      }, {});
      return {
        ...state,
        time: state.raceStarted ? state.time + 1 : state.time,
        activeAlgorithms: updatedActiveAlgorithms,
      };
    }

    case "RACE-COMPLETED":
      return {
        ...state,
        raceStarted: false,
      };

    // CASES TO UPDATE activeAlgorithms

    // to update the array while sorting, how to call ? -> dispatch({type : "arrayMovements", payload : [...array], algoName = "bubble"})
    case "arrayMovements": {
      const { algoName, payload } = action;
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [algoName]: {
            ...state.activeAlgorithms[algoName],
            array: payload,
          },
        },
      };
    }
    case "selectedIndices": {
      const { algoName, payload } = action;
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [algoName]: {
            ...state.activeAlgorithms[algoName],
            selectedIndices: payload,
          },
        },
      };
    }
    case "highlightIndices": {
      const { algoName, payload } = action;
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [algoName]: {
            ...state.activeAlgorithms[algoName],
            highlightedIndices: payload,
          },
        },
      };
    }

    case "sortingStarted": {
      const { algoName } = action;
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [algoName]: {
            ...state.activeAlgorithms[algoName],
            isSorting: true,
            time: 0,
          },
        },
      };
    }
    case "hold": {
      const { algoName, payload } = action;
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [algoName]: {
            ...state.activeAlgorithms[algoName],
            hold: payload,
          },
        },
      };
    }
    case "sortingCompleted": {
      const { algoName } = action;

      // Update the completed algorithm
      const updatedActiveAlgorithms = {
        ...state.activeAlgorithms,
        [algoName]: {
          ...state.activeAlgorithms[algoName],
          isSorting: false,
          selectedIndices: [],
          highlightIndices: [],
          hold: [],
        },
      };

      // Check if ALL algorithms have finished sorting
      const allAlgorithmsFinished = Object.values(
        updatedActiveAlgorithms
      ).every((algo) => !algo.isSorting);

      return {
        ...state,
        activeAlgorithms: updatedActiveAlgorithms,
        raceStarted: !allAlgorithmsFinished, // Set raceStarted to false if all are done
      };
    }

    case "swapPlus": {
      const { algoName } = action;
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [algoName]: {
            ...state.activeAlgorithms[algoName],
            swaps: state.activeAlgorithms[algoName].swaps + 1,
          },
        },
      };
    }
    case "comparisonPlus": {
      const { algoName } = action;
      return {
        ...state,
        activeAlgorithms: {
          ...state.activeAlgorithms,
          [algoName]: {
            ...state.activeAlgorithms[algoName],
            comparisons: state.activeAlgorithms[algoName].comparisons + 1,
          },
        },
      };
    }

    default:
      return state;
  }
}

export { reducer, algorithms, initialState };
